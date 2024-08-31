import React from "react";
import { montserrat } from "@/app/fonts";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HeroText = () => {
  return (
    <div
      className={`flex flex-col max-md:max-w-sm max-md:h-fit gap-2 p-4 bg-primary-foreground/70 items-center ${montserrat.className}`}
    >
      <h1 className="text-4xl md:text-5xl">
        Solve <span className="text-primary">Karel</span> puzzles, learn to{" "}
        <span className="text-primary">code</span>.
      </h1>
      <p className="text-sm md:text-base">
        KarelWorlds is a fun, interactive platform for computer science
        beginners to learn and practice key skills through creating and sharing
        puzzles.
      </p>
      <Link
        className={"max-w-fit " + buttonVariants({ variant: "gradient" })}
        href="/new-puzzle"
      >
        <span>Get Started</span>
      </Link>
    </div>
  );
};

export default HeroText;
