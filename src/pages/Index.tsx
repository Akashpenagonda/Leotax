import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PaymentSection } from "@/components/PaymentSection";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <WhatWeDoSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <PaymentSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
