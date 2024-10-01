import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";

interface PuzzleSorterProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PuzzleSorter: React.FC<PuzzleSorterProps> = ({ searchParams }) => {
  console.log("in puzzle sorter", searchParams);
  if (searchParams === undefined) {
    return null;
  }

  const currentTag = searchParams.tag as string;
  const urlAddition = currentTag ? `&tag=${currentTag}` : "";

  const sortOptions = [
    {
      label: "Difficulty (low-high)",
      value: "diff-l-h",
    },
    {
      label: "Difficulty (high-low)",
      value: "diff-h-l",
    },
    {
      label: "Rating (low-high)",
      value: "rating-l-h",
    },
    {
      label: "Rating (high-low)",
      value: "rating-h-l",
    },
  ];

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
            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Link
                  className="inline-flex gap-1"
                  href={`/explore?sort=${option.value}${urlAddition}`}
                >
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
