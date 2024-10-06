"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import PuzzleSorterClientSelect from "./PuzzleSorterClientSelect";
import dynamic from "next/dynamic";
import { buildRouteWithUpdatedParams } from "@/lib/utils/getCombinedSearchParams";

const TagSearchCombobox = dynamic(
  () => import("../../layout/RightSidebar/TagSearchCombobox"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

interface FilterDrawerProps {
  searchParams: { [key: string]: string | string[] | undefined };
  baseRoute: string;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  searchParams,
  baseRoute,
}) => {
  const baseURLWithSearchAndSort = buildRouteWithUpdatedParams(
    baseRoute,
    searchParams,
    { tag: undefined }
  );
  return (
    <div className="h-fit items-center justify-center gap-2 rounded-none border-t-2 border-card bg-primary p-2 text-muted-foreground max-sm:flex max-sm:flex-wrap sm:hidden">
      <div className="flex items-center gap-2">
        <Label className="text-base text-ring">Tags</Label>
        <Link
          data-state={!searchParams.tag ? "active" : ""}
          className={` capitalize ${buttonVariants({ variant: "outline" })}`}
          href={`${baseURLWithSearchAndSort}`}
        >
          {"All Puzzles"}
        </Link>

        <TagSearchCombobox searchParams={searchParams} baseRoute={baseRoute} />
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-base text-ring">Sort</Label>
        <PuzzleSorterClientSelect
          searchParams={searchParams}
          baseRoute={baseRoute}
        />
      </div>
    </div>
  );
};

export default FilterDrawer;
