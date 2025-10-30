"use client";
import React from "react";

import NameAndPreview from "./subcomponents/NameAndPreview";
import TagsSelector from "./subcomponents/TagsSelector";
import WorldsEditor from "./subcomponents/WorldsEditor";
import { UseFormReturn } from "react-hook-form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { z } from "zod";
import CustomizePanel from "./subcomponents/CustomizePanel";

interface MainNewPuzzleProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainNewPuzzle: React.FC<MainNewPuzzleProps> = ({
  form,
  setShowPreview,
}) => {
  return (
    <div className="w-full grow">
      <NameAndPreview form={form} setShowPreview={setShowPreview} />
      <div className="flex flex-col items-center justify-center gap-2 bg-card p-2">
        <TagsSelector form={form} />
        <CustomizePanel form={form} />
      </div>
      <WorldsEditor form={form} />
    </div>
  );
};

export default MainNewPuzzle;
