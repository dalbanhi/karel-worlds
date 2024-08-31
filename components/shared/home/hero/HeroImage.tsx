import React from "react";
import Image from "next/image";
import heroImg from "@/public/images/hero/hero.png";

const HeroImage = () => {
  return (
    <Image
      src={heroImg}
      alt="Happy kids coding"
      placeholder="blur"
      className="object-cover"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "cover" }}
    />
  );
};

export default HeroImage;
