import React from "react";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface OptionalInfoProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const OptionalInfo: React.FC<OptionalInfoProps> = ({ form }) => {
  return (
    <div className="flex flex-col gap-4 grow">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-center items-center w-full gap-2">
            <FormLabel className="w-full text-center">
              Puzzle Description:{" "}
            </FormLabel>
            <FormControl>
              <Textarea
                className="w-full"
                maxLength={150}
                placeholder="Describe your project in one sentence..."
                {...field}
              />
            </FormControl>
            {form.formState.errors.name && (
              <FormMessage>{`Error: ${form.formState.errors.name.message}`}</FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default OptionalInfo;
