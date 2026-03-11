import { useState } from 'react';
import { Send, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import mascots from '@/assets/contact-mascots.png';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon." });
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden section-gradient-alt">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary rounded-full bg-primary/8 border border-primary/15">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Contact Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Let's discuss your next project
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Mascots */}
          <div className="flex justify-center md:order-2">
            <img 
              src={mascots} 
              alt="Friendly mascot characters" 
              className="w-full max-w-sm float-slow"
            />
          </div>

          {/* Form */}
          <div className="md:order-1">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl">
              <div className="mb-6">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Name
                </label>
                <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" required className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl" />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl" />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Message
                </label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} required className="bg-background border-border focus:border-primary focus:ring-primary/20 resize-none rounded-xl" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-md shadow-primary/15">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" />Send Message</>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground">© 2024 Mohammed Misbah. Built with React & Three.js</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
