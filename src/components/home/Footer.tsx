"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-purple/15 bg-white/70 text-brand-purple transition hover:bg-brand-purple/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-cream">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-4 pb-10 pt-14 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-heading text-2xl font-bold text-brand-purple"
            >
              GinnieTales
            </Link>
            <p className="mt-2 max-w-sm font-body text-sm text-gray-600">
              Your story, illustrated.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <SocialIcon label="Instagram">
                <span className="font-body text-sm font-bold">IG</span>
              </SocialIcon>
              <SocialIcon label="Facebook">
                <span className="font-body text-sm font-bold">FB</span>
              </SocialIcon>
              <SocialIcon label="Twitter/X">
                <span className="font-body text-sm font-bold">X</span>
              </SocialIcon>
              <SocialIcon label="WhatsApp">
                <span className="font-body text-sm font-bold">WA</span>
              </SocialIcon>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="space-y-3">
                <p className="font-body text-sm font-bold text-brand-dark">
                  Product
                </p>
                <div className="flex flex-col gap-2 font-body text-sm text-gray-600">
                  <Link className="hover:text-brand-purple" href="/create">
                    Create Story
                  </Link>
                  <Link className="hover:text-brand-purple" href="/pricing">
                    Pricing
                  </Link>
                  <Link className="hover:text-brand-purple" href="/#how-it-works">
                    How It Works
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-body text-sm font-bold text-brand-dark">
                  Shop
                </p>
                <div className="flex flex-col gap-2 font-body text-sm text-gray-600">
                  <Link className="hover:text-brand-purple" href="/shop">
                    All Products
                  </Link>
                  <Link className="hover:text-brand-purple" href="/shop?category=PRINTED_BOOK">
                    Printed Books
                  </Link>
                  <Link className="hover:text-brand-purple" href="/shop?category=MERCHANDISE">
                    Merchandise
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-body text-sm font-bold text-brand-dark">
                  Company
                </p>
                <div className="flex flex-col gap-2 font-body text-sm text-gray-600">
                  <Link className="hover:text-brand-purple" href="/about">
                    About Us
                  </Link>
                  <Link className="hover:text-brand-purple" href="/blog">
                    Blog
                  </Link>
                  <Link className="hover:text-brand-purple" href="/faq">
                    FAQ & Support
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-body text-sm font-bold text-brand-dark">
                  Legal
                </p>
                <div className="flex flex-col gap-2 font-body text-sm text-gray-600">
                  <Link className="hover:text-brand-purple" href="/privacy">
                    Privacy Policy
                  </Link>
                  <Link className="hover:text-brand-purple" href="/terms">
                    Terms of Service
                  </Link>
                  <Link className="hover:text-brand-purple" href="/refunds">
                    Refund Policy
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-brand-purple/15 bg-white/80 p-5 shadow-sm">
              <p className="font-heading text-lg font-bold text-brand-dark">
                Newsletter
              </p>
              <p className="mt-1 font-body text-sm text-gray-600">
                Get product updates and magical gifting ideas (no spam).
              </p>
              <form
                className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-1">
                  <Input
                    id="newsletter-email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="rounded-full"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-dark/10 pt-6 text-center font-body text-sm text-gray-500">
          © 2025 GinnieTales. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}

