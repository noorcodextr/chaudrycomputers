"use client";
import {
    ArrowRight,
    BadgeCheck,
    Box,
    Menu,
    MessageCircle,
    PackageCheck,
    Search,
    ShieldCheck,
    ShoppingBag,
    X,
    Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/storefront/Brand";
import { CartPanel } from "@/components/storefront/Cartpanel";
import { ProductCard } from "@/components/storefront/Productcard";
import { categories } from "@/types/categories";
import { Product } from "@/types/products";
import type { SiteSettings } from "@/lib//site-content";
import { redirect } from "next/navigation";

export type CartLine = {
    product: Product;
    quantity: number;
};

export default function StorefrontClient({ products, settings }: { products: Product[]; settings: SiteSettings }) {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cart, setCart] = useState<CartLine[]>([]);
    const cartHydrated = useRef(false);
    useEffect(() => {
        const syncCart = () => {
            const next = window.localStorage.getItem("chaudry-cart");
            if (!next) {
                cartHydrated.current = true;
                return;
            }
            try {
                setCart(JSON.parse(next) as CartLine[]);
            } catch {
                window.localStorage.removeItem("chaudry-cart");
            }
            cartHydrated.current = true;
        };
        window.setTimeout(syncCart, 0);
        if (window.location.search.includes("cart=open")) {
            window.setTimeout(() => setCartOpen(true), 0);
            window.history.replaceState({}, "", "/");
        }
        window.addEventListener("chaudry-cart-updated", syncCart);
        return () => window.removeEventListener("chaudry-cart-updated", syncCart);
    }, []);

    useEffect(() => {
        if (!cartHydrated.current) return;
        window.localStorage.setItem("chaudry-cart", JSON.stringify(cart));
    }, [cart]);

    const filtered = products.filter(
        (product) =>
            (category === "All" || product.category === category) &&
            product.name.toLowerCase().includes(search.toLowerCase()),
    );

    const cartCount = cart.reduce(
        (sum, line) => sum + line.quantity,
        0,
    );

    function addToCart(product: Product) {
        setCart((current) => {
            const exists = current.some(
                (line) => line.product.id === product.id,
            );

            if (exists) {
                return current.map((line) =>
                    line.product.id === product.id
                        ? { ...line, quantity: line.quantity + 1 }
                        : line,
                );
            }

            return [...current, { product, quantity: 1 }];
        });
    }

    function changeCart(id: number, quantity: number) {
        setCart((current) =>
            quantity < 1
                ? current.filter((line) => line.product.id !== id)
                : current.map((line) =>
                    line.product.id === id
                        ? { ...line, quantity }
                        : line,
                ),
        );
    }

    return (<div className="min-h-[100dvh] bg-background">
        {/* HEADER */} <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur"> <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-8"> <Brand logoUrl={settings.logoUrl} />

            <nav className="hidden items-center gap-7 text-[11px] font-extrabold uppercase tracking-[.16em] text-muted-foreground md:flex">
                <a href="#catalog" className="hover:text-primary">
                    Shop parts
                </a>

                <a href="#why-us" className="hover:text-primary">
                    Why Chaudry
                </a>

                <a href="/contact" className="hover:text-primary">
                    Contact
                </a>
            </nav>

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    onClick={() => setCartOpen(true)}
                    className="relative flex items-center gap-2 bg-secondary px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-secondary-foreground"
                >
                    <ShoppingBag className="size-4" />
                    Cart

                    {cartCount > 0 && (
                        <span className="grid size-5 place-items-center bg-primary text-[10px] text-white">
                            {cartCount}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="grid size-9 place-items-center border border-border md:hidden"
                >
                    {menuOpen ? (
                        <X className="size-4" />
                    ) : (
                        <Menu className="size-4" />
                    )}
                </button>
            </div>
        </div>

            {menuOpen && (
                <nav className="border-t border-border bg-card px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-4 text-xs font-extrabold uppercase tracking-[.13em]">
                        <a href="#catalog">Shop parts</a>
                        <a href="#why-us">Why Chaudry</a>
                        <a href="/admin">Staff console</a>
                    </div>
                </nav>
            )}
        </header>

        <main>
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border bg-[hsl(216_26%_13%)] text-white">
                <div className="workshop-grid absolute inset-0 opacity-20" />

                <div className="absolute -right-20 -top-20 size-80 rounded-full border-[28px] border-primary/20 text-circle " />
                <div className="absolute -right-4 top-0 size-44 rounded-full border border-accent/25" />

                <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-5 flex items-center gap-2 font-display text-[10px] font-medium uppercase tracking-[.22em] text-amber-500">
                            <span className="size-2 bg-amber-500" />
                            {settings.location}
                        </p>

                        <h1 className=" text-[clamp(4rem,10vw,8.6rem)] font-bold bg-circle font-display uppercase leading-[.8] tracking-[-.035em]">
                            {settings.storefrontHeadline}
                        </h1>

                        <p className="mt-8 max-w-lg font-manrope text-base leading-7 text-white/65">
                            {settings.storefrontSubtitle}
                        </p>

                        <a
                            href="#catalog"
                            className="mt-8 inline-flex bg-[#d92d20] font-manrope items-center gap-3 bg-chred px-5 py-3 text-xs font-extrabold uppercase tracking-[.16em] text-white transition-transform hover:-translate-y-1"
                        >
                            {settings.storefrontCta}
                            <ArrowRight className="size-4" />
                        </a>
                    </div>

                    <div className="flex items-end lg:justify-end">
                        <div className="w-full max-w-sm border border-white/15 bg-white/[.04] p-5 backdrop-blur">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="font-manrope text-[10px] uppercase tracking-[.15em] text-amber-300">
                                    Bench status
                                </span>

                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-emerald-300">
                                    <span className="size-1.5 rounded-full bg-emerald-300" />
                                    Live
                                </span>
                            </div>

                            <div className="py-6">
                                <p className="font-display text-5xl font-bold uppercase">
                                    Genuine parts.
                                </p>

                                <p className="mt-2 text-sm leading-6 text-white/55">
                                    No mystery stock. No marketplace roulette. Only components
                                    our team is comfortable putting in your rig.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[.1em] text-amber-300">
                                <div className="border border-white/10 p-3">
                                    <BadgeCheck className="mb-2 size-4 text-teal-400" />
                                    Verified sourcing
                                </div>

                                <div className="border border-white/10 p-3">
                                    <MessageCircle className="mb-2 size-4 text-teal-400" />
                                    Direct WhatsApp
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="red-stripe h-2" />
            </section>

            {/* CATALOG */}
            <section
                id="catalog"
                className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-16 lg:px-8 lg:py-24"
            >
                <div className="flex flex-col justify-between gap-7 border-b border-border pb-8 lg:flex-row lg:items-end">
                    <div>
                        <p className="font-manrope text-[10px] uppercase tracking-[.2em] text-primary">
                            Current inventory
                        </p>

                        <h2 className="mt-2 font-display text-5xl font-bold uppercase leading-none md:text-6xl">
                            Parts on the bench
                        </h2>
                    </div>

                    <div className="flex max-w-lg flex-col gap-3 sm:flex-row">
                        <label className="relative block flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search model or category"
                                className="w-full border border-input bg-card py-3 pl-10 pr-3 text-sm outline-none focus:border-primary"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={() => setCartOpen(true)}
                            className="flex items-center justify-center gap-2 border border-border px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.13em] hover:border-primary"
                        >
                            <ShoppingBag className="size-4" />
                            {cartCount} queued
                        </button>
                    </div>
                </div>

                <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
                    {categories.map((item) => (
                        <button
                            type="button"
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`shrink-0 border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] ${category === item
                                ? "border-chred bg-chred text-white"
                                : "border-border bg-card text-muted-foreground hover:border-chred hover:text-chred"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {filtered.length ? (
                    <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                        {filtered.map((product) => (
                            
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={addToCart}
                                />
                            
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-border py-16 text-center">
                        <Box className="mx-auto size-9 text-muted-foreground/60" />

                        <h3 className="mt-4 font-display text-2xl uppercase">
                            No matching parts
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Try another search or clear the category filter.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setCategory("All");
                                setSearch("");
                            }}
                            className="mt-4 text-xs font-bold uppercase tracking-widest text-primary"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </section>

            {/* WHY US */}
            <section
                id="why-us"
                className="scroll-mt-20 border-y border-border bg-muted/45"
            >
                <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 lg:grid-cols-[.75fr_1.25fr] lg:px-8 lg:py-20">
                    <div>
                        <p className="font-manrope text-[10px] uppercase tracking-[.2em] text-chred">
                            Why the workshop
                        </p>

                        <h2 className="mt-2 max-w-md font-display text-5xl font-bold uppercase leading-[.9]">
                            A straight answer is part of the product.
                        </h2>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        <div>
                            <ShieldCheck className="size-7 text-chred " />

                            <h3 className="mt-5 font-display text-2xl font-bold uppercase">
                                Known source
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                We sell the same components we would use in a customer
                                build. If it is not right, we say so.
                            </p>
                        </div>

                        <div>
                            <Zap className="size-7 text-chred" />

                            <h3 className="mt-5 font-display text-2xl font-bold uppercase">
                                Fast decisions
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Send a queue through WhatsApp and get a human response, not
                                a support ticket.
                            </p>
                        </div>

                        <div>
                            <PackageCheck className="size-7 text-chred" />

                            <h3 className="mt-5 font-display text-2xl font-bold uppercase">
                                Packed properly
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Your parts leave our bench checked, protected and ready for
                                the next step.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* FOOTER */}
        <footer
            id="contact"
            className="scroll-mt-20 bg-[hsl(216_26%_13%)] text-white"
        >
            <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 lg:grid-cols-[1fr_auto] lg:px-8">
                <div>
                    <Brand footer={true} logoUrl={settings.logoUrl} />

                    <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
                        {settings.footerText}
                    </p>
                </div>

                <div className="flex flex-col gap-3 text-sm text-white/65">
                    <p className="font-manrope text-[10px] uppercase tracking-[.18em] text-accent">
                        Need a second opinion?
                    </p>

                    <p>Send your build list to the workshop.</p>

                    <button
                        type="button"
                        onClick={
                            cartCount > 0
                                ? () => setCartOpen(true)
                                : () => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="mt-2 inline-flex items-center gap-2 self-start bg-chred px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
                    >
                        Start an order
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>

            <div className="red-stripe h-2" />
        </footer>
        {cartCount > 0 && !cartOpen && (
            <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
                <div className="flex items-center justify-between gap-4 border border-border bg-card p-3 shadow-2xl backdrop-blur-md">

                    <div className="flex items-center gap-3">
                        <div className="grid size-10 shrink-0 place-items-center bg-chred text-white">
                            <ShoppingBag className="size-5" />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide">
                                {cartCount}{" "}
                                {cartCount === 1 ? "item" : "items"} in cart
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Ready to review your order
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setCartOpen(true)}
                        className="shrink-0 bg-chred px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.13em] text-white transition-transform hover:-translate-y-0.5"
                    >
                        View Cart
                    </button>
                </div>
            </div>
        )}

        {cartOpen && (
            <CartPanel
                lines={cart}
                onClose={() => setCartOpen(false)}
                onChange={changeCart}
                onClear={() => setCart([])}
            />
        )}
    </div>
    );
}