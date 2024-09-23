import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface CustomizePanelProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const CustomizePanel: React.FC<CustomizePanelProps> = () => {
  return <div>CustomizerPanel</div>;
};

export default CustomizePanel;
