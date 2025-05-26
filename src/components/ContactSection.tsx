import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// Remove the problematic import: import { PhoneIcon, InstagramIcon } from '@heroicons/react/24/outline';

export const ContactSection = () => {
  // Define the base email address
  const emailAddress = 'sanand03072005@gmail.com';

  // Define the email subject and body template
  const defaultSubject = encodeURIComponent("Inquiry from your Portfolio Website");
  const defaultBody = encodeURIComponent(
    "Hi Anand Sundaramoorthy SA,\n\n" +
    "I'm reaching out after visiting your portfolio website. I'm interested in the following services:\n\n" +
    "   - [Service 1, e.g., LinkedIn Optimization]\n" +
    "   - [Service 2, e.g., Website Development]\n" +
    "\n" +
    "Could you please provide more information or discuss my project requirements?\n\n" +
    "My name is [Your Name]\n" +
    "You can reach me at [Your Email/Phone Number]\n\n" +
    "Looking forward to hearing from you!\n\n" +
    "Best regards,"
  );

  // Construct the full mailto link
  const mailtoLink = `mailto:${emailAddress}?subject=${defaultSubject}&body=${defaultBody}`;

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto max-w-5xl">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground">
          Let's Create Together
        </h2>
        {/* Section Sub-heading */}
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Whether you have a project in mind, a question, or just want to connect, I'm here to help. Reach out through your preferred channel.
        </p>

        {/* Contact Method Cards */}
        {/*
          The grid is now md:grid-cols-2.
          The third card is wrapped in a div that spans two columns (md:col-span-2)
          and uses flexbox to center its content (flex justify-center).
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">

          {/* Email Card */}
          <Card className="flex flex-col items-center p-8 service-card transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group w-full max-w-sm md:max-w-none">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-4 mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              {/* Email Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Email</h3>
            <p className="text-muted-foreground mb-4">Drop a line, anytime.</p>
            <a href={mailtoLink} className="text-lg text-blue-600 hover:underline font-medium break-all">
              sanand03072005@gmail.com
            </a>
          </Card>

          {/* Phone Card */}
          <Card className="flex flex-col items-center p-8 service-card transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group w-full max-w-sm md:max-w-none">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-4 mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              {/* Updated SVG Icon for Phone */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors">
                <path fillRule="evenodd" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Call Me</h3>
            <p className="text-muted-foreground mb-4">For urgent inquiries or a quick chat.</p>
            <a href="tel:+918012484178" className="text-lg text-blue-600 hover:underline font-medium">
              +91 80124 84178
            </a>
          </Card>

          {/* Schedule Call Button Card - Now Centered Below */}
          <div className="md:col-span-2 flex justify-center w-full"> {/* This div spans both columns and centers its content */}
            <Card className="flex flex-col items-center p-8 service-card transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group w-full max-w-sm md:max-w-md"> {/* Added max-w-md for better sizing */}
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-4 mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                {/* Calendar Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-foreground">Schedule a Call</h3>
              <p className="text-muted-foreground mb-4">Book a slot that fits your schedule.</p>
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                <a href="https://cal.com/anandsundaramoorthysa" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </Card>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 text-foreground">
            Find Me Online
          </h3>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/anandsundaramoorthysa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"
              className="flex flex-col items-center gap-2 text-lg text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 transition-colors transform hover:scale-110">
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.765s.784-1.765 1.75-1.765 1.75.79 1.75 1.765-.783 1.765-1.75 1.765zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="font-medium">LinkedIn</span>
              <span className="text-sm text-muted-foreground">@anandsundaramoorthysa</span>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/anandsundaramoorthysa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"
              className="flex flex-col items-center gap-2 text-lg text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-200 transition-colors transform hover:scale-110">
              {/* Instagram Icon (Modern Rounded version) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-pink-500 group-hover:text-pink-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9Zm0 2h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4Zm9.25 1.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
              </svg>
              <span className="font-medium">Instagram</span>
              <span className="text-sm text-muted-foreground">@anandsundaramoorthysa</span>
            </a>
            {/* Telegram */}
            <a href="https://t.me/anandsundaramoorthysa" target="_blank" rel="noopener noreferrer" aria-label="Telegram Profile"
              className="flex flex-col items-center gap-2 text-lg text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 transition-colors transform hover:scale-110">
              {/* Telegram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.721 8.243l-2.029 9.385c-.179.824-.694 1.031-1.378.643l-3.056-2.241-1.479 1.432c-.179.173-.327.243-.591.243l.219-3.078 5.617-5.076c.24-.216-.051-.336-.379-.12L8.271 14.869l-2.925-.916c-.808-.253-.827-.817.173-.997l12.433-4.708c.677-.257 1.258.172.973.931z" />
              </svg>
              <span className="font-medium">Telegram</span>
              <span className="text-sm text-muted-foreground">@anandsundaramoorthysa</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};