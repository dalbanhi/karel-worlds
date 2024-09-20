import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { worldInfoType } from "@/types/karelWorld";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GridElementsEditorProps {
  worldInfo: worldInfoType | undefined;
  setWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
  worldWidth: number;
  worldHeight: number;
}

const GridElementsEditor: React.FC<GridElementsEditorProps> = ({
  worldInfo,
  setWorldInfo,
  worldWidth,
  worldHeight,
}) => {
  const numberInputs = [
    { name: "row", max: worldHeight - 1 },
    { name: "column", max: worldWidth - 1 },
  ];
  const [editingMode, setEditingMode] = useState<"add" | "remove">("add");
  const [editingElement, setEditingElement] = useState<"beeper" | "wall">();
  const [elementEditingCoords, setElementEditingCoords] = useState<{
    row: number;
    column: number;
  }>();
  return (
    <div className="flex justify-start gap-2 mt-4 ">
      <FormItem className="flex justify-center items-center gap-2 ">
        <FormLabel className="w-full text-center">Editing Mode </FormLabel>
        <FormControl className="flex items-center">
          <Select
            value={editingMode}
            onValueChange={(val: "add" | "remove") => {
              setEditingMode(val);
            }}
          >
            <SelectTrigger className="w-full min-w-30">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add</SelectItem>
              <SelectItem value="remove">Remove</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
      <div className="flex justify-center items-center gap-2">
        <FormItem className="flex justify-center items-center gap-2 ">
          <FormLabel className="w-full text-center capitalize">
            {editingMode}{" "}
          </FormLabel>
          <FormControl>
            <Select
              value={editingElement}
              onValueChange={(val: "beeper" | "wall") => {
                setEditingElement(val);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beeper">Beepers</SelectItem>
                {/* <SelectItem value="wall">Walls</SelectItem> */}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
        {numberInputs.map((input) => {
          return (
            <FormItem className="flex items-center gap-2" key={input.name}>
              <FormLabel htmlFor={input.name} className="capitalize">
                {input.name}
              </FormLabel>
              <Input
                min={0}
                max={input.max}
                className="min-w-16"
                type="number"
                name={input.name}
                value={elementEditingCoords?.[input.name as "row" | "column"]}
                onChange={(e) => {
                  setElementEditingCoords(
                    (prevCoords) =>
                      ({
                        ...prevCoords,
                        [input.name]: parseInt(e.target.value),
                      }) as { row: number; column: number }
                  );
                }}
              />
            </FormItem>
          );
        })}
        <Button
          onClick={() => {
            console.log("editingElement", editingElement);
            console.log("editingMode", editingMode);
            console.log("elementEditingCoords", elementEditingCoords);
          }}
          variant="default"
          className="capitalize"
        >
          {editingMode}
        </Button>
      </div>
    </div>
  );
};

export default GridElementsEditor;
