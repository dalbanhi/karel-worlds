import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import EditingShelf from "@/components/forms/new-puzzle/subcomponents/EditingShelf/EditingShelf";
import { worldInfoType } from "@/types/karelWorld";

interface EditableWorldProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  name: string;
}

// "karel": {
//       "x": 0,
//       "y": 0,
//       "type": "karel",
//       "direction": "east",
//       "backpack": 0,
//       "infiniteBackpack": false,
//       "count": 1,
//       "subtype": "karel"
//     },
//     "gridElements": []

const EditableWorld: React.FC<EditableWorldProps> = ({ form, name }) => {
  const [worldInfo, setWorldInfo] = useState<worldInfoType>({
    karel: {
      x: 0,
      y: 0,
      type: "karel",
      direction: "east",
      backpack: 0,
      infiniteBackpack: false,
      count: 1,
      subtype: "karel",
    },
    gridElements: [],
  });
  return (
    <section className="flex flex-col justify-center gap-2 w-full">
      <h5 className="font-semibold text-center">{name}</h5>
      <EditingShelf
        form={form}
        name={name}
        worldInfo={worldInfo}
        setWorldInfo={setWorldInfo}
      />
    </section>
  );
};

export default EditableWorld;
