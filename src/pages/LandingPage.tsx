import Header from "./LandingPage/components/Header";
import HeroSection from "./LandingPage/components/HeroSection";
import AboutSection from "./LandingPage/components/AboutSection";
import FeaturesSection from "./LandingPage/components/FeaturesSection";
import HowItWorksSection from "./LandingPage/components/HowItWorksSection";
import CTASection from "./LandingPage/components/CTASection";
import Footer from "./LandingPage/components/LandingFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;