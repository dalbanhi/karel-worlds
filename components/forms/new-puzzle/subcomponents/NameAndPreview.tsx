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

interface MainNewPuzzleProps {
  form: any;
}

const NameAndPreview: React.FC<MainNewPuzzleProps> = ({ form }) => {
  return (
    <div className="bg-primary flex justify-center items-center p-2 gap-2">
      <FormField
        control={form.control}
        name="puzzleName"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center w-1/2">
            <FormLabel className="line-clamp-1 w-1/3">Puzzle Name: </FormLabel>
            <FormControl>
              <Input placeholder="Enter the name of the puzzle..." {...field} />
            </FormControl>
            {form.formState.errors.puzzleName && (
              <FormMessage>{`Error: ${form.formState.errors.puzzleName.message}`}</FormMessage>
            )}
          </FormItem>
        )}
      />
      <Button
        className="flex gap-1 justify-center items-center"
        variant="secondary"
        type="button"
      >
        Preview <EyeOpenIcon />
      </Button>
    </div>
  );
};

export default NameAndPreview;
