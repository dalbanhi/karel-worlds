"use client";
import { useForm } from "react-hook-form";
import LeftSidebarFormComponent from "@/components/forms/new-puzzle/LeftSidebarFormComponent";
import RightSidebarFormComponent from "@/components/forms/new-puzzle/RightSidebarFormComponent";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";

import {
  Form,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  //   FormDescription,
  //   FormMessage,
  //   FormControl,
} from "@/components/ui/form";
import MainNewPuzzle from "../MainNewPuzzle";

export default function NewPuzzleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
  };

  const form = useForm<z.infer<typeof puzzleSchema>>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full justify-center">
          <div className="flex min-h-screen grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
            <LeftSidebarFormComponent />
            <div className="flex flex-col w-full">
              {children}
              <MainNewPuzzle form={form} />
              <div className="flex justify-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit Puzzle
                </button>
              </div>
            </div>
            <RightSidebarFormComponent />
          </div>
        </div>
      </form>
    </Form>
  );
}
