import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Chen', role: 'CTO, TechStart Inc.', content: 'Misbah delivered an exceptional API architecture that scaled our platform to handle 10x traffic. His expertise in FastAPI and cloud infrastructure is outstanding.', rating: 5 },
  { name: 'Michael Rodriguez', role: 'Product Manager, DataFlow', content: 'Working with Misbah was a game-changer. He understood our complex requirements and delivered a robust solution ahead of schedule.', rating: 5 },
  { name: 'Emily Watson', role: 'Founder, GreenTech Solutions', content: 'The waste management system Misbah built transformed our operations. His attention to detail and technical skills are remarkable.', rating: 5 },
  { name: 'David Kim', role: 'Lead Developer, CloudNine', content: "Exceptional backend developer. Misbah's code is clean, well-documented, and follows best practices. Highly recommended!", rating: 5 },
];

const avatarColors = [
  'from-primary to-pastel-blue',
  'from-accent to-pink-highlight',
  'from-pastel-blue to-primary',
  'from-primary to-accent',
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden section-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary rounded-full bg-primary/8 border border-primary/15">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Feedback from collaborators and clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="glass-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/6" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-primary/80 text-primary/80" />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center`}>
                  <span className="text-lg font-bold text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
