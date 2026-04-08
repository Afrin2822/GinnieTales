"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: 1,
    title: "Upload Photo",
    description: "Upload a clear face photo of your loved one",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M9 4h6l1.2 2H20a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2h3.8L9 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 2,
    title: "AI Generates Art",
    description:
      "Our AI transforms it into a unique Ghibli-style illustrated character",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M12 3l1.8 5L19 10l-5.2 2L12 17l-1.8-5L5 10l5.2-2L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M19.2 15.2l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    n: 3,
    title: "Get Your Story",
    description: "A personalised 8-12 page story is written just for them",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M4.5 5.5A2.5 2.5 0 0 1 7 3h11.5v16.5H7A2.5 2.5 0 0 0 4.5 22V5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M18.5 19.5H7a2.5 2.5 0 0 0-2.5 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 7h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 4,
    title: "Gift It",
    description: "Download, share, or order a printed copy",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M4 11h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 11v11" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 5c0-2 1.2-3 2.6-3 1.6 0 2.4 1.5 1.6 2.8C15.5 6.2 12 7 12 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 5c0-2-1.2-3-2.6-3-1.6 0-2.4 1.5-1.6 2.8C8.5 6.2 12 7 12 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl lg:text-4xl">
          Create Your Magical Story in 4 Simple Steps
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-body text-gray-600">
          A warm little journey from photo to keepsake—guided by gentle AI magic.
        </p>
      </motion.div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[2px] w-[92%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-purple/25 to-transparent md:block" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative rounded-3xl border border-brand-purple/15 bg-white/85 p-5 shadow-sm backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple">
                  {s.icon}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple text-white font-body text-sm font-bold shadow-sm">
                  {s.n}
                </div>
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-dark">
                {s.title}
              </h3>
              <p className="mt-2 font-body text-sm text-gray-600 sm:text-base">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

