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
    <aside className="min-h-screen border-l-2 border-primary bg-card flex-col gap-2 p-4 grow shrink w-3/12 max-md:hidden md:flex">
      <h2 className="text-ring font-semibold text-base text-center">
        Optional Info
      </h2>
      <OptionalInfo form={form} />
    </aside>
  );
};

export default RightSidebarFormComponent;
