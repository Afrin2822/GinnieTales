"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const products = [
  { name: "Printed Storybook", price: "From ₹299" },
  { name: "Plush Toy", price: "From ₹499" },
  { name: "Poster / Wall Art", price: "From ₹199" },
  { name: "Greeting Card", price: "From ₹99" },
] as const;

export function MerchandisePreviewSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl lg:text-4xl">
          Beyond the Book — Shop the GinnieTales Collection
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-body text-gray-600">
          Turn their character into keepsakes you can hold, hang, hug, and gift.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-10"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ y: -6, boxShadow: "0 18px 45px rgba(26,26,46,0.12)" }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="rounded-3xl border border-brand-purple/15 bg-white/85 p-5 shadow-sm backdrop-blur-sm"
            >
              <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-brand-purple/25 bg-gradient-to-br from-brand-cream to-white">
                <p className="font-body text-sm font-semibold text-brand-dark/60">
                  Product Image
                </p>
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-dark">
                {p.name}
              </h3>
              <p className="mt-1 font-body text-sm text-gray-600">{p.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/shop">
            <Button variant="secondary" size="lg" className="rounded-full px-8">
              Shop All
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

