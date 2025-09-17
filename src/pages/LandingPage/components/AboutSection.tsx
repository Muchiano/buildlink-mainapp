import { Card } from "@/components/ui/card";
import { Building2, Users2, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 max-w-4xl mx-auto gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                About <span className="text-primary">BuildLink</span>
              </h2>
              <p className="text-xl text-foreground leading-relaxed text-center">
                BuildLink is a digital ecosystem designed for architects, engineers, planners, 
                students, and construction professionals across Kenya. We're building a unified 
                space to network, learn, showcase, and grow the industry.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <span className="text-lg font-medium text-center">#ProfessionalProfiles</span>
              <span className="text-lg font-medium text-center">#ProjectShowcase</span>
              <span className="text-lg font-medium text-center">#KnowledgeExchange</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;