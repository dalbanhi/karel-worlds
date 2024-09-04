import { worldInfoType } from "@/types/karelWorld";
import {
  KarelElement,
  GridElement,
} from "@/utils/custom/KarelElement/KarelElement";

export const examplePuzzleWorldStart: worldInfoType = {
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
};

export const examplePuzzleWorldEnd: worldInfoType = {
  karel: {
    x: 1,
    y: 0,
    type: "karel",
    direction: "south",
    backpack: 0,
    infiniteBackpack: false,
    count: 1,
    subtype: "karel",
  },
  gridElements: [
    {
      x: 0,
      y: 0,
      type: "beeper",
      count: 1,
      subtype: "beeper",
    },
    {
      x: 1,
      y: 0,
      type: "beeper",
      count: 1,
      subtype: "beeper",
    },
  ],
};

export const examplePuzzleWorldImages = {
  karel: "",
  beeper: "",
  wall: "",
  empty: "",
};

export const examplePuzzleWorldDimensions = {
  width: 2,
  height: 2,
};

export const maxWorldWidthHeight = 25;
