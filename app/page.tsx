import { Header } from "../components/landing/header";
import { HeroSection } from "../components/landing/hero-section";
import { FeaturesSection } from "../components/landing/features-section";
import { ModulesSection } from "../components/landing/modules-section";
import { CTASection } from "../components/landing/cta-section";
import { Footer } from "../components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ModulesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
