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

interface MainNewPuzzleProps {
  form: any;
}

const MainNewPuzzle: React.FC<MainNewPuzzleProps> = ({ form }) => {
  return (
    <div>
      <NameAndPreview form={form} />
      <div className="bg-card flex justify-center items-center p-2 gap-2"></div>
    </div>
  );
};

export default MainNewPuzzle;
