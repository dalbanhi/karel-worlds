"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import EditableWorld from "./EditableWorld";

interface DimensionSliderProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  fieldName: "worldWidth" | "worldHeight";
  label: string;
  description: string;
}

const DimensionSlider: React.FC<DimensionSliderProps> = ({
  form,
  fieldName,
  label,
  description,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field: { value, onChange } }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel className="flex justify-items-end gap-2 w-full">
            <span>{label}</span>
            <span>{value}</span>
          </FormLabel>
          <FormControl>
            <Slider
              min={1}
              max={25}
              step={1}
              defaultValue={[value]}
              value={[form.getValues(fieldName)]}
              onValueChange={(value) => onChange(value[0])}
            />
          </FormControl>
          <FormDescription>
            # of squares in your puzzle ({description})
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface WorldsEditorProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const WorldsEditor: React.FC<WorldsEditorProps> = ({ form }) => {
  return (
    <section className="w-full flex flex-col gap-2 justify-center items-center p-2">
      <h3 className="text-center text-lg font-semibold">
        All World Properties
      </h3>
      <div className="flex gap-4 justify-center items-center">
        <DimensionSlider
          form={form}
          fieldName="worldWidth"
          label="World Width"
          description="horizontally"
        />
        <DimensionSlider
          form={form}
          fieldName="worldHeight"
          label="World Height"
          description="vertically"
        />
      </div>
      <EditableWorld form={form} name={"Starting World"} />
    </section>
  );
};

export default WorldsEditor;
