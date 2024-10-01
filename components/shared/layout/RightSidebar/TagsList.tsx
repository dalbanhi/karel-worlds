"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TagsListProps {
  tags: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

const TagsList: React.FC<TagsListProps> = ({ tags, searchParams }) => {
  console.log("in tags list searchParams", searchParams);
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (!pathname.includes("explore")) return null;

  const currentSort = searchParams.sort as string;
  const baseURLToGoTo = currentSort
    ? `/explore?sort=${currentSort}&`
    : "/explore?";

  const allTags = JSON.parse(tags) as string[];
  return (
    <div className="flex h-fit w-full flex-col items-center rounded-none p-2 text-muted-foreground">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-2">
        <Label className="text-lg text-ring">Tags</Label>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {allTags?.map((tag, index) => {
            return (
              <Link
                data-state={searchParams.tag === tag ? "active" : ""}
                className={` capitalize ${buttonVariants({ variant: "ghost" })}`}
                href={`${baseURLToGoTo}tag=${tag}`}
                key={tag}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagsList;
