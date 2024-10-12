import React from "react";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroMobile = () => {
  return (
    <div className="relative h-96 w-full md:hidden ">
      <HeroImage />
      <div className="absolute inset-0 flex h-full items-center justify-center bg-accent/30 p-1">
        <HeroText />
      </div>
    </div>
  );
};

export default HeroMobile;
