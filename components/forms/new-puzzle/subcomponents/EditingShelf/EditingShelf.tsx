import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import { worldInfoType } from "@/types/karelWorld";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import KarelInfoEditor from "./KarelInfoEditor";
import GridElementsEditor from "./GridElementsEditor";

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
  const watchWorldWidth = form.watch("worldWidth");
  const watchWorldHeight = form.watch("worldHeight");
  return (
    <div>
      <KarelInfoEditor
        worldInfo={worldInfo}
        setWorldInfo={setWorldInfo}
        worldWidth={watchWorldWidth}
        worldHeight={watchWorldHeight}
        name={name}
      />
      <GridElementsEditor
        worldInfo={worldInfo}
        setWorldInfo={setWorldInfo}
        worldWidth={watchWorldWidth}
        worldHeight={watchWorldHeight}
        worldName={name}
      />
    </div>
  );
};

export default EditingShelf;
