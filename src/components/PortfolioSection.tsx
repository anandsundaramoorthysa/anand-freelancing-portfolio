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
      const data = {
        linkedin: [
          {
            id: 1,
            title: "Tech Startup CEO",
            description: "Complete LinkedIn transformation resulting in 3x connection requests.",
            badges: ["Profile Makeover", "+250% Views"],
            label: "Before/After",
          },
        ],
        writing: [
          {
            id: 1,
            title: "Modern Web Development",
            description: "Comprehensive guide on React best practices and performance optimization.",
            label: "Article Preview",
          },
        ],
        websites: [
          {
            id: 1,
            title: "E-commerce Platform",
            description: "Modern, responsive e-commerce solution with advanced features.",
            badges: ["React", "TypeScript", "Tailwind"],
            label: "Website Screenshot",
            liveLink: "https://www.example.com/ecommerce-dummy" 
          },
          {
            id: 2,
            title: "Portfolio Site Redesign",
            description: "Reimagined personal portfolio with modern UI/UX principles.",
            badges: ["Next.js", "React", "Tailwind CSS"],
            label: "Live Demo",
            liveLink: "https://www.example.com/portfolio-dummy"
          },
        ],
      };
      setPortfolioData(data);
    };

    fetchData();
  }, []);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Portfolio</h2>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">LinkedIn Projects</h3>
          <div className="w-16 h-1 bg-primary rounded-full mb-8 mx-auto" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {portfolioData.linkedin.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="service-card p-6 group hover:shadow-lg transition text-center">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{item.label}</span>
                  </div>
                  <div className="flex gap-2 mb-3 justify-center">
                    {item.badges?.map((badge, idx) => (
                      <Badge key={idx} variant={idx === 0 ? "secondary" : "outline"} className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-primary transition"
                  >
                    View Case Study
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-accent-purple text-center mb-2">
            Technical Writing
          </h3>

          <div className="w-16 h-1 bg-accent-purple rounded-full mb-8 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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

          {/*
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.writing.map((item) => (
              <Card key={item.id} className="service-card p-6 group">
                <div className="aspect-video bg-gradient-to-br from-accent-purple/20 to-accent-purple/40 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-accent-purple font-semibold">{item.label}</span>
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-accent-purple transition"
                >
                  Read Article
                </Button>
              </Card>
            ))}
          </div> */}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-accent-emerald text-center">Website Projects</h3>
          <div className="w-16 h-1 bg-accent-emerald rounded-full mb-8 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center px-2 mb-8"
          >
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              While I haven’t developed websites for individual clients yet, I’ve worked on several <span className="font-medium text-accent-emerald">real-time web development projects</span> during my UG and within my company. You can explore some of these projects by clicking the button below.
            </p>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-6 shadow-sm hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-accent-emerald transition"
            >
              <a href="https://anand.jigg.win/portfolio" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                View All My Projects
              </a>
            </Button>
          </motion.div>
          {/* 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {portfolioData.websites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="service-card p-6 group hover:shadow-lg transition text-center">
                  <div className="aspect-video bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/40 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-accent-emerald font-semibold">{item.label}</span>
                  </div>
                  <div className="flex gap-2 mb-3 justify-center">
                    {item.badges?.map((badge, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="hover:shadow-md hover:scale-[1.03] hover:ring-2 hover:ring-accent-emerald transition"
                  >
                    <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
                      Live Site
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div> */}
        </div>

      </div>
    </section>
  );
};