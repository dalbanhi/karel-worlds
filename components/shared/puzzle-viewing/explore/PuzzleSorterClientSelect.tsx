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

interface PuzzleSorterClientSelectProps {
  searchParams: { [key: string]: string | string[] | undefined };
  baseRoute: string;
}

const PuzzleSorterClientSelect: React.FC<PuzzleSorterClientSelectProps> = ({
  searchParams,
  baseRoute,
}) => {
  const router = useRouter();
  const baseURL = `/${baseRoute}?`;
  const currentTag = searchParams.tag as string;
  const currentView = searchParams.view as string;
  const urlAddition = currentTag
    ? `&tag=${currentTag}`
    : currentView
      ? `&view=${currentView}`
      : "";
  return (
    <Select
      value={searchParams.sort as string}
      onValueChange={(val) => {
        console.log(`${val} selected`);
        router.push(`${baseURL}sort=${val}${urlAddition}`);
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
