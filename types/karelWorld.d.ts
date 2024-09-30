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

export interface worldInfoType {
  karel: SimpleKarelElementType;
  gridElements: SimpleGridElementType[];
}

export interface puzzleImagesType {
  karel: string;
  beeper: string;
  wall: string;
  background: string;
}

export interface customizableSpriteType {
  name: "Karel" | "Beepers" | "Walls" | "Background";
  value: "karelImage" | "beepersImage" | "wallImage" | "backgroundImage";
}
