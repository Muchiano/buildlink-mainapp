import { Card, CardContent } from "@/components/ui/card";
import { Users, Presentation, Calendar, BookOpen, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Discover Professionals",
    description: "Browse & connect with verified profiles of built environment experts across Kenya.",
    color: "primary"
  },
  {
    icon: Presentation,
    title: "Showcase Projects",
    description: "Share your body of work with the community and build your professional portfolio.",
    color: "primary"
  },
  {
    icon: Calendar,
    title: "Explore Events & Tenders",
    description: "Stay informed with upcoming workshops, calls, and opportunities in the industry.",
    color: "accent"
  },
  {
    icon: BookOpen,
    title: "Access Resources",
    description: "Read articles, download guides, and stay ahead with curated industry content.",
    color: "primary"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Core <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to connect, showcase, and grow in Kenya's built environment industry
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = {
              primary: "text-primary bg-primary/10",
              secondary: "text-secondary bg-secondary/10",
              accent: "text-accent bg-accent/10"
            };

            return (
              <Card 
                key={index} 
                className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-6 text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="mx-auto text-primary" size={20} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;