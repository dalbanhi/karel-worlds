import React from "react";
import Image from "next/image";
import heroImg from "@/public/images/hero/hero.png";
import HeroText from "./HeroText";
import { montserrat } from "@/app/fonts";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HeroMobile = () => {
  return (
    <div className="relative md:hidden justify-center items-center grow w-full max-h-fit h-96 ">
      <Image
        src={heroImg}
        alt="Happy kids coding"
        placeholder="blur"
        className="object-cover"
        fill
        sizes="100vh"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex h-full justify-center items-center bg-accent/30 p-6">
        <div
          className={`flex flex-col max-w-sm h-fit gap-2 p-6 bg-primary-foreground/70 items-center ${montserrat.className}`}
        >
          <h1 className="text-4xl md:text-5xl">
            Solve <span className="text-primary">Karel</span> puzzles, learn to{" "}
            <span className="text-primary">code</span>.
          </h1>
          <p className="text-sm md:text-md">
            KarelWorlds is a fun, interactive platform for computer science
            beginners to learn and practice key skills through creating and
            sharing puzzles.
          </p>
          <Link
            className={"max-w-fit " + buttonVariants({ variant: "gradient" })}
            href="/new-puzzle"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroMobile;
