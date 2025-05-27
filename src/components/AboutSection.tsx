import { Badge } from '@/components/ui/badge';

export const AboutSection = () => {
  const services = [
    'Web Development',
    'Web Management',
    'LinkedIn Optimization',
    'LinkedIn Personal Branding & Management',
    'Technical Writing',
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Who Am I?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center justify-center text-center md:text-left">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary-200 to-primary-400 rounded-2xl flex items-center justify-center shadow-2xl animate-blob-bounce transition-shadow duration-600 ease-out hover:scale-105 hover:shadow-primary-500/50">
                <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-center overflow-hidden">
                  <img
                    src="/Anand3.jpg"
                    alt="Anand Sundaramoorthy SA"
                    className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-warm rounded-full animate-float" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent-purple rounded-full animate-float" />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="max-w-prose md:text-left text-center px-4 sm:px-6 md:px-0">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-8 mb-6">
                I'm a freelancer, helping individuals and startups build their online presence through clean websites, streamlined web management, and strong personal branding.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-8">
                I specialize in LinkedIn optimization and personal brand management to help professionals grow their influence and visibility.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-8 mt-4">
                I began freelancing in April 2025 and currently work with clients including a Founder & Director of a digital agency and a startup IT consulting firm — offering tailored LinkedIn management and branding strategies that drive engagement and impact.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16">My Services</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service, index) => (
              <Badge
                key={service}
                variant="secondary"
                className="px-5 py-2 text-sm sm:text-base md:text-lg font-medium"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
