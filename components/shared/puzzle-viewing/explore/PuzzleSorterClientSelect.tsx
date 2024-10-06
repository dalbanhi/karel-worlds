"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { sortOptions } from "@/constants/database";
import { useRouter } from "next/navigation";
import { buildRouteWithUpdatedParams } from "@/lib/utils/getCombinedSearchParams";

interface PuzzleSorterClientSelectProps {
  searchParams: { [key: string]: string | string[] | undefined };
  baseRoute: string;
}

const PuzzleSorterClientSelect: React.FC<PuzzleSorterClientSelectProps> = ({
  searchParams,
  baseRoute,
}) => {
  const router = useRouter();
  // const baseURLWithOtherParams = buildRouteWithUpdatedParams(
  //   baseRoute,
  //   searchParams,

  // );
  return (
    <Select
      value={searchParams.sort as string}
      onValueChange={(val) => {
        console.log(`${val} selected`);
        const routeLink = buildRouteWithUpdatedParams(baseRoute, searchParams, {
          sort: val,
        });
        router.push(`${routeLink}`);
      }}
    >
      <SelectTrigger className="min-w-max">
        <SelectValue placeholder="Sort the puzzles..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PuzzleSorterClientSelect;
