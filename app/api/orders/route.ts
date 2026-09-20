import { NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/drizzle/db";
import { orderItems, orders, products } from "@/drizzle/schema";

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(255),
  phone: z.string().trim().min(7).max(50),
  address: z.string().trim().min(5).max(1000),
  city: z.string().trim().min(2).max(100),
  postalCode: z.string().trim().max(30).optional(),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(99),
  })).min(1).max(100),
});

export async function POST(request: Request) {
  try {
    const input = orderSchema.parse(await request.json());
    const quantities = new Map<number, number>();

    for (const item of input.items) {
      quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
    }

    const productIds = [...quantities.keys()];
    const catalog = await db
      .select()
      .from(products)
      .where(and(inArray(products.id, productIds), eq(products.available, true)));

    if (catalog.length !== productIds.length) {
      return NextResponse.json({ error: "One or more products are no longer available." }, { status: 409 });
    }

    const productById = new Map(catalog.map((product) => [product.id, product]));
    const total = productIds.reduce((sum, id) => {
      const product = productById.get(id);
      return sum + (product?.price ?? 0) * (quantities.get(id) ?? 0);
    }, 0);

    const result = await db.transaction(async (transaction) => {
      const [order] = await transaction.insert(orders).values({
        customerName: input.customerName,
        phone: input.phone,
        address: input.address,
        city: input.city,
        postalCode: input.postalCode || null,
        total,
      }).returning({ id: orders.id });

      await transaction.insert(orderItems).values(productIds.map((id) => {
        const product = productById.get(id)!;
        return {
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: quantities.get(id)!,
        };
      }));

      return order;
    });

    return NextResponse.json({ orderId: result.id, orderNumber: `ORD-${String(result.id).padStart(5, "0")}`, total });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please check the customer details and cart items." }, { status: 400 });
    }

    console.error("Order creation failed:", error);
    return NextResponse.json({ error: "We could not create the order. Please try again." }, { status: 500 });
  }
}
