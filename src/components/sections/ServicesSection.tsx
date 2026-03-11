import { Server, Globe, Cloud, Database, Shield } from 'lucide-react';

const services = [
  { icon: Server, title: 'Backend API Development', description: 'Custom REST and GraphQL APIs built with Python, FastAPI, Django, and Flask for high-performance applications.', color: 'primary' },
  { icon: Globe, title: 'Full Stack Web Applications', description: 'End-to-end web solutions from React/Angular frontends to robust Python backends.', color: 'coral' },
  { icon: Cloud, title: 'Cloud Deployment', description: 'AWS, Azure, and DigitalOcean deployment with CI/CD pipelines and infrastructure as code.', color: 'blue' },
  { icon: Database, title: 'Database Architecture', description: 'PostgreSQL, Redis, and MongoDB database design with optimization for scale.', color: 'primary' },
  { icon: Shield, title: 'Security Optimization', description: 'Application security audits, authentication systems, and secure coding practices.', color: 'coral' },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden section-gradient-alt">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent rounded-full bg-accent/8 border border-accent/15">
            What I Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional development services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group glass-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                service.color === 'primary' ? 'bg-primary/10' : service.color === 'coral' ? 'bg-accent/10' : 'bg-pastel-blue/15'
              }`}>
                <service.icon className={`w-8 h-8 ${
                  service.color === 'primary' ? 'text-primary' : service.color === 'coral' ? 'text-accent' : 'text-pastel-blue'
                }`} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 h-0.5 w-0 gradient-line rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
