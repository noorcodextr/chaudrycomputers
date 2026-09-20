"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { authOptions } from "@/lib/auth";

const statusSchema = z.enum(["Pending", "Contacted", "Confirmed", "Completed", "Cancelled"]);

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function updateOrderStatus(orderId: number, formData: FormData) {
  await requireAdmin();
  const status = statusSchema.parse(formData.get("status"));

  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId));
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
}
