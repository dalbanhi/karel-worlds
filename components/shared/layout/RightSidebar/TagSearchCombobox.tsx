"use client";
import React, { useState, useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tags } from "@prisma/client";
import { searchTags } from "@/lib/actions/tags";
import { useRouter } from "next/navigation";
import { CommandLoading } from "cmdk";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useDevice from "@/hooks/useMediaQuery";
import { buildRouteWithUpdatedParams } from "@/lib/utils/getCombinedSearchParams";

interface DynamicTagListProps {
  baseRoute: string;
  matchingTags: Tags[] | null;
  setMatchingTags: React.Dispatch<React.SetStateAction<Tags[] | null>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchParams: { [key: string]: string | string[] | undefined };
}

const DynamicTagList: React.FC<DynamicTagListProps> = ({
  baseRoute,
  matchingTags,
  setMatchingTags,
  value,
  setValue,
  setOpen,
  searchParams,
}) => {
  const router = useRouter();
  // const baseURLWithSearchAndSort = getBaseStringForNewRouteFromSearchParams(
  //   baseRoute,
  //   searchParams,
  //   "tag"
  // );
  const [tagSearchTerm, setTagSearchTerm] = useState(
    Array.isArray(searchParams.tag)
      ? searchParams.tag[0]
      : searchParams.tag || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMatchingTags = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const tagsFromSearch = await searchTags(tagSearchTerm);
        setMatchingTags(tagsFromSearch);
      } catch {
        throw new Error("Error fetching tags");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutID = setTimeout(() => {
      getMatchingTags();
    }, 200);
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [tagSearchTerm, setMatchingTags]);
  return (
    <Command className="rounded-md" shouldFilter={false}>
      <CommandInput
        placeholder="Search tags..."
        className="h-8"
        value={tagSearchTerm}
        onValueChange={(value) => setTagSearchTerm(value)}
        autoFocus
      />
      <CommandList>
        <CommandGroup>
          {matchingTags &&
            matchingTags.length === 0 &&
            tagSearchTerm.length < 3 && (
              <div className="text-xs italic">
                Type 3+ characters to search tags.
              </div>
            )}
          {matchingTags && (
            <>
              {isLoading && (
                <CommandLoading className="text-sm italic">
                  Loading tags...
                </CommandLoading>
              )}
              {matchingTags.length > 0 &&
                matchingTags.map((tag) => (
                  <CommandItem
                    className="capitalize"
                    key={tag.id}
                    value={tag.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : tag.name);
                      setOpen(false);
                      const routeLink = buildRouteWithUpdatedParams(
                        baseRoute,
                        searchParams,
                        { tag: tag.name }
                      );
                      //route to the tag with the previous search params
                      router.push(routeLink);
                    }}
                  >
                    {tag.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4",
                        value === tag.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              {matchingTags.length === 0 && tagSearchTerm.length >= 3 && (
                <div className="text-xs italic">No tags found.</div>
              )}
            </>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

interface TagSearchComboboxProps {
  baseRoute: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

const TagSearchCombobox: React.FC<TagSearchComboboxProps> = ({
  baseRoute,
  searchParams,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [matchingTags, setMatchingTags] = useState<Tags[] | null>(null);
  const { isSmall } = useDevice();

  if (!isSmall) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
          >
            {value
              ? matchingTags &&
                matchingTags.find((tag) => tag.name === value)?.name
              : "Search tags..."}
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <DynamicTagList
            baseRoute={baseRoute}
            matchingTags={matchingTags}
            setMatchingTags={setMatchingTags}
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            searchParams={searchParams}
          />
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Drawer direction="top" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
          >
            {value
              ? matchingTags &&
                matchingTags.find((tag) => tag.name === value)?.name
              : "Search tags..."}
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          aria-describedby="A drawer to search tags"
          className="bg-card"
        >
          <DrawerHeader>
            <DrawerTitle className="text-lg">Search Tags</DrawerTitle>
            <DrawerDescription className="text-sm">
              An easy way to filter puzzles by tags.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4 border-t">
            <DynamicTagList
              baseRoute={baseRoute}
              matchingTags={matchingTags}
              setMatchingTags={setMatchingTags}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
              searchParams={searchParams}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
export default TagSearchCombobox;
