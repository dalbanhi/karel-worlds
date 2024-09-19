"use client";
import React from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import NameAndPreview from "./subcomponents/NameAndPreview";
import TagsSelector from "./subcomponents/TagsSelector";

interface MainNewPuzzleProps {
  form: any;
}

const MainNewPuzzle: React.FC<MainNewPuzzleProps> = ({ form }) => {
  return (
    <div>
      <NameAndPreview form={form} />
      <div className="bg-card flex justify-center items-center p-2 gap-2">
        <TagsSelector form={form} tagsString="" />
      </div>
    </div>
  );
};

export default MainNewPuzzle;
