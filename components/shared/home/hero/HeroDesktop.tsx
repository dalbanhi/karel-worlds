import React from "react";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroDesktop = () => {
  return (
    <div className="hidden md:flex w-full max-h-fit h-full">
      <div className="flex justify-center items-center bg-accent-semi p-8 w-1/2">
        <HeroText />
      </div>
      <div className="relative justify-center items-center grow w-1/2">
        <HeroImage />
        <div className="absolute top-0 left-0 w-full h-full bg-accent/30"></div>
      </div>
    </div>
  );
};

export default HeroDesktop;
