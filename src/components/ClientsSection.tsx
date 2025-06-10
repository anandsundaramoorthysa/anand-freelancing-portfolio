import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion for animations
import { Card } from "@/components/ui/card"; // Assuming Card component is used for styling

export const ClientsSection = () => {
  const clients = [
    {
      name: 'SecumintIT',
      image: 'https://secumintit.in/assets/img/logo.webp',
      description: 'Helped the company establish a strong online presence.' 
    },
    {
      name: 'SKJ Digital Media',
      image: 'https://media.licdn.com/dms/image/v2/C560BAQFszRaZYxdIyA/company-logo_200_200/company-logo_200_200/0/1631326137293?e=1753920000&v=beta&t=msmhrEcMEaeWhEHkuTStQM6lrbGWeXJTLSmr47jyOSg',
      description: 'Provided digital marketing strategies and execution.' 
    },
    {
      name: 'Karthik & Co.,',
      image: 'https://karthikagro.com/logo1.png',
      description: 'Developed & Maintain their website.' 
    },
  ];

  return (
    <section id="clients" className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-foreground">
          Companies I've <span className="text-primary">Worked With</span>
        </h2>

        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-full">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full" 
              >
                <Card
                  className="p-8 group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col justify-between items-center h-full text-center border-2 border-transparent hover:border-primary/50"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary shadow-md bg-white flex justify-center items-center p-3">
                    <img
                      src={client.image}
                      alt={`${client.name} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="font-bold text-2xl text-foreground mb-2">{client.name}</h3>
                  {client.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                          {client.description}
                      </p>
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