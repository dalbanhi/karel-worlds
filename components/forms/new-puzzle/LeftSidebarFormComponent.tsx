"use client";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import ImageUploader from "./subcomponents/ImageUploader";

interface LeftSidebarFormComponentProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const LeftSidebarFormComponent: React.FC<LeftSidebarFormComponentProps> = ({
  form,
}) => {
  interface ThingToCustomize {
    name: string;
    value: "karelImage" | "beeperImage";
  }
  const thingsToCustomize: ThingToCustomize[] = [
    { name: "Karel", value: "karelImage" },
    { name: "Beepers", value: "beeperImage" },
  ];

  return (
    <aside className="min-h-screen border-r-2 border-primary bg-card w-3/12 flex-col gap-2 p-4 max-sm:hidden sm:flex">
      <h2 className="text-ring font-semibold text-base text-center">
        Customize Your Sprites
      </h2>
      {thingsToCustomize.map((thing) => {
        return (
          <Dialog>
            <DialogTrigger>
              <Button type="button"> Change {thing.name} </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>{thing.name} Image</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <FormField
                    control={form.control}
                    name={thing.value}
                    render={({ field: { onChange, value } }) => (
                      <FormItem className="flex flex-col justify-center items-center w-full">
                        <FormLabel className="w-1/3">
                          Current {thing.name} Image:{" "}
                        </FormLabel>
                        <FormControl>
                          <ImageUploader
                            image={value}
                            setImage={onChange}
                            nameOfElementCustomizing={thing.name}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
      {/* <Dialog>
        <DialogTrigger>
          <Button> Change Karel </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </aside>
  );
};

export default LeftSidebarFormComponent;
