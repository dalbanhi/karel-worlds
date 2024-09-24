import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ImageUploader from "./ImageUploader";
import { customizableSpriteType } from "@/types/karelWorld";

interface SpriteImageEditorProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  sprite: customizableSpriteType;
}

const SpriteImageEditor: React.FC<SpriteImageEditorProps> = ({
  form,
  sprite,
}) => {
  if (!sprite || !sprite.name) {
    return <div>Loading sprite editor...</div>;
  }
  return (
    <div className="flex justify-center">
      <FormField
        control={form.control}
        name={sprite.value}
        render={({ field: { onChange, value } }) => {
          console.log("value", value);
          console.log("sprite", sprite.value);
          return (
            <FormItem className="flex flex-col justify-center items-center w-full gap-2">
              <FormLabel
                className="w-1/3"
                id={`form-label-${sprite.name}-image`}
              >
                Current {sprite.name} Image:{" "}
              </FormLabel>
              <FormControl>
                <ImageUploader
                  image={value}
                  setImage={onChange}
                  nameOfElementCustomizing={sprite.name}
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => onChange("")}
                variant={"default"}
                className="capitalize"
              >
                Reset {sprite.name} Image
              </Button>
              {form.formState.errors[sprite.value] && (
                <FormMessage>
                  {`Error: ${form.formState.errors[sprite.value]?.message}`}
                </FormMessage>
              )}
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default SpriteImageEditor;
