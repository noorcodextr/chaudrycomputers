import Link from "next/link";
import { ArrowRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { Brand } from "@/components/storefront/Brand";

const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const whatsappHref = phoneNumber ? `https://wa.me/${phoneNumber}` : "/";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-8">
          <Brand />
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-foreground hover:border-primary hover:text-primary"
          >
            <ArrowRight className="size-3 rotate-180" />
            Back to shop
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[.2em] text-chred">
              Contact the workshop
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] md:text-6xl">
              Talk to Chaudry Computers.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Whether you are building a new setup, replacing a component, or checking compatibility,
              our team can help you pick the right parts and answer the questions that matter before
              you spend money.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappHref}
                target={phoneNumber ? "_blank" : undefined}
                rel={phoneNumber ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 bg-chred px-5 py-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-white"
              >
                <MessageCircle className="size-4" />
                {phoneNumber ? "Chat on WhatsApp" : "Use order form"}
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-foreground"
              >
                Browse parts
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center bg-chred/10 text-chred">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Location</p>
                  <p className="mt-1 font-display text-2xl font-bold uppercase">Bahawalpur, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center bg-chred/10 text-chred">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Support</p>
                  <p className="mt-1 text-sm text-foreground">WhatsApp outreach and direct workshop advice</p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center bg-chred/10 text-chred">
                  <Clock3 className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Hours</p>
                  <p className="mt-1 text-sm text-foreground">Mon–Sat · 10:00 AM to 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="border border-border bg-card p-6">
            <p className="font-manrope text-[10px] uppercase tracking-[.18em] text-muted-foreground">Build help</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase">Part matching</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We can help check CPU cooler clearance, PSU wattage, motherboard fit, and case airflow before you order.
            </p>
          </article>

          <article className="border border-border bg-card p-6">
            <p className="font-manrope text-[10px] uppercase tracking-[.18em] text-muted-foreground">Fast answers</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase">Repair support</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              If a build is acting up, we can narrow down the likely fault and recommend the most practical fix.
            </p>
          </article>

          <article className="border border-border bg-card p-6">
            <p className="font-manrope text-[10px] uppercase tracking-[.18em] text-muted-foreground">Storefront</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase">Order desk</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Add parts to your cart, send the request, and we will respond with the next steps and availability.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
