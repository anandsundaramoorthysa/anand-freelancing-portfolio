import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Anand consistently managed our LinkedIn presence with daily posts that truly resonated. Within weeks, we saw a noticeable improvements in engagement and brand visibility. A great value for any growing startup!",
      author: "SecumintIT",
      role: "Consulting Services",
      service: "LinkedIn Growth"
    },
    {
      quote: "Anand optimized my LinkedIn in just two days and started getting me real engagement through regular posts. Within weeks, I saw better connections",
      author: "Nandhinee Muthu",
      role: "Founder, SKJ Digital Media",
      service: "LinkedIn Personal Branding"
    },
    {
      quote: "I had a great experience working with Anand. He was very humble, cooperative, and showed a genuine eagerness to complete the work efficiently. His commitment to delivering quality and his openness to feedback truly made the process smooth and pleasant.",
      author: "Karthik Agro",
      role: "Industries",
      service: "Website Development"
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevIndex) =>
        (prevIndex + 1) % testimonials.length
      );
    }, 8000); 

    return () => clearInterval(interval); // Clean up on component unmount
  }, [testimonials.length]);

  const current = testimonials[currentTestimonial];

  // Animation variants for testimonial content
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section id='testimonials' className="py-20 px-6 bg-gradient-to-t from-muted/30 to-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-foreground">
          What Clients <span className="text-primary">Say</span>
        </h2>

        <div className="relative">
          <Card className="p-8 text-center min-h-[340px] md:min-h-[300px] flex flex-col justify-center shadow-lg border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="text-xl md:text-2xl text-primary mb-4 italic font-medium">
                  {current.service ? `For my ${current.service} work` : 'Client Testimonial'}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed flex-grow">
                  {current.quote}
                </blockquote>

                <div className="mt-auto pt-4 border-t border-dashed border-muted-foreground/30 w-full max-w-xs mx-auto">
                  <div className="text-xl font-bold text-foreground">
                    {current.author}
                  </div>
                  {current.role && (
                    <div className="text-sm text-muted-foreground">
                      {current.role}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};