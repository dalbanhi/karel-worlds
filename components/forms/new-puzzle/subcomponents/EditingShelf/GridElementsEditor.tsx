import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { worldInfoType } from "@/types/karelWorld";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  interface coordsType {
    row: number;
    column: number;
  }
  const numberInputs = [
    { name: "row", max: worldHeight - 1 },
    { name: "column", max: worldWidth - 1 },
  ];

  const [elementEditingCoords, setElementEditingCoords] = useState<coordsType>({
    row: 0,
    column: 0,
  });

  const handleEditWall = (mode: "add" | "remove", coords: coordsType) => {};
  const handleEditBeeper = (mode: "add" | "remove", coords: coordsType) => {
    //check the grid element if a beeper at the coords already exists
    const beeperExists = worldInfo?.gridElements.find(
      (element) =>
        element.type === "beeper" &&
        element.x === coords.row &&
        element.y === coords.column
    );

    if (mode === "add") {
      if (beeperExists) {
        setWorldInfo((prevWorldInfo) => {
          const newGridElements = prevWorldInfo.gridElements.map((element) => {
            if (
              element.type === "beeper" &&
              element.x === coords.row &&
              element.y === coords.column
            ) {
              return {
                ...element,
                count: element.count + 1,
              };
            }
            return element;
          });
          return {
            ...prevWorldInfo,
            gridElements: newGridElements,
          };
        });
      } else {
        setWorldInfo((prevWorldInfo) => {
          return {
            ...prevWorldInfo,
            gridElements: [
              ...prevWorldInfo.gridElements,
              {
                x: coords.row,
                y: coords.column,
                type: "beeper",
                count: 1,
                subtype: "beeper",
              },
            ],
          };
        });
      }
    } else if (mode === "remove") {
      if (beeperExists) {
        setWorldInfo((prevWorldInfo) => {
          const newGridElements = prevWorldInfo.gridElements.map((element) => {
            if (
              element.type === "beeper" &&
              element.x === coords.row &&
              element.y === coords.column
            ) {
              return {
                ...element,
                count: element.count - 1,
              };
            }
            return element;
          });
          return {
            ...prevWorldInfo,
            gridElements: newGridElements.filter(
              (element) => element.count > 0
            ),
          };
        });
      } else {
        console.log("No beeper to remove");
        toast({
          variant: "destructive",
          title: "Error",
          description: "No beeper to remove",
        });
      }
    }
  };

  const handleEditElement = (
    element: "beeper" | "wall",
    mode: "add" | "remove",
    coords: coordsType
  ) => {
    switch (element) {
      case "beeper":
        handleEditBeeper(mode, coords);
      case "wall":
        handleEditWall(mode, coords);
    }
  };

  useEffect(() => {
    if (worldWidth < elementEditingCoords?.column) {
      setElementEditingCoords((prevCoords) => ({
        ...prevCoords,
        column: worldWidth - 1,
      }));
    }
    if (worldHeight < elementEditingCoords?.row) {
      setElementEditingCoords((prevCoords) => ({
        ...prevCoords,
        row: worldHeight - 1,
      }));
    }
  }, [worldWidth, worldHeight]);

  const [editingMode, setEditingMode] = useState<"add" | "remove">("add");
  const [editingElement, setEditingElement] = useState<"beeper" | "wall">(
    "beeper"
  );

  return (
    <div className="flex justify-center gap-2 mt-4 ">
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
          type="button"
          onClick={() => {
            console.log("editingElement", editingElement);
            console.log("editingMode", editingMode);
            console.log("elementEditingCoords", elementEditingCoords);
            handleEditElement(
              editingElement,
              editingMode,
              elementEditingCoords
            );
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
