import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";
import { sortOptions } from "@/constants/database";
import { buildRouteWithUpdatedParams } from "@/lib/utils/getCombinedSearchParams";

interface PuzzleSorterProps {
  searchParams: { [key: string]: string | string[] | undefined };
  baseRoute: string;
}

const PuzzleSorter: React.FC<PuzzleSorterProps> = ({
  searchParams,
  baseRoute,
}) => {
  if (searchParams === undefined || searchParams === null) {
    return null;
  }
  const selectedSort = searchParams.sort as string;
  return (
    <div className="flex h-fit w-full flex-col items-center rounded-none p-2 text-muted-foreground">
      <div className="flex w-full flex-col items-center justify-stretch gap-4 p-2">
        <Label className="text-lg text-ring">Sort by</Label>

        <RadioGroup
          className="flex w-full flex-col flex-wrap justify-between"
          value={selectedSort}
        >
          {sortOptions.map((option) => {
            const routeLink = buildRouteWithUpdatedParams(
              baseRoute,
              searchParams,
              { sort: option.value }
            );
            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Link className="inline-flex gap-1" href={routeLink}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} id={`${option.value}-label`}>
                    {option.label}
                  </Label>
                </Link>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default PuzzleSorter;
