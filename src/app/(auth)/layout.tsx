import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-[#faf5ff] to-brand-purple/20 px-4 py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center">
        <Link
          href="/"
          className="mb-8 text-center font-heading text-2xl font-bold tracking-tight text-brand-purple transition hover:text-brand-rose sm:text-3xl"
        >
          GinnieTales
        </Link>
        <div className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-brand-purple/15 ring-1 ring-brand-purple/10 sm:p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
