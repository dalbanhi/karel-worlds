import AboutHero from "@/components/shared/about/AboutHero";
import { Metadata } from "next";

import Link from "next/link";

import React from "react";

export const metadata: Metadata = {
  title: "About ",
  description:
    "KarelWorlds is a fun, interactive platform for computer science beginners to practice key skills. Students can create and share custom puzzles with friends. I built and designed it from scratch, integrating a custom Blockly environment with a world-building editor.",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <article className="prose prose-slate mt-2">
        <h2 className="text-center text-xl">What is Karel Worlds?</h2>
        <p>
          Karel Worlds is all about making computer science fun and accessible
          for everyone, especially beginners! Inspired by{" "}
          <Link href="https://scratch.mit.edu">Scratch</Link> and the classic{" "}
          <Link href="https://en.wikipedia.org/wiki/Karel_(programming_language)">
            Karel
          </Link>{" "}
          programming language, this platform was created by{" "}
          <Link href={"https://david-alban.com/"}>
            a developer and computer science teacher
          </Link>{" "}
          who wanted to share the excitement and magic of coding in a way
          that&apos;s fun and accessible.
        </p>
        <p>
          With <Link href={"https://g.co/dev/blockly"}>Blockly</Link>, you can
          drag and drop blocks of code to help Karel the Robot solve fun
          puzzles. Blockly is a tool from Google that makes block-based
          programming simple and beginner-friendly. If you&apos;re curious to
          learn more about the project, you can dive into the technical details{" "}
          <Link href={"https://david-alban.com/projects/karelWorlds"}>
            here at this write up
          </Link>
          . You can also find the source code for this project{" "}
          <Link
            href={"https://github.com/dalbanhi/karel-worlds/tree/v2-staging"}
          >
            here
          </Link>
          . If you have any questions, feel free to reach out to us{" "}
          <Link href="/contact">here</Link>.
        </p>
      </article>
    </div>
  );
};

export default AboutPage;
