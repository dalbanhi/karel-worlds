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

import {
  GoalWorldInfoContext,
  StartWorldInfoContext,
} from "../layout/NewPuzzleLayout";

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
          <FormLabel className="flex w-full justify-items-end gap-2">
            <span>{label}</span>
            <span>{value}</span>
          </FormLabel>
          <FormControl>
            <Slider
              aria-label={`world-dimension-slider-${fieldName}`}
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
  const startWorldInfo = React.useContext(StartWorldInfoContext);
  const goalWorldInfo = React.useContext(GoalWorldInfoContext);
  if (!startWorldInfo || !goalWorldInfo) return null;
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 p-2">
      <h2 className="text-center text-lg font-semibold">
        All World Properties
      </h2>
      <div className="flex items-center justify-center gap-4">
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
      <EditableWorld
        form={form}
        name={"Start World"}
        worldContext={startWorldInfo}
      />
      <EditableWorld
        form={form}
        name={"Goal World"}
        worldContext={goalWorldInfo}
      />
    </section>
  );
};

export default WorldsEditor;
