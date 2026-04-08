"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6" aria-hidden>
      <span
        className={cn(
          "absolute left-0 top-0 h-0.5 w-6 rounded bg-brand-purple transition-transform duration-200",
          open && "translate-y-[9px] rotate-45"
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[9px] h-0.5 w-6 rounded bg-brand-purple transition-opacity duration-200",
          open && "opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[18px] h-0.5 w-6 rounded bg-brand-purple transition-transform duration-200",
          open && "-translate-y-[9px] -rotate-45"
        )}
      />
    </div>
  );
}

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  const initials = useMemo(() => {
    const n = (name ?? "").trim();
    if (!n) return "GT";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "GT";
  }, [name]);

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name ?? "User"}
        className="h-9 w-9 rounded-full border border-brand-purple/20 object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-purple/20 bg-brand-purple/10 font-body text-sm font-semibold text-brand-purple">
      {initials}
    </div>
  );
}

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className="sticky top-0 z-50"
      animate={
        scrolled
          ? { backgroundColor: "rgba(255,255,255,0.92)", boxShadow: "0 10px 30px rgba(26,26,46,0.08)" }
          : { backgroundColor: "rgba(255,251,240,0)", boxShadow: "0 0px 0px rgba(0,0,0,0)" }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-brand-purple transition hover:text-brand-rose"
        >
          GinnieTales ✨
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-sm font-semibold text-brand-dark/75 transition hover:text-brand-purple"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="font-body text-sm font-semibold text-brand-dark/75 transition hover:text-brand-purple"
              >
                Dashboard
              </Link>
              <Avatar src={session.user?.image} name={session.user?.name} />
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}

          <Link href="/create">
            <Button variant="primary" size="sm" className="rounded-full px-5">
              Create Story
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Hamburger open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
              <div className="rounded-2xl border border-brand-purple/15 bg-white/95 p-4 shadow-sm">
                <div className="flex flex-col gap-2">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2 font-body text-sm font-semibold text-brand-dark/80 transition hover:bg-brand-purple/10 hover:text-brand-purple"
                    >
                      {l.label}
                    </Link>
                  ))}

                  <div className="mt-2 flex items-center justify-between gap-3">
                    {status === "authenticated" ? (
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="font-body text-sm font-semibold text-brand-dark/75 transition hover:text-brand-purple"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="ghost" size="sm">
                          Login
                        </Button>
                      </Link>
                    )}
                    <Link href="/create" onClick={() => setOpen(false)}>
                      <Button variant="primary" size="sm" className="rounded-full px-5">
                        Create Story
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

