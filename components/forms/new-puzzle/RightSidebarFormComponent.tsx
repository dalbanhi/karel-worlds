"use client";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "postcss";
import OptionalInfo from "./subcomponents/OptionalInfo";

interface RightSidebarFormComponentProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}
const RightSidebarFormComponent: React.FC<RightSidebarFormComponentProps> = ({
  form,
}) => {
  return (
    <aside className="min-h-screen w-3/12 shrink grow flex-col gap-2 border-l-2 border-primary bg-card p-4 max-md:hidden md:flex">
      <h2 className="text-center text-base font-semibold text-ring">
        Optional Info
      </h2>
      <OptionalInfo form={form} />
    </aside>
  );
};

export default RightSidebarFormComponent;
