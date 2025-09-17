import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rotate-45"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rotate-45"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            Join Kenya's first dedicated platform for built environment professionals.
          </h2>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="#">
              <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-12 py-6 bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              Join Our Waitlist
              <ArrowRight className="ml-2" size={20} />
            </Button>
            </a>
          </div>

          {/* Small print */}
          <p className="text-sm opacity-70 mt-8">
            Trusted by AAK
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
