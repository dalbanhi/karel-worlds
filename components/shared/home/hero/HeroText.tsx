import React from "react";
import { montserrat } from "@/app/fonts";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HeroText = () => {
  return (
    <div
      className={`flex flex-col items-center gap-2 bg-primary-foreground/70 p-4 max-md:h-fit max-md:max-w-sm ${montserrat.className}`}
    >
      <h1 className="text-4xl md:text-5xl">
        Solve <span className="bg-ring text-accent">Karel</span> puzzles, learn
        to <span className="bg-ring text-accent">code</span>.
      </h1>
      <p className="text-sm md:text-base">
        KarelWorlds is a fun, interactive platform for computer science
        beginners to learn and practice key skills through creating and sharing
        puzzles.
      </p>
      <Link
        className={"max-w-fit " + buttonVariants({ variant: "gradient" })}
        href="/sign-in"
      >
        <span>Get Started</span>
      </Link>
    </div>
  );
};

export default HeroText;
