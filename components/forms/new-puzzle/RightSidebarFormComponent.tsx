"use client";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "postcss";

interface RightSidebarFormComponentProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}
const RightSidebarFormComponent: React.FC<RightSidebarFormComponentProps> = ({
  form,
}) => {
  return (
    <aside className="min-h-screen border-l-2 border-primary bg-card flex-col gap-2 p-4 grow shrink w-3/12 max-md:hidden md:flex">
      <h2 className="text-ring font-semibold text-base text-center">
        Optional Info
      </h2>
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
    </aside>
  );
};

export default RightSidebarFormComponent;
