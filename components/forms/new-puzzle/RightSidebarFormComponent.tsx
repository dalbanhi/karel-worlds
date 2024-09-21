"use client";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface RightSidebarFormComponentProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}
const RightSidebarFormComponent: React.FC<RightSidebarFormComponentProps> = ({
  form,
}) => {
  return (
    <aside className="min-h-screen border-l-2 border-primary bg-card w-3/12 flex-col gap-2 p-4 max-sm:hidden sm:flex">
      "hello"
    </aside>
  );
};

export default RightSidebarFormComponent;
