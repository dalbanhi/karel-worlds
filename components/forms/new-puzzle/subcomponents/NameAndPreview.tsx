import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";

import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface NameAndPreviewProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameAndPreview: React.FC<NameAndPreviewProps> = ({
  form,
  setShowPreview,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 bg-primary p-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="flex w-1/2 items-center justify-between gap-2">
            <FormLabel className="">Puzzle Name: </FormLabel>
            <FormControl>
              <Input placeholder="Enter the name of the puzzle..." {...field} />
            </FormControl>
            {form.formState.errors.name && (
              <FormMessage>{`Error: ${form.formState.errors.name.message}`}</FormMessage>
            )}
          </FormItem>
        )}
      />
      <Button
        className="flex items-center justify-center gap-1"
        variant="secondary"
        type="button"
        onClick={() => {
          setShowPreview(true);
        }}
      >
        Preview <EyeOpenIcon />
      </Button>
    </div>
  );
};

export default NameAndPreview;
