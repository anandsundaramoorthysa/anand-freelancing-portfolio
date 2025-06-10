import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const PortfolioSection = () => {
  const [portfolioData, setPortfolioData] = useState({
    linkedin: [],
    writing: [],
    websites: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const linkedinClients = [
        {
          id: 1,
          name: 'SecumintIT',
          image: 'https://secumintit.in/assets/img/logo.webp',
          url: 'https://secumintit.in/',
          linkedin: 'https://www.linkedin.com/company/secumintit/',
          service: 'Helped the company grow on LinkedIn through daily posts and engagement',
          tag: 'LinkedIn Growth for Company'
        },
        {
          id: 2,
          name: 'SKJ Digital Media',
          image: 'https://media.licdn.com/dms/image/v2/C560BAQFszRaZYxdIyA/company-logo_200_200/company-logo_200_200/0/1631326137293?e=1753920000&v=beta&t=msmhrEcMEaeWhEHkuTStQM6lrbGWeXJTLSmr47jyOSg',
          url: 'https://digitalizewithnandy.com/',
          linkedin: 'https://www.linkedin.com/in/nandhineemuthu/',
          service: 'Managed the Founder’s LinkedIn account with daily posts and engagement to enhance professional presence.',
          tag: 'LinkedIn Personal Branding'
        },
      ];

      const websiteProjects = [
        {
          id: 1,
          title: "Karthik Agro Website",
          description: "Developed a website for Karthik Agro, showcasing their products, services, and company information.",
          badges: ["React", "TypeScript", "Tailwind CSS"],
          label: "Live Site",
          liveLink: "https://karthikagro.com/",
          image: "https://karthikagro.com/logo1.png"
        },
      ];

      const data = {
        linkedin: linkedinClients,
        // Removed the dummy writing data
        writing: [], 
        websites: websiteProjects,
      };
      setPortfolioData(data);
    };

    fetchData();
  }, []);

  return (
    <section id="portfolio" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-foreground">
          My Portfolio
        </h2>

        {/* LinkedIn Projects Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-4">LinkedIn Projects</h3>
          <div className="w-20 h-1 bg-primary rounded-full mb-12 mx-auto" />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
            {portfolioData.linkedin.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full max-w-sm"
              >
                <Card className="p-8 group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out text-center border-2 border-transparent hover:border-primary/50 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary shadow-md bg-white flex justify-center items-center p-3">
                    <img
                      src={client.image}
                      alt={`${client.name} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h4 className="font-bold text-2xl text-foreground mb-2">{client.name}</h4>
                  <p className="text-md text-primary mb-3">{client.tag}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4">{client.service}</p>

                  <div className="flex flex-wrap justify-center gap-3 mt-auto">
                    {client.url && client.url !== "None" && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 px-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-primary transition"
                      >
                        <a href={client.url} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit Website
                        </a>
                      </Button>
                    )}
                    {client.linkedin && client.linkedin !== "None" && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 px-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-blue-600 transition"
                      >
                        <a href={client.linkedin} target="_blank" rel="noopener noreferrer">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9H0v12h4zM2 6a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Writing Section */}
        {/* This section will now appear if you add data to portfolioData.writing */}
        {portfolioData.writing.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-accent-purple text-center mb-4">
              Technical Writing
            </h3>
            <div className="w-20 h-1 bg-accent-purple rounded-full mb-12 mx-auto" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center text-center px-2"
            >
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
                I haven't worked for any company yet in the domain of technical writing. However, I’ve been actively writing tech blogs on <span className="font-medium text-accent-purple">Medium</span> and publishing them on my <span className="font-medium text-accent-purple">portfolio site</span>.
              </p>

              <p className="text-sm text-muted-foreground italic mb-6">
                ✍️ 10+ Blogs Published
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 px-6 shadow-sm hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-accent-purple transition"
                >
                  <a href="https://medium.com/@anandsundaramoorthysa" target="_blank" rel="noopener noreferrer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 3v18h20V3H2zm2.83 3.36 4.2 5.93-4.2 6.25V6.36zm5.57 8.43L17 6.36v11.28l-8.6-2.85zm9.77 3.7V6.5l1.8 2.5v7.84l-1.8 1.65z" />
                    </svg>
                    Medium
                  </a>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 px-6 shadow-sm hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-accent-purple transition"
                >
                  <a href="https://anand.jigg.win/blog" target="_blank" rel="noopener noreferrer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    Portfolio Blog
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Website Projects Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-accent-emerald text-center mb-4">Website Projects</h3>
          <div className="w-20 h-1 bg-accent-emerald rounded-full mb-12 mx-auto" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.websites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="p-6 h-full flex flex-col group hover:shadow-xl hover:shadow-accent-emerald/20 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-accent-emerald/50">
                  <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center text-muted-foreground text-sm">
                    {/* Use the specific image provided for the project */}
                    <img src={item.image} alt={`${item.title} Screenshot`} className="object-cover w-full h-full rounded-md" />
                  </div>
                  <h4 className="font-bold text-xl text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.badges && item.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent-emerald/10 text-accent-emerald hover:bg-accent-emerald/20">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  {item.liveLink && (
                    <Button asChild className="w-full mt-auto bg-accent-emerald hover:bg-accent-emerald/90 text-white transition-all duration-300">
                      <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
                        {item.label || "View Project"}
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};