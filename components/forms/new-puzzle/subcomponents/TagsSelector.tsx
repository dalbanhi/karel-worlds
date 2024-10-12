import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import dynamic from "next/dynamic";
import { FormField, FormLabel } from "@/components/ui/form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { z } from "zod";
import { maxNumTags } from "@/constants/puzzle";
import { getTags } from "@/lib/actions/tags";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

interface TagsSelectorProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TagsSelector: React.FC<TagsSelectorProps> = ({ form }) => {
  const [numSelectedOptions, setNumSelectedOptions] = useState(0);
  const [tagsFromServer, setTagsFromServer] = useState<string[]>([]);

  useEffect(() => {
    const getTagsFromServer = async () => {
      const rawTagsFromServer = await getTags();
      const tagNames = rawTagsFromServer.map((tagObject) => {
        return tagObject.name;
      });
      setTagsFromServer(tagNames);
    };
    getTagsFromServer();
  }, []);

  const tagsToPass = tagsFromServer.map((item: any) => {
    if (typeof item === "string") {
      return { label: capitalizeFirstLetter(item), value: item };
    } else {
      return {
        label: capitalizeFirstLetter(item.label),
        value: item.value,
      };
    }
  });

  return (
    <div className="flex">
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => {
          return (
            <div className="flex w-full items-center justify-center gap-2">
              <FormLabel className="text-ring" id="tags-selector-label">
                Tags
              </FormLabel>
              <CreatableSelect
                aria-labelledby="tags-selector-label"
                isMulti
                instanceId={"tags"}
                classNamePrefix="react-select"
                className="w-full"
                options={tagsToPass}
                isOptionDisabled={(option) => numSelectedOptions >= maxNumTags}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    //main bar color
                    neutral0: "hsl(var(--primary-foreground))",
                    //down arrow color when selected
                    neutral5: "hsl(var(--muted))",
                    //color of the selected pill
                    neutral10: "hsl(var(--primary))",
                    neutral20: "hsl(var(--primary))",
                    //hover over the select color
                    neutral30: "hsl(var(--primary))",
                    neutral40: "hsl(var(--primary))",
                    //color of placeholder text
                    neutral50: "hsl(var(--ring))",
                    neutral60: "hsl(var(--ring))",
                    neutral70: "hsl(var(--ring))",
                    //text color of pills
                    neutral80: "hsl(var(--ring))", //text color while writing
                    neutral90: "hsl(var(--accent)",
                    primary: "hsl(var(--primary))",
                    primary25: "hsl(var(--primary))",
                    primary50: "hsl(var(--primary))",
                    primary75: "hsl(var(--primary))",
                    //color of the X in the X button
                    danger: "hsl(var(--ring))",
                    //danger of the X button
                    dangerLight: "hsl(var(--destructive))",
                  },
                })}
                placeholder="Search Tags"
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                onChange={(newValue: unknown, actionMeta: any) => {
                  const selectedOptions = newValue as any[];
                  const selectedOptionsValues = selectedOptions.map(
                    (option) => option.value
                  );
                  field.onChange(selectedOptionsValues);
                  setNumSelectedOptions(selectedOptions.length);
                }}
              />
              {numSelectedOptions >= maxNumTags && (
                <p className="text-xs text-ring">
                  {`You can only select up to ${maxNumTags}  tags.`}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default TagsSelector;
