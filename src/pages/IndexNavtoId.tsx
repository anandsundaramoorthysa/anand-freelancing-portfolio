import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { IDCardEntry } from '@/components/IDCardEntry';
import { CursorFollower } from '@/components/CursorFollower';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ClientsSection } from '@/components/ClientsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setShowPortfolio(true);
      toast.success("Welcome to my portfolio! 🎉");
    }, 800);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  if (!showPortfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-purple/5 relative overflow-hidden">
        <CursorFollower />
        <div className="absolute top-6 right-6 z-50">
        </div>
        <IDCardEntry onUnlock={handleUnlock} isUnlocked={isUnlocked} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-purple/5 relative">
      <CursorFollower />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Anand Works</div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#clients" className="text-foreground hover:text-primary transition-colors">My Clients</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
              className="focus-visible:ring-offset-background focus-visible:ring-ring focus-visible:ring-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/90 backdrop-blur-md pb-4 pt-2 border-t border-border">
            <div className="flex flex-col items-center gap-4">
              <a href="#about" onClick={handleNavLinkClick} className="text-foreground text-lg hover:text-primary transition-colors py-2 w-full text-center">About</a>
              <a href="#clients" onClick={handleNavLinkClick} className="text-foreground text-lg hover:text-primary transition-colors py-2 w-full text-center">Work</a> 
              <a href="#testimonials" onClick={handleNavLinkClick} className="text-foreground text-lg hover:text-primary transition-colors py-2 w-full text-center">Clients Say</a> 
              <a href="#contact" onClick={handleNavLinkClick} className="text-foreground text-lg hover:text-primary transition-colors py-2 w-full text-center">Contact</a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        {/* <PortfolioSection /> */} 
        <ClientsSection /> 
        <TestimonialsSection />
        <ContactSection />
      </main>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="text-muted-foreground font-bold">
              © {currentYear} <a
                href="https://www.linkedin.com/in/anandsundaramoorthysa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground font-bold text-lg hover:text-primary transition-colors"
              >ANAND SUNDARAMOORTHY SA.</a> All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;