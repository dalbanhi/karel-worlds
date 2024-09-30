"use client";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface ControllableSliderProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const ControllableSlider: React.FC<ControllableSliderProps> = () => {
  return <div>ControllableSlider</div>;
};

export default ControllableSlider;
