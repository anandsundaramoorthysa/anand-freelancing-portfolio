import { Card } from '@/components/ui/card';
import { useState } from 'react';

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Anand consistently managed our LinkedIn presence with daily posts that truly resonated. Within weeks, we saw a noticeable boost in engagement and brand visibility. A great value for any growing startup!",
      author: "SecumintIT",
      role: "Consulting Services",
      service: "LinkedIn Growth"
    },
    {
      quote: "Anand optimized my LinkedIn in just two days and started getting me real engagement through regular posts. Within weeks, I saw better connections",
      author: "Nandhinee Muthu",
      role: "Founder, SKJ Digital Media",
      service: "LinkedIn Personal Branding"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Clients Say
        </h2>

        <div className="relative">
          <Card className="service-card p-8 text-center min-h-[300px] flex flex-col justify-center">
            <div className="text-2xl text-primary mb-6 italic">
              "For my {testimonials[currentTestimonial].service} work"
            </div>
            <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              {testimonials[currentTestimonial].quote}
            </blockquote>

            <div className="mt-4">
              <div className="text-lg font-semibold text-primary">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-sm text-muted-foreground italic">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
