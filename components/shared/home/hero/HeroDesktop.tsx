import React from "react";
import HeroText from "./HeroText";
import Image from "next/image";
import heroImg from "@/public/images/hero/hero.png";

const HeroDesktop = () => {
  return (
    <div className="hidden md:flex w-full max-h-fit h-full">
      <div className="flex justify-center items-center bg-accent-semi p-8 w-1/2">
        <HeroText />
      </div>
      <div className="relative justify-center items-center grow w-1/2">
        <Image
          src={heroImg}
          alt="Happy kids coding"
          placeholder="blur"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-accent/30"></div>
      </div>
    </div>
  );
};

export default HeroDesktop;
