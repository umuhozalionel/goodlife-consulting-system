import Header from "@/components/Header";
import HeroSection from "@/components/hero-section";
import PartnersSection from "@/components/partners-section"; // 👈 Add this
import AboutSection from "@/components/about-section";
import TrainingPrograms from "@/components/training-programs";
import CalendarSection from "@/components/calendar-section";
import LifeAtGoodlife from "@/components/life-at-goodlife";
import WhyChooseUs from "@/components/why-choose-us";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PartnersSection /> {/* 👈 Inserted here */}
      <AboutSection />
      <TrainingPrograms />
      <CalendarSection />
      <LifeAtGoodlife />
      <Testimonials />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </div>
  );
}