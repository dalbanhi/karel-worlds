import { buttonVariants, Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";

import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import OptionalInfo from "./OptionalInfo";
import { customizableSprites } from "@/constants/puzzle";
import SpriteImageEditor from "./SpriteImageEditor";
interface CustomizePanelProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
}
import { customizableSpriteType } from "@/types/karelWorld";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";

type modalStep = "step1" | "karel" | "beepers" | "wall" | "background";

interface CustomSpriteModalContentProps {
  step: modalStep;
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  setCustomSpritesModalState: React.Dispatch<React.SetStateAction<modalStep>>;
}

const CustomSpriteModalContent: React.FC<CustomSpriteModalContentProps> = ({
  step,
  form,
  setCustomSpritesModalState,
}) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (step === "step1") {
    return (
      <div className="flex gap-2">
        {customizableSprites.map((sprite) => (
          <Button
            key={`${sprite.name} Dialog`}
            onClick={() => {
              setCustomSpritesModalState(
                sprite.name.toLowerCase() as modalStep
              );
            }}
          >
            {sprite.name} <Pencil1Icon />
          </Button>
        ))}
      </div>
    );
  } else {
    const customizableSprite = {
      name: capitalizeFirstLetter(step),
      value: `${step}Image`,
    };
    return (
      <SpriteImageEditor
        form={form}
        sprite={customizableSprite as customizableSpriteType}
      />
    );
  }
};

const CustomizePanel: React.FC<CustomizePanelProps> = ({ form }) => {
  const [customSpritesModalState, setCustomSpritesModalState] =
    useState<modalStep>("step1");

  const [customSpritesModalOpen, setCustomSpritesModalOpen] = useState(false);
  return (
    <div className="flex gap-2 md:hidden">
      <Dialog
        open={customSpritesModalOpen}
        onOpenChange={() => {
          setCustomSpritesModalOpen((prevState) => {
            return !prevState;
          });
          setCustomSpritesModalState("step1");
        }}
      >
        <DialogTrigger
          className={`flex min-w-0 shrink gap-1 ${buttonVariants({ variant: "default" })}`}
        >
          Customize Sprites
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col gap-2">
              {customSpritesModalState !== "step1" ? (
                <Button
                  className="flex w-1/6 gap-2"
                  variant={"outline"}
                  onClick={() => {
                    setCustomSpritesModalState("step1");
                  }}
                >
                  <ArrowLeftIcon />
                </Button>
              ) : null}
              <DialogTitle className="w-full capitalize">
                {customSpritesModalState === "step1"
                  ? "Choose which sprite to customize"
                  : `Customize ${customSpritesModalState} Sprite`}
              </DialogTitle>
            </div>
            <DialogDescription>
              {customSpritesModalState === "step1"
                ? "Choose which sprite to customize"
                : `Customize the image for ${customSpritesModalState}`}
            </DialogDescription>
          </DialogHeader>
          <CustomSpriteModalContent
            step={customSpritesModalState}
            form={form}
            setCustomSpritesModalState={setCustomSpritesModalState}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className={`flex min-w-0 shrink gap-1 ${buttonVariants({ variant: "default" })}`}
        >
          Add Optional Info
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Optional Information</DialogTitle>
            <DialogDescription>
              Add optional information to your puzzle.
            </DialogDescription>
          </DialogHeader>
          <OptionalInfo form={form} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomizePanel;
