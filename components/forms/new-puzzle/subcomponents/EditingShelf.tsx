import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { worldInfoType } from "@/types/karelWorld";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormLabel } from "@/components/ui/form";

interface EditingShelfProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  name: string;
  worldInfo: worldInfoType | undefined;
  setWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
}

const EditingShelf: React.FC<EditingShelfProps> = ({
  form,
  name,
  worldInfo,
  setWorldInfo,
}) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex gap-2 flex-col grow">
        <FormLabel className="flex justify-items-end gap-2 w-full">
          <span>{"Karel X Position"}</span>
          <span>{worldInfo?.karel.x}</span>
        </FormLabel>
        <Slider
          min={1}
          max={25}
          step={1}
          defaultValue={[1]}
          value={[worldInfo?.karel.x || 1]}
          onValueChange={(value) =>
            setWorldInfo({
              karel: {
                ...worldInfo?.karel,
                x: value[0],
                y: worldInfo?.karel.y || 1, // Ensure y is always defined
                type: worldInfo?.karel.type || "karel", // Ensure type is always defined
                direction: worldInfo?.karel.direction || "east",
                backpack: worldInfo?.karel.backpack ?? 0,
                infiniteBackpack: worldInfo?.karel.infiniteBackpack ?? false,
                subtype: worldInfo?.karel.subtype || "karel", // Ensure subtype is always defined
                count: worldInfo?.karel.count ?? 1,
              },
              gridElements: worldInfo?.gridElements || [],
            })
          }
        />
      </div>
      <div className="flex gap-2 flex-col grow">
        <FormLabel className="flex justify-items-end gap-2 w-full">
          <span>{"Karel Y Position"}</span>
          <span>{worldInfo?.karel.y}</span>
        </FormLabel>
        <Slider
          min={1}
          max={25}
          step={1}
          defaultValue={[1]}
          value={[worldInfo?.karel.y || 1]}
          onValueChange={(value) =>
            setWorldInfo({
              karel: {
                ...worldInfo?.karel,
                x: worldInfo?.karel.x || 1,
                y: value[0], // Ensure y is always defined
                type: worldInfo?.karel.type || "karel", // Ensure type is always defined
                direction: worldInfo?.karel.direction || "east",
                backpack: worldInfo?.karel.backpack ?? 0,
                infiniteBackpack: worldInfo?.karel.infiniteBackpack ?? false,
                subtype: worldInfo?.karel.subtype || "karel", // Ensure subtype is always defined
                count: worldInfo?.karel.count ?? 1,
              },
              gridElements: worldInfo?.gridElements || [],
            })
          }
        />
      </div>
    </div>
  );
};

export default EditingShelf;
