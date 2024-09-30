import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { maxNumTags } from "@/constants/puzzle";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";
import { redirect } from "next/navigation";

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
  const selectedSort = searchParams.sort as string | undefined;
  return (
    <section className="flex min-h-screen w-full flex-col justify-start md:w-1/2">
      <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
        {String(metadata.title ?? "Default Title")}
      </h1>
      <div className="inline-flex h-10 items-center justify-start rounded-none bg-muted p-2 text-muted-foreground">
        <form className="flex h-fit sm:flex-initial">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search puzzles"
              className="w-fit pl-8"
            />
          </div>
        </form>
        <div className="flex items-center gap-2 p-2">
          <Label className="ml-2">Sort by:</Label>
          {/* <Select value={selectedSort}>
            <SelectTrigger className="w-fit min-w-28 text-center">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              <Link href="/explore?sort=diff-low-high">
                <SelectItem value="diff-low-high">
                  Difficulty (low-high)
                </SelectItem>
              </Link>
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <div className="inline-flex h-10 items-center justify-start rounded-none bg-muted p-1 text-muted-foreground"></div>
    </section>
  );
};

export default ExplorePage;
