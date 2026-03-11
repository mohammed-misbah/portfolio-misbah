import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const projects = [
  {
    title: 'Admin & Client Management WebApp',
    description: 'A comprehensive admin panel for managing clients, users, and business operations with role-based access control and real-time analytics.',
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    color: 'primary',
  },
  {
    title: 'Urban Trash Waste Management System',
    description: 'IoT-integrated waste management platform with route optimization, real-time monitoring, and predictive analytics for smart city solutions.',
    technologies: ['Python', 'Django', 'React', 'AWS IoT', 'PostgreSQL'],
    color: 'coral',
  },
  {
    title: 'Full Stack E-Commerce Platform',
    description: 'Scalable e-commerce solution with payment integration, inventory management, and AI-powered product recommendations.',
    technologies: ['React', 'FastAPI', 'Stripe', 'Redis', 'Docker'],
    color: 'blue',
  },
  {
    title: 'Real-Time Chat Application',
    description: 'End-to-end encrypted messaging platform with WebSocket support, file sharing, and group chat capabilities.',
    technologies: ['React', 'FastAPI', 'WebSocket', 'Redis', 'PostgreSQL'],
    color: 'primary',
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const getGradient = (color: string) => {
    if (color === 'primary') return 'from-primary/10 to-pastel-blue/10';
    if (color === 'coral') return 'from-accent/10 to-pink-highlight/15';
    return 'from-pastel-blue/15 to-primary/10';
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden section-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent rounded-full bg-accent/8 border border-accent/15">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my recent work in full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`relative h-48 bg-gradient-to-br ${getGradient(project.color)} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-2xl animate-float ${
                    project.color === 'primary' ? 'bg-primary/15 border border-primary/20' :
                    project.color === 'coral' ? 'bg-accent/15 border border-accent/20' :
                    'bg-pastel-blue/20 border border-pastel-blue/25'
                  }`} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-lg bg-primary/8 text-primary border border-primary/10">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-muted text-muted-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-card border-border max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-4">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-sm rounded-full bg-primary/8 text-primary border border-primary/15">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
              <Button variant="outline" className="flex-1 border-border hover:bg-muted rounded-xl">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
