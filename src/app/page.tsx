import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { MerchandisePreviewSection } from "@/components/home/MerchandisePreviewSection";
import { CTABannerSection } from "@/components/home/CTABannerSection";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <MerchandisePreviewSection />
      <CTABannerSection />
      <Footer />
    </main>
  );
}
