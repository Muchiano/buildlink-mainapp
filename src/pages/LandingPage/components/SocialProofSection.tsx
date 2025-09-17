import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "Architect, Nairobi",
    content: "BuildLink has transformed how I connect with fellow professionals. The platform makes networking so much easier.",
    rating: 5
  },
  {
    name: "David Kipchoge",
    role: "Civil Engineer, Mombasa", 
    content: "Finally, a dedicated space for Kenya's built environment. The project showcase feature is exactly what we needed.",
    rating: 5
  },
  {
    name: "Grace Achieng",
    role: "Urban Planner, Kisumu",
    content: "The opportunities I've discovered through BuildLink have been game-changing for my career growth.",
    rating: 5
  }
];

const partners = [
  "Architectural Association of Kenya",
  "Institution of Engineers of Kenya",
  "Kenya Institute of Planners",
  "Built Environment Network"
];

const SocialProofSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="text-center mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Professionals</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">20+</div>
              <div className="text-muted-foreground">Projects Shared</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">10+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="text-primary">Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what Kenya's built environment professionals are saying about BuildLink
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-card-hover transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="text-primary" size={32} />

                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-secondary fill-current" size={16} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-8 text-muted-foreground">
            Supported By Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="p-4 bg-muted/50 rounded-lg text-center text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;