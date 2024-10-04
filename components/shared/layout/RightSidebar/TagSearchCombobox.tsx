import React, { useState, useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

interface TagSearchComboboxProps {
  baseURLToGoTo: string;
}

const TagSearchCombobox: React.FC<TagSearchComboboxProps> = ({
  baseURLToGoTo,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [matchingTags, setMatchingTags] = useState<Tags[] | null>(null);
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
  }, [tagSearchTerm]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? matchingTags &&
              matchingTags.find((tag) => tag.name === value)?.name
            : "Search for more tags..."}
          <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for more tags..."
            className="h-9"
            value={tagSearchTerm}
            onValueChange={(value) => setTagSearchTerm(value)}
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
                    <CommandLoading>Loading tags...</CommandLoading>
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
                          //route to the tag with the previous search params
                          router.push(`${baseURLToGoTo}&tag=${tag.name}`);
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
      </PopoverContent>
    </Popover>
  );
};

export default TagSearchCombobox;
