"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { buildRouteWithUpdatedParams } from "@/lib/utils/getCombinedSearchParams";
import { useRouter } from "next/navigation";

interface PuzzleSearchProps {
  initialSort?: string;
  initialTag?: string;
  initialSearch?: string;
  baseRoute: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

const PuzzleSearch: React.FC<PuzzleSearchProps> = ({
  initialSearch,
  baseRoute,
  searchParams,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [searchLink, setSearchLink] = useState(`${baseRoute}`);

  const router = useRouter();

  useEffect(() => {
    const newSearchLink = buildRouteWithUpdatedParams(baseRoute, searchParams, {
      search: searchTerm,
    });
    setSearchLink(newSearchLink);
  }, [searchTerm, baseRoute, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(searchLink);
    }
  };
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
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link
          href={`${searchLink}`}
          className={`${buttonVariants({ variant: "default" })}`}
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default PuzzleSearch;
