"use client";
import React, { useEffect } from "react";

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
  const { watch } = form;

  // Watch specific form fields or the entire form
  const watchedValues = watch(); // Watches the entire form

  useEffect(() => {
    // console.log("Form state changed:", watchedValues);
  }, [watchedValues]); // Log form state whenever it changes
  return (
    <div className="w-full grow">
      <NameAndPreview form={form} setShowPreview={setShowPreview} />
      <div className="flex flex-col items-center justify-center gap-2 bg-card p-2">
        <TagsSelector form={form} tagsString="" />
        <CustomizePanel form={form} />
      </div>
      <WorldsEditor form={form} />
    </div>
  );
};

export default MainNewPuzzle;
