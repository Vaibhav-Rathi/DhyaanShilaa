import { AboutSection } from "../Homepage Components/AboutSection";
import { BenefitsSection } from "../Homepage Components/BenefitsSection";
import { CourseSection } from "../Homepage Components/CourseSection";
import { FaqSection } from "../Homepage Components/FaqSection";
import { Footer } from "../Homepage Components/Footer";
import { Header } from "../Homepage Components/Header";
import { HeroSection } from "../Homepage Components/HeroSection";
import { StatsSection } from "../Homepage Components/StatsSection";
import { TestimonialSection } from "../Homepage Components/TestimonialSection";

export const Homepage = () => {
    return (
      <div className="font-sans">
        <Header />
        <HeroSection />
        <StatsSection />
        <BenefitsSection />
        <AboutSection />
        <CourseSection />
        <TestimonialSection />
        <FaqSection />
        <Footer/>
      </div>
    );
  };