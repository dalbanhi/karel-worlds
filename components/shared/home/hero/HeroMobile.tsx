import React from "react";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroMobile = () => {
  return (
    <div className="relative md:hidden justify-center items-center grow w-full max-h-fit h-96 ">
      <HeroImage />
      <div className="absolute inset-0 flex h-full justify-center items-center bg-accent/30 p-6">
        <HeroText />
      </div>
    </div>
  );
};

export default HeroMobile;
