import React from "react";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroDesktop = () => {
  return (
    <div className="hidden size-full max-h-fit md:flex">
      <div className="flex w-1/2 items-center justify-center bg-accent-semi p-8">
        <HeroText />
      </div>
      <div className="relative w-1/2 grow items-center justify-center">
        <HeroImage />
        <div className="absolute left-0 top-0 size-full bg-accent/30"></div>
      </div>
    </div>
  );
};

export default HeroDesktop;
