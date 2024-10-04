"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface PuzzleSearchProps {
  initialSort?: string;
  initialTag?: string;
  initialSearch?: string;
  baseRoute: string;
}

const PuzzleSearch: React.FC<PuzzleSearchProps> = ({
  initialTag,
  initialSearch,
  initialSort,
  baseRoute,
}) => {
  const baseURL = `/${baseRoute}?`;
  const baseURLWithSort = initialSort
    ? `${baseURL}&sort=${initialSort}`
    : `${baseURL}`;
  const baseURLWithSortAndTag = initialTag
    ? `${baseURLWithSort}&tag=${initialTag}`
    : `${baseURLWithSort}`;
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  return (
    <div className="inline-flex h-fit items-center justify-start rounded-none bg-muted p-2 text-muted-foreground">
      <div className="flex h-fit w-full justify-center gap-4 sm:flex-initial">
        <div className="relative w-1/2">
          <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search puzzles"
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link
          href={`${baseURLWithSortAndTag}&search=${encodeURIComponent(searchTerm)}`}
          className={`${buttonVariants({ variant: "default" })}`}
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default PuzzleSearch;
