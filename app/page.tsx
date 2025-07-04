import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TrainingPrograms from "@/components/training-programs"
import CalendarSection from "@/components/calendar-section"
import LifeAtGoodlife from "@/components/life-at-goodlife"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <TrainingPrograms />
      <CalendarSection />
      <LifeAtGoodlife /> {/* 💡 New section here */}
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </div>
  )
}