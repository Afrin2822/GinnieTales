"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const headlineWords = ["Your", "Story,", "Illustrated.", "✨"];
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: i % 3 === 0 ? 8 : i % 2 === 0 ? 6 : 4,
  left: `${(i * 13) % 100}%`,
  top: `${(i * 17) % 100}%`,
  duration: 6 + (i % 6),
  delay: (i % 5) * 0.35,
}));

function CameraIcon() {
  return (
    <svg className="h-7 w-7 text-brand-purple/70" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4h6l1.2 2H20a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2h3.8L9 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg className="h-7 w-7 text-brand-rose/80" viewBox="0 0 24 24" fill="none">
      <path
        d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m18.5 15 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, 220]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 sm:px-6 sm:py-16">
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(130deg,#FFFBF0_0%,#F7EEFF_45%,#FFFFFF_100%)]"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={p.id % 4 === 0 ? "absolute text-brand-rose/35" : "absolute rounded-full bg-brand-purple/20"}
            style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
            animate={{
              y: [0, -16, 0],
              x: [0, p.id % 2 === 0 ? 7 : -7, 0],
              opacity: [0.25, 0.8, 0.25],
              rotate: p.id % 4 === 0 ? [0, 35, 0] : 0,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {p.id % 4 === 0 ? "✦" : null}
          </motion.div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 pt-6 text-center sm:gap-12">
        <div className="space-y-6">
          <motion.h1
            className="font-heading text-3xl font-bold leading-tight text-brand-dark sm:text-4xl lg:text-5xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.22 } },
            }}
          >
            {headlineWords.map((word) => (
              <motion.span
                key={word}
                className="mr-2.5 inline-block"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mx-auto max-w-3xl font-body text-base text-gray-600 sm:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Upload a photo. Watch it become a Ghibli-style character. Get a personalised storybook made just for them.
          </motion.p>

          <motion.div
            className="mx-auto flex w-full max-w-sm flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.25 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 8px 24px rgba(107,70,193,0.25)",
                  "0 14px 36px rgba(107,70,193,0.38)",
                  "0 8px 24px rgba(107,70,193,0.25)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full rounded-full"
            >
              <motion.div
                className="relative overflow-hidden rounded-full"
                initial={false}
                animate={{}}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  animate={{ x: ["-140%", "140%"] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
                />
                <Link
                  href="/create"
                  className="relative block rounded-full bg-brand-purple px-8 py-4 font-body text-lg font-semibold text-white"
                >
                  Create Your Story →
                </Link>
              </motion.div>
            </motion.div>

            <Link
              href="#steps"
              className="font-body text-sm font-medium text-brand-purple transition hover:text-brand-rose"
            >
              See how it works ↓
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.4 }}
        >
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <div className="w-full max-w-sm rounded-2xl border border-brand-purple/15 bg-white/85 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex h-52 items-center justify-center rounded-xl border-2 border-dashed border-brand-purple/30 bg-brand-cream/70">
                <div className="flex flex-col items-center gap-2">
                  <CameraIcon />
                  <p className="font-body text-base font-semibold text-brand-dark">Your Photo</p>
                </div>
              </div>
            </div>

            <motion.div
              className="font-heading text-3xl text-brand-purple/75 md:text-4xl"
              animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨→
            </motion.div>

            <div className="w-full max-w-sm rounded-2xl border border-brand-rose/20 bg-white/85 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex h-52 items-center justify-center rounded-xl border-2 border-dashed border-brand-rose/35 bg-white">
                <div className="flex flex-col items-center gap-2">
                  <SparkleIcon />
                  <p className="font-body text-base font-semibold text-brand-dark">Your Character</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-body text-sm text-brand-dark/70 sm:text-base">
            AI transforms your photo into a unique illustrated character
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center font-body text-sm text-gray-500 sm:flex-row sm:gap-5">
            <p>✨ 1000+ Stories Created</p>
            <span className="hidden sm:inline">|</span>
            <p>🎁 Perfect for Gifting</p>
            <span className="hidden sm:inline">|</span>
            <p>📱 Works on Any Device</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
