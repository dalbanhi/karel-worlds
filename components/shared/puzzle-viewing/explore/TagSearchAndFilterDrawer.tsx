"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import TagSearchCombobox from "../../layout/RightSidebar/TagSearchCombobox";

interface TagSearchAndFilterDrawerProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const TagSearchAndFilterDrawer: React.FC<TagSearchAndFilterDrawerProps> = ({
  searchParams,
}) => {
  //   if (!searchParams) return null;
  const currentSort = searchParams.sort as string;
  const baseURLToGoTo = currentSort
    ? `/explore?sort=${currentSort}`
    : "/explore?";
  return (
    <div className="h-fit items-center justify-start rounded-none border-t-2 border-card bg-primary p-2 text-muted-foreground max-sm:inline-flex sm:hidden">
      <Link
        data-state={!searchParams.tag ? "active" : ""}
        className={` capitalize ${buttonVariants({ variant: "outline" })}`}
        href={`${baseURLToGoTo}`}
      >
        {"All Puzzles"}
      </Link>
      <TagSearchCombobox baseURLToGoTo={baseURLToGoTo} />
    </div>
  );
};

export default TagSearchAndFilterDrawer;
