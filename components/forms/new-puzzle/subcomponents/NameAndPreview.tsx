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
    <div className="bg-primary flex justify-center items-center p-2 gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center w-1/2">
            <FormLabel className="w-1/3">Puzzle Name: </FormLabel>
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
        className="flex gap-1 justify-center items-center"
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
