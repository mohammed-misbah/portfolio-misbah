import { Code2, Server, Cloud, Shield, Building2, MapPin, Calendar, ChevronRight } from 'lucide-react';

const AboutSection = () => {
  const focusAreas = [
    { icon: Server, title: 'Backend Engineering', desc: 'Building robust APIs with Python, FastAPI, Django', color: 'primary' },
    { icon: Cloud, title: 'Cloud Infrastructure', desc: 'AWS, Azure, and Docker deployments', color: 'pastel-blue' },
    { icon: Code2, title: 'API Architecture', desc: 'RESTful and GraphQL API design', color: 'coral' },
    { icon: Shield, title: 'Security Optimization', desc: 'Secure, scalable application patterns', color: 'primary' },
  ];

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'RCS Tech LLP',
      location: 'Bangalore, India',
      period: 'Aug 2024 – Present',
      color: 'primary' as const,
      summary: 'Backend development and cloud infrastructure, building secure, scalable applications with modern DevOps practices.',
      highlights: [
        'Developed backend services using Python (Flask), improving stability and resolving security vulnerabilities',
        'Built and maintained Azure CI/CD pipelines for smooth release cycles',
        'Deployed services across Azure App Services, PostgreSQL, Blob Storage, Key Vault & Functions',
        'Managed AWS cloud infrastructure for scalable, highly available environments',
        'Monitored and resolved vulnerabilities using Snyk and SonarQube',
      ],
      tags: ['Python', 'Flask', 'Azure', 'AWS', 'CI/CD', 'PostgreSQL'],
    },
    {
      role: 'Backend Python Developer',
      company: 'Zilmozney (Zil Bank)',
      location: 'Manjeri, India',
      period: 'Aug 2023 – Nov 2023',
      color: 'coral' as const,
      summary: 'Backend services for a banking platform — secure integrations, fraud detection, and scalable API architecture.',
      highlights: [
        'Built backend services using Python (FastAPI) for a mission-critical financial platform',
        'Designed fraud detection scoring system using card BIN, email reputation, IP intelligence & geo-mismatch detection',
        'Implemented secure client integrations with authentication and compliance protocols',
        'Improved deployment efficiency using Azure DevOps CI/CD pipelines',
      ],
      tags: ['FastAPI', 'Fraud Detection', 'Azure DevOps', 'FinTech', 'Security'],
    },
    {
      role: 'Software Engineer Intern',
      company: 'Brototype',
      location: 'Kochi, India',
      period: '2022 – Aug 2023',
      color: 'pastel-blue' as const,
      summary: 'Full-stack development across multiple real-world applications with focus on scalability and secure design.',
      highlights: [
        'Built a full-stack e-commerce platform using Django, React, and AWS',
        'Developed a waste management system with payment integration and automated notifications',
        'Implemented real-time chat using WebSocket for live messaging',
        'Performed web scraping and data extraction for automation features',
      ],
      tags: ['Django', 'React', 'AWS', 'WebSocket', 'Full Stack'],
    },
  ];

  const getColorClasses = (color: 'primary' | 'coral' | 'pastel-blue') => ({
    bg: color === 'primary' ? 'bg-primary/10' : color === 'coral' ? 'bg-accent/10' : 'bg-pastel-blue/15',
    text: color === 'primary' ? 'text-primary' : color === 'coral' ? 'text-accent' : 'text-pastel-blue',
    border: color === 'primary' ? 'border-primary/20' : color === 'coral' ? 'border-accent/20' : 'border-pastel-blue/20',
    dot: color === 'primary' ? 'bg-primary' : color === 'coral' ? 'bg-accent' : 'bg-pastel-blue',
    glow: color === 'primary' ? 'shadow-primary/20' : color === 'coral' ? 'shadow-accent/20' : 'shadow-pastel-blue/20',
    tagBg: color === 'primary' ? 'bg-primary/8' : color === 'coral' ? 'bg-accent/8' : 'bg-pastel-blue/10',
    tagText: color === 'primary' ? 'text-primary' : color === 'coral' ? 'text-accent' : 'text-pastel-blue',
  });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden section-gradient">
      <div className="container mx-auto px-6 relative z-10">
        {/* About Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary rounded-full bg-primary/8 border border-primary/15">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Who I Am
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Python backend developer experienced in FastAPI, Django, Flask, and cloud infrastructure. 
            I focus on building secure, scalable applications and automation systems.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                area.color === 'primary' ? 'bg-primary/10' : area.color === 'coral' ? 'bg-accent/10' : 'bg-pastel-blue/15'
              }`}>
                <area.icon className={`w-7 h-7 ${
                  area.color === 'primary' ? 'text-primary' : area.color === 'coral' ? 'text-accent' : 'text-pastel-blue'
                }`} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{area.title}</h3>
              <p className="text-sm text-muted-foreground">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent rounded-full bg-accent/8 border border-accent/15">
              Career Journey
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Professional Experience
            </h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-pastel-blue" />

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const colors = getColorClasses(exp.color);
                return (
                  <div key={index} className="relative pl-16 md:pl-20 group">
                    {/* Timeline dot */}
                    <div className={`absolute left-4 md:left-6 top-8 w-4 h-4 rounded-full ${colors.dot} ring-4 ring-background shadow-lg ${colors.glow} z-10 transition-transform duration-300 group-hover:scale-125`} />
                    
                    {/* Experience Card */}
                    <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${colors.glow} border-l-2 ${colors.border}`}>
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <h4 className="font-display text-xl font-bold text-foreground mb-1">
                              {exp.role}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Building2 className={`w-3.5 h-3.5 ${colors.text}`} />
                                {exp.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${colors.tagBg} ${colors.tagText} border ${colors.border} whitespace-nowrap`}>
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.summary}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="px-6 pb-4">
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="px-6 pb-5">
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${colors.tagBg} ${colors.tagText}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
