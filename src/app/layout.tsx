import type { Metadata, Viewport } from "next";
import { Nunito, Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthSessionProvider } from "@/components/session-provider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GinnieTales — Your story, illustrated.",
  description:
    "GinnieTales turns your ideas into illustrated stories—create, share, and enjoy personalized tales with beautiful artwork.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${quicksand.variable} font-body bg-brand-cream text-brand-dark antialiased`}
      >
        <AuthSessionProvider>{children}</AuthSessionProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-body",
            style: {
              background: "#1A1A2E",
              color: "#FFFBF0",
            },
          }}
        />
      </body>
    </html>
  );
}
