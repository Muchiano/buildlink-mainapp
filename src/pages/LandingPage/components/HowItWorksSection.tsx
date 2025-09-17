import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Handshake, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Create your professional or firm profile in minutes with our simple onboarding process."
  },
  {
    icon: Handshake,
    step: "02", 
    title: "Engage",
    description: "Showcase projects, find collaborators, explore listings, and connect with industry professionals."
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Grow",
    description: "Build your brand, discover new opportunities, and access exclusive industry knowledge and resources."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="process" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps and join Kenya's growing built environment community
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isMiddle = index === 1;
            
            return (
              <div key={index} className="relative">
                <Card className={`${isMiddle ? 'lg:mt-8' : ''} hover:shadow-card-hover transition-all duration-300`}>
                  <CardContent className="p-8 text-center space-y-6">
                    {/* Step Number */}
                    <div className="relative">
                      <div className="text-6xl font-bold text-muted/20 mb-4">
                        {step.step}
                      </div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center">
                        <IconComponent className="text-white" size={28} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold mt-8">{step.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow connector (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-primary"></div>
                      <div className="absolute right-0 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;