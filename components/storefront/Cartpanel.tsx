import { CartLine } from "@/app/page";
import { money } from "@/lib/fromatter";
import { ArrowRight, ChevronRight, Cpu, MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";

export function CartPanel({
  lines,
  onClose,
  onChange,
  onClear,
}: {
  lines: CartLine[];
  onClose: () => void;
  onChange: (id: number, quantity: number) => void;
  onClear: () => void;
}) {
  const [checkout, setCheckout] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "Bahawalpur",
    postalCode: "",
  });

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  function submit(event: React.FormEvent) {
    event.preventDefault();


    alert(
      `Demo order created for ${form.customerName}. Total: ${money(total)}`,
    );


  }

  return (
    <div className="fixed inset-0 z-50"> <button
      type="button"
      aria-label="Close cart"
      onClick={onClose}
      className="absolute inset-0 bg-[rgba(13,20,29,.62)]"
    />


      <aside className="slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[.18em] text-primary">
              Build queue
            </p>
            <h2 className="font-display text-3xl font-bold uppercase">
              Your order
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center border border-border"
          >
            <X className="size-4" />
          </button>
        </div>

        {!lines.length ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="size-9 text-muted-foreground/50" />

            <h3 className="mt-4 font-display text-2xl uppercase">
              Nothing queued yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a component and we will get your build moving.
            </p>
          </div>
        ) : checkout ? (
          <form
            onSubmit={submit}
            className="flex-1 overflow-y-auto p-5"
          >
            <button
              type="button"
              onClick={() => setCheckout(false)}
              className="mb-5 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground"
            >
              <ChevronRight className="size-3 rotate-180" />
              Back to parts
            </button>

            <h3 className="font-display text-2xl font-bold uppercase">
              Where should we reach you?
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              We log the request, then open a WhatsApp thread with our parts
              desk.
            </p>

            <div className="mt-5 space-y-3">
              {(
                [
                  ["customerName", "Full name", "text"],
                  ["phone", "WhatsApp number", "tel"],
                  ["address", "Delivery address", "text"],
                  ["city", "City", "text"],
                  ["postalCode", "Postal code (optional)", "text"],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] text-muted-foreground">
                    {label}
                  </span>

                  <input
                    required={key !== "postalCode"}
                    type={type}
                    value={form[key]}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [key]: event.target.value,
                      })
                    }
                    className="w-full border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                Estimated total
              </span>

              <strong className="font-manrope">
                {money(total)}
              </strong>
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-extrabold uppercase tracking-[.14em] text-white"
            >
              <MessageCircle className="size-4" />
              Log order & open WhatsApp
            </button>
          </form>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              {lines.map((line) => (
                <div
                  key={line.product.id}
                  className="flex gap-3 border-b border-border py-4 first:pt-0"
                >
                  <div className="grid size-14 shrink-0 place-items-center bg-[hsl(216_26%_13%)] text-primary">
                    <Cpu className="size-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-bold uppercase leading-none">
                      {line.product.name}
                    </p>

                    <p className="mt-1 font-manrope text-sm">
                      {money(line.product.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onChange(
                            line.product.id,
                            line.quantity - 1,
                          )
                        }
                        className="grid size-6 place-items-center border border-border"
                      >
                        −
                      </button>

                      <span className="font-manrope text-xs">
                        {line.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onChange(
                            line.product.id,
                            line.quantity + 1,
                          )
                        }
                        className="grid size-6 place-items-center border border-border"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onChange(line.product.id, 0)
                        }
                        className="ml-2 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="font-manrope text-sm">
                    {money(
                      line.product.price * line.quantity,
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-muted/35 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Parts total
                </span>

                <span className="font-manrope text-lg">
                  {money(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-extrabold uppercase tracking-[.14em] text-white"
              >
                Continue to details
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={onClear}
                className="mt-3 w-full py-2 text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground hover:text-destructive"
              >
                Clear build queue
              </button>
            </div>
          </>
        )}
      </aside>
    </div>


  );
}