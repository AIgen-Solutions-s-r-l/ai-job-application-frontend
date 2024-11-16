import React from "react";
import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import ButtonLead from "@/components/ButtonLead";  // Asegúrate de importar el componente ButtonLead
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      {/* Left side: Headline, Supporting Text, CTA */}
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        {/* Headline answering "Why stay on this site?" */}
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Automate your job search and easily get hired
        </h1>
        
        {/* Supporting headline explaining the how */}
        <p className="text-lg opacity-80 leading-relaxed">
          aihawk streamlines your LinkedIn applications with AI, personalizes them, and helps you apply to more jobs in less time.
        </p>
        
        {/* Call to action */}
        <ButtonLead/>

        {/* Social proof with testimonials */}
        <TestimonialsAvatars priority={true} />
      </div>
      
      {/* Right side: Image (like a YouTube thumbnail, easy to understand) */}
      <div className="lg:w-full">
        <Image
          src="/hero.png"
          alt="AI-powered job applications"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;