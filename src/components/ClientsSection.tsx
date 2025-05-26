import { Button } from "@/components/ui/button";

export const ClientsSection = () => {
  const clients = [
    {
      name: 'SecumintIT',
      image: 'https://secumintit.in/assets/img/logo.webp',
      url: 'https://secumintit.in/',
      linkedin: 'https://www.linkedin.com/company/secumintit/',
      service: 'Helped the company grow on LinkedIn through daily posts and engagement',
      tag: 'LinkedIn Growth for Company'
    },
    {
      name: 'SKJ Digital Media',
      image: 'https://media.licdn.com/dms/image/v2/C560BAQFszRaZYxdIyA/company-logo_200_200/company-logo_200_200/0/1631326137293?e=1753920000&v=beta&t=msmhrEcMEaeWhEHkuTStQM6lrbGWeXJTLSmr47jyOSg',
      url: 'https://digitalizewithnandy.com/',
      linkedin: 'https://www.linkedin.com/in/nandhineemuthu/',
      service: 'Managed the Founder’s LinkedIn account with daily posts and engagement to enhance professional presence.',
      tag: 'LinkedIn Personal Branding'
    },
  ];

  return (
    <section id="clients" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Worked With
        </h2>

        <div className="flex justify-center w-full"> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mx-auto w-fit">
            {clients.map((client, index) => (
              <div
                key={client.name}
                className="group relative bg-card border border-border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 min-h-[380px] flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary-500 shadow-sm bg-white">
                  <img
                    src={client.image}
                    alt={`${client.name} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="font-semibold text-xl mb-1">{client.name}</h3>
                <p className="text text-muted-foreground mb-2">{client.tag}</p>

                <p className="text-md text-muted-foreground mt-2 mb-4">
                  {client.service}
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  {client.url && (
                    <Button
                      asChild
                      className="w-full text-sm"
                      variant="default"
                    >
                      <a href={client.url} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  )}

                  {client.linkedin && (
                    <Button
                      asChild
                      className="w-full text-sm"
                      variant="outline"
                    >
                      <a href={client.linkedin} target="_blank" rel="noopener noreferrer">
                        Visit LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};