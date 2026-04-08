"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sparkles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: i % 3 === 0 ? 10 : i % 2 === 0 ? 7 : 5,
  left: `${(i * 19) % 100}%`,
  top: `${(i * 23) % 100}%`,
  duration: 5 + (i % 6),
  delay: (i % 6) * 0.25,
}));

export function CTABannerSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-purple via-[#7b56d6] to-brand-rose px-6 py-12 shadow-xl sm:px-10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-90">
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute text-white/40"
              style={{ left: s.left, top: s.top, fontSize: s.size }}
              animate={{ y: [0, -14, 0], opacity: [0.25, 0.75, 0.25], rotate: [0, 25, 0] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to create something magical?
          </h2>
          <p className="mt-3 font-body text-base text-white/90 sm:text-lg">
            Give the gift of a personalised story. Perfect for birthdays, anniversaries, and every special moment.
          </p>

          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-body text-base font-bold text-brand-purple shadow-lg shadow-black/10"
            >
              Create Your Story Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

