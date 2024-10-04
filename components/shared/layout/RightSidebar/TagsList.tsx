"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tags } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const TagSearchCombobox = dynamic(() => import("./TagSearchCombobox"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface TagsListProps {
  tags: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

const TagsList: React.FC<TagsListProps> = ({ tags, searchParams }) => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (!pathname.includes("explore")) return null;

  const currentSort = searchParams.sort as string;
  const currentSearch = searchParams.search as string;
  const baseURL = `/explore?`;
  const baseURLWithSort = currentSort
    ? `${baseURL}sort=${currentSort}`
    : baseURL;
  const baseURLWithSearchAndSort = currentSearch
    ? `${baseURLWithSort}search=${baseURLWithSort}`
    : baseURL;
  // const baseURLToGoTo = currentSort
  //   ? `/explore?sort=${currentSort}`
  //   : "/explore?";

  const topTags = JSON.parse(tags) as Tags[];
  return (
    <div className="flex h-fit w-full flex-col items-center rounded-none p-2 text-muted-foreground">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-2">
        <Label className="text-lg text-ring">Tags</Label>
        <Link
          data-state={!searchParams.tag ? "active" : ""}
          className={` capitalize ${buttonVariants({ variant: "outline" })}`}
          href={`${baseURLWithSearchAndSort}`}
        >
          {"All Puzzles"}
        </Link>

        <Separator />
        <Label className="text-sm text-ring">Filter by Tags</Label>
        <TagSearchCombobox
          baseURLWithSearchAndSort={baseURLWithSearchAndSort}
          searchParams={searchParams}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {topTags?.map((tag, index) => {
            return (
              <Link
                data-state={searchParams.tag === tag.name ? "active" : ""}
                className={` capitalize ${buttonVariants({ variant: "outline" })}`}
                href={`${baseURLWithSearchAndSort}&tag=${tag.name}`}
                key={tag.id}
              >
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagsList;
