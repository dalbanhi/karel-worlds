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
import { Pencil1Icon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";
import { customizableSprites } from "@/constants/puzzle";
import SpriteImageEditor from "./subcomponents/SpriteImageEditor";

interface LeftSidebarFormComponentProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}

const LeftSidebarFormComponent: React.FC<LeftSidebarFormComponentProps> = ({
  form,
}) => {
  return (
    <aside className="min-h-screen border-r-2 border-primary bg-card flex-col gap-2 p-4 grow shrink w-3/12 max-md:hidden md:flex">
      <h2 className="text-ring font-semibold text-base text-center">
        Customize Your Sprites
      </h2>
      <div className="flex flex-col gap-2 shrink">
        {customizableSprites.map((sprite) => {
          return (
            <Dialog key={`${sprite.name} Dialog`}>
              <DialogTrigger
                className={`shrink min-w-0 flex gap-1 ${buttonVariants({ variant: "default" })}`}
              >
                {sprite.name} <Pencil1Icon />
              </DialogTrigger>
              <DialogContent
                className="bg-card shrink"
                aria-describedby={undefined}
              >
                <DialogHeader>
                  <DialogTitle>{sprite.name} Image</DialogTitle>
                  <DialogDescription>
                    Customize the image for {sprite.name}.
                  </DialogDescription>
                </DialogHeader>
                <SpriteImageEditor form={form} sprite={sprite} />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </aside>
  );
};

export default LeftSidebarFormComponent;
