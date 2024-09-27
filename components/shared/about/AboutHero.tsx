import React from "react";
import Image from "next/image";
import heroImg from "@/public/images/hero/about/about.jpg";
import { montserrat } from "@/app/fonts";

const AboutHero = () => {
  return (
    <div className="relative h-96 w-full">
      {/* Background image */}
      <Image
        src={heroImg}
        alt="Hero Image"
        fill
        placeholder="blur"
        style={{ objectFit: "cover" }}
        quality={100}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-accent/50" />
      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`bg-ring text-4xl font-bold text-accent ${montserrat.className}`}
        >
          About Karel Worlds
        </h1>
      </div>
    </div>
  );
};

export default AboutHero;
