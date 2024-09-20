import { FormLabel, FormItem, FormControl } from "@/components/ui/form";
import { minWorldSize, maxWorldSize } from "@/constants/example-puzzle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import React, { useEffect, useState } from "react";
import { worldInfoType } from "@/types/karelWorld";

interface KarelInfoEditorProps {
  worldInfo: worldInfoType | undefined;
  setWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
  worldWidth: number;
  worldHeight: number;
}

const KarelInfoEditor: React.FC<KarelInfoEditorProps> = ({
  worldInfo,
  setWorldInfo,
  worldWidth,
  worldHeight,
}) => {
  const [widthDisabled, setWidthDisabled] = useState(false);
  const [heightDisabled, setHeightDisabled] = useState(false);
  useEffect(() => {
    if (worldWidth < (worldInfo?.karel?.x ?? 0)) {
      setWorldInfo((prevWorldInfo) => ({
        ...prevWorldInfo,
        karel: {
          ...prevWorldInfo.karel,
          x: worldWidth - 1,
        },
        gridElements: worldInfo?.gridElements || [],
      }));
    }

    if (worldHeight < (worldInfo?.karel?.y ?? 0)) {
      setWorldInfo((prevWorldInfo) => ({
        ...prevWorldInfo,
        karel: {
          ...prevWorldInfo.karel,
          y: worldHeight - 1,
        },
        gridElements: worldInfo?.gridElements || [],
      }));
    }

    if (worldWidth === minWorldSize) {
      setWorldInfo((prevWorldInfo) => ({
        ...prevWorldInfo,
        karel: {
          ...prevWorldInfo.karel,
          x: 0,
        },
        gridElements: worldInfo?.gridElements || [],
      }));
      setWidthDisabled(true);
    } else {
      setWidthDisabled(false);
    }
    if (worldHeight === minWorldSize) {
      setWorldInfo((prevWorldInfo) => ({
        ...prevWorldInfo,
        karel: {
          ...prevWorldInfo.karel,
          y: 0,
        },
        gridElements: worldInfo?.gridElements || [],
      }));
      setHeightDisabled(true);
    } else {
      setHeightDisabled(false);
    }
  }, [worldWidth, worldHeight]);
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex gap-2 flex-col grow">
        <FormLabel className="flex justify-items-end gap-2 w-full">
          <span>{"Karel X Position"}</span>
          <span>{worldInfo?.karel.x}</span>
        </FormLabel>
        <Slider
          min={minWorldSize}
          max={worldWidth - 1}
          step={1}
          disabled={widthDisabled}
          defaultValue={[1]}
          value={[worldInfo?.karel.x || 0]}
          onValueChange={(value) =>
            setWorldInfo({
              karel: {
                ...worldInfo?.karel,
                x: value[0],
                y: worldInfo?.karel.y || 0, // Ensure y is always defined
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
          min={minWorldSize}
          max={worldHeight - 1}
          step={1}
          defaultValue={[1]}
          disabled={heightDisabled}
          value={[worldInfo?.karel.y || 0]}
          onValueChange={(value) =>
            setWorldInfo({
              karel: {
                ...worldInfo?.karel,
                x: worldInfo?.karel.x || 0,
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
      <FormItem className="flex flex-col justify-center items-center ">
        <FormLabel className="w-full text-center">Karel Direction </FormLabel>
        <FormControl>
          <Select
            value={worldInfo?.karel.direction}
            onValueChange={(val) => {
              setWorldInfo({
                karel: {
                  ...worldInfo?.karel,
                  x: worldInfo?.karel.x || 0,
                  y: worldInfo?.karel.y || 0, // Ensure y is always defined
                  type: worldInfo?.karel.type || "karel", // Ensure type is always defined
                  direction: val,
                  backpack: worldInfo?.karel.backpack ?? 0,
                  infiniteBackpack: worldInfo?.karel.infiniteBackpack ?? false,
                  subtype: worldInfo?.karel.subtype || "karel", // Ensure subtype is always defined
                  count: worldInfo?.karel.count ?? 1,
                },
                gridElements: worldInfo?.gridElements || [],
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="west">West</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </div>
  );
};

export default KarelInfoEditor;
