export interface SimpleGridElementType {
  x: number;
  y: number;
  type: string;
  count: number;
  subtype: string;
}

export interface SimpleKarelElementType extends SimpleGridElementType {
  direction: string;
  backpack: number;
  infiniteBackpack: boolean;
}

import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";

export interface worldInfoType {
  karel: SimpleKarelElementType;
  gridElements: SimpleGridElementType[];
}

export interface puzzleImagesType {
  karel: string;
  beeper: string;
  wall: string;
  empty: string;
}
