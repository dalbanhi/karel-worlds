import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import React from "react";

import { Label } from "@/components/ui/label";
import { maxNumTags } from "@/constants/puzzle";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExplorePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Explore",
  description:
    "A place to view, filter and sort all Karel Worlds puzzles by the broader community.",
};

const ExplorePage: React.FC<ExplorePageProps> = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedSort = (searchParams.sort as string) ?? "diff-l-h";
  console.log(selectedSort);
  return (
    <section className="flex min-h-screen w-full flex-col justify-start md:w-1/2">
      <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
        {String(metadata.title ?? "Default Title")}
      </h1>
      <div className="inline-flex h-fit items-center justify-start rounded-none bg-muted p-2 text-muted-foreground">
        <form className="flex h-fit w-full justify-center gap-4 sm:flex-initial">
          <div className="relative w-1/2">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search puzzles"
              className="w-full pl-8"
            />
          </div>
          {/* <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tags..."
              className="w-fit pl-8"
            />
          </div> */}
        </form>
      </div>
      <div className="inline-flex h-fit items-center justify-start rounded-none bg-card p-2 text-muted-foreground">
        <div className="flex items-center gap-2 p-2">
          <Label className="ml-2 w-1/6">Sort by:</Label>
          <RadioGroup className="flex flex-wrap" defaultValue={selectedSort}>
            <div className="flex items-center space-x-2">
              <Link
                className="inline-flex gap-1"
                href={"explore?sort=diff-l-h"}
              >
                <RadioGroupItem value="diff-l-h" id="diff-l-h" />
                <Label htmlFor="diff-l-h">Difficulty (low-high)</Label>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                className="inline-flex gap-1"
                href={"explore?sort=diff-h-l"}
              >
                <RadioGroupItem value="diff-h-l" id="diff-h-l" />
                <Label htmlFor="diff-h-l">Difficulty (high-low)</Label>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                className="inline-flex gap-1"
                href={"explore?sort=rating-l-h"}
              >
                <RadioGroupItem value="rating-l-h" id="rating-l-h" />
                <Label htmlFor="rating-l-h">Rating (low-high)</Label>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                className="inline-flex gap-1"
                href={"explore?sort=rating-h-l"}
              >
                <RadioGroupItem value="rating-h-l" id="rating-h-l" />
                <Label htmlFor="rating-h-l">Rating (high-low)</Label>
              </Link>
            </div>
          </RadioGroup>
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
