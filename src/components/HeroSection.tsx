import { Button } from '@/components/ui/button';
import { useEffect } from "react";

export const HeroSection = () => {
  useEffect(() => {
    document.title = "Anand Works";
  }, []);
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20
                   after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                   after:from-gray-100/10 after:via-transparent after:to-transparent
                   dark:after:from-gray-900/50 dark:after:via-transparent dark:after:to-transparent"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="animate-blob absolute left-[5%] top-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-blue-300 to-primary-200 blur-2xl filter mix-blend-multiply opacity-70" />
        <div className="animate-blob animation-delay-2000 absolute right-[10%] bottom-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-green-300 to-emerald-200 blur-2xl filter mix-blend-multiply opacity-70" />
        <div className="animate-blob animation-delay-4000 absolute right-[15%] top-[10%] h-56 w-56 rounded-full bg-gradient-to-br from-purple-300 to-accent-purple blur-2xl filter mix-blend-multiply opacity-70" />
      </div>

      <p className="mb-4 block w-full max-w-md text-center text-2xl font-semibold text-primary md:hidden"> 
        Hello, I'm Anand Sundaramoorthy SA
      </p>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-in-left order-last text-center md:order-first md:text-left">
          <p className="mb-2 hidden text-3xl font-semibold text-primary md:block"> 
            Hello, I'm Anand Sundaramoorthy SA
          </p>

          <h1 className="mb-4 leading-tight text-foreground text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl"> 
            Helping you to grow and shine online
          </h1>

          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Button
              size="lg"
              className="transform rounded-lg bg-gradient-to-r from-primary-600 to-blue-700 px-8 py-6 text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:from-primary-700 hover:to-blue-800 hover:shadow-lg" // Increased px, py, and text-base to text-lg
            >
              <a href="#portfolio">View My Portfolio</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="transform rounded-lg border-2 border-primary-400 px-8 py-6 text-lg font-semibold text-primary-600 shadow-md transition-all duration-300 hover:scale-105 hover:border-primary-500 hover:bg-primary-50 hover:shadow-lg" // Increased px, py, and text-base to text-lg
            >
              <a href="#contact">Let's Connect</a>
            </Button>
          </div>
        </div>

        <div className="animate-fade-in-right relative order-first mt-12 flex items-center justify-center md:order-last md:mt-0 md:justify-end">
          <div
            className="animate-blob-bounce transform shadow-2xl transition-shadow duration-300 ease-out hover:scale-105 hover:shadow-primary-500/50 transition-transform duration-500 ease-out
                        relative h-72 w-72 overflow-hidden rounded-full border-4 border-primary-300 dark:border-primary-700
                        md:h-80 md:w-80 lg:h-96 lg:w-96"
            style={{ animationDelay: '100ms', animationDuration: '8s' }}
          >
            <img
              src="/Anand.jpg"
              alt="Anand Sundaramoorthy SA"
              className="h-full w-full object-cover object-center transition-filter duration-500 hover:grayscale-0"
            />
          </div>

          <div className="animate-blob-bounce absolute top-4 left-10 md:left-auto md:right-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>

          <div className="animate-blob-bounce animation-delay-1500 absolute bottom-4 right-10 md:right-auto md:left-80 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};