"use client";
import React, { useEffect } from "react";

import NameAndPreview from "./subcomponents/NameAndPreview";
import TagsSelector from "./subcomponents/TagsSelector";
import WorldsEditor from "./subcomponents/WorldsEditor";
import { UseFormReturn } from "react-hook-form";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { z } from "zod";

interface MainNewPuzzleProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const MainNewPuzzle: React.FC<MainNewPuzzleProps> = ({ form }) => {
  const { watch } = form;

  // Watch specific form fields or the entire form
  const watchedValues = watch(); // Watches the entire form

  useEffect(() => {
    console.log("Form state changed:", watchedValues);
  }, [watchedValues]); // Log form state whenever it changes
  return (
    <div className="w-full grow">
      <NameAndPreview form={form} />
      <div className="bg-card flex justify-center items-center p-2 gap-2">
        <TagsSelector form={form} tagsString="" />
      </div>
      <WorldsEditor form={form} />
    </div>
  );
};

export default MainNewPuzzle;
