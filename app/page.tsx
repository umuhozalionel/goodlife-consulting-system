// app/page.tsx

import Header from "@/components/Header";
import HeroSection from "@/components/hero-section";
import PartnersSection from "@/components/partners-section";
import AboutSection from "@/components/about-section";
import TrainingPrograms from "@/components/training-programs";
import CalendarSection from "@/components/calendar-section";
import LifeAtGoodlife from "@/components/life-at-goodlife";
import WhyChooseUs from "@/components/why-choose-us";
import TeamSection from "@/components/team-section";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <TrainingPrograms />
      <CalendarSection />
      <LifeAtGoodlife />
      <WhyChooseUs />
      <TeamSection />
      <Testimonials />
      <ContactSection />    {/* <-- fixed: no quotes or stray text */}
      <Footer />
      <ChatWidget />
    </div>
  );
}