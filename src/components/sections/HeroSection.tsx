import { useRef } from 'react';
import { Button } from '../ui/button';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import heroImage from '@/assets/hero-pastel.png';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Image with floating animation */}
      <div className="absolute inset-0 z-0 hero-float">
        <img 
          src={heroImage} 
          alt="Mohammed Misbah - Full Stack Developer 3D Workstation" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/30 to-transparent z-[1]" />


      {/* Bottom CTA */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-5 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => scrollToSection('projects')}
            className="px-6 py-5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-md shadow-primary/15"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Projects
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="px-6 py-5 font-semibold border-border text-foreground hover:bg-muted rounded-xl"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-primary animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
