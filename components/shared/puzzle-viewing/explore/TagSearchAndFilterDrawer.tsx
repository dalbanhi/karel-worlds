"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
// import TagSearchCombobox from "../../layout/RightSidebar/TagSearchCombobox";
import { Label } from "@/components/ui/label";
import PuzzleSorterClientSelect from "./PuzzleSorterClientSelect";
import dynamic from "next/dynamic";

const TagSearchCombobox = dynamic(
  () => import("../../layout/RightSidebar/TagSearchCombobox"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

interface TagSearchAndFilterDrawerProps {
  searchParams: { [key: string]: string | string[] | undefined };
  baseRoute: string;
}

const TagSearchAndFilterDrawer: React.FC<TagSearchAndFilterDrawerProps> = ({
  searchParams,
  baseRoute,
}) => {
  const currentSort = searchParams.sort as string;
  const baseURLToGoTo = currentSort
    ? `/explore?sort=${currentSort}`
    : "/explore?";
  return (
    <div className="h-fit items-center justify-center rounded-none border-t-2 border-card bg-primary p-2 gap-2 text-muted-foreground max-sm:flex max-sm:flex-wrap sm:hidden">
      <div className="flex gap-2 items-center">
        <Label className="text-base text-ring">Tags</Label>
        <Link
          data-state={!searchParams.tag ? "active" : ""}
          className={` capitalize ${buttonVariants({ variant: "outline" })}`}
          href={`${baseURLToGoTo}`}
        >
          {"All Puzzles"}
        </Link>

        <TagSearchCombobox
          baseURLToGoTo={baseURLToGoTo}
          searchParams={searchParams}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Label className="text-base text-ring">Sort</Label>
        <PuzzleSorterClientSelect
          searchParams={searchParams}
          baseRoute={baseRoute}
        />
      </div>
    </div>
  );
};

export default TagSearchAndFilterDrawer;
