"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "I gifted this to my daughter for her birthday—she squealed when she saw “herself” in the story. We’ve read it every night since.",
    name: "Priya S. — Mom of 2",
  },
  {
    quote:
      "The illustration feels straight out of a cozy movie. The story was sweet, personal, and surprisingly emotional.",
    name: "Ankit R. — Uncle & proud gifter",
  },
  {
    quote:
      "Perfect last‑minute gift that didn’t feel last‑minute at all. The character looked magical and the book felt made just for him.",
    name: "Meera K. — Auntie extraordinaire",
  },
  {
    quote:
      "We made one for our nephew and ended up making three more for cousins. Everyone wants their own little adventure now.",
    name: "Sarah M. — Family storyteller",
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-1 text-brand-coral" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7L12 17.3Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const cards = useMemo(() => testimonials, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4500);
    return () => window.clearInterval(t);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

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
          Families Love GinnieTales
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-body text-gray-600">
          Little gasps, big smiles, bedtime re‑reads—these are our favorite reviews.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-10"
      >
        <div className="relative overflow-hidden rounded-3xl border border-brand-purple/15 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-rose/5" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <p className="font-body text-sm font-semibold text-brand-dark/70">
                Loved by families everywhere
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-xl border border-brand-dark/10 bg-white px-3 py-2 font-body text-sm font-semibold text-brand-dark/80 transition hover:border-brand-purple/25 hover:text-brand-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl border border-brand-dark/10 bg-white px-3 py-2 font-body text-sm font-semibold text-brand-dark/80 transition hover:border-brand-purple/25 hover:text-brand-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="mt-6 min-h-[180px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <Stars />
                  <p className="font-body text-base leading-relaxed text-brand-dark/85 sm:text-lg">
                    “{cards[index].quote}”
                  </p>
                  <p className="font-body text-sm font-semibold text-brand-purple">
                    {cards[index].name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition",
                    i === index ? "bg-brand-purple" : "bg-brand-dark/15 hover:bg-brand-purple/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

