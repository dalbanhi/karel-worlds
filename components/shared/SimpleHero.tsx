import React from "react";
import Image, { StaticImageData } from "next/image";
import { montserrat } from "@/app/fonts";

interface SimpleHeroProps {
  image: StaticImageData;
  text: string;
}

const SimpleHero: React.FC<SimpleHeroProps> = ({ image, text }) => {
  return (
    <div className="relative h-96 w-full">
      {/* Background image */}
      <Image
        src={image}
        alt={`Hero Image for  ${text}`}
        fill
        blurDataURL={image.blurDataURL}
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
          {text}
        </h1>
      </div>
    </div>
  );
};

export default SimpleHero;
