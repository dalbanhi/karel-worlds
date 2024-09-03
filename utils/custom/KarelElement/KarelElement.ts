export class GridElement {
  x: number;
  y: number;
  type: string;
  count: number;
  subtype: string;

  constructor(
    type: string,
    x: number,
    y: number,
    count: number = 1,
    subtype: string = ""
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.count = count;
    this.subtype = subtype;
  }

  toJSON(): {
    x: number;
    y: number;
    type: string;
    count: number;
    subtype: string;
  } {
    return {
      x: this.x,
      y: this.y,
      type: this.type,
      count: this.count,
      subtype: this.subtype,
    };
  }

  isBeeper(): boolean {
    return this.type === "beeper";
  }

  isWall(): boolean {
    return this.type === "wall";
  }

  isKarel(): boolean {
    return this.type === "karel";
  }

  isPassable(): boolean {
    return this.type !== "wall";
  }

  getCount(): number {
    return this.count;
  }

  addOne(): void {
    this.count += 1;
  }

  subtractOne(): void {
    this.count -= 1;
  }

  getSubtype(): string {
    return this.subtype;
  }

  getCoords(): [number, number] {
    return [this.x, this.y];
  }
}

export class KarelElement extends GridElement {
  direction: string;
  backpack: number;
  infiniteBackpack: boolean;

  constructor(
    x: number,
    y: number,
    direction: string,
    backpack: number,
    infiniteBackpack: boolean
  ) {
    super("karel", x, y);
    this.direction = direction;
    this.backpack = backpack;
    this.infiniteBackpack = infiniteBackpack;
  }

  toJSON(): {
    x: number;
    y: number;
    type: string;
    direction: string;
    backpack: number;
    infiniteBackpack: boolean;
    count: number;
    subtype: string;
  } {
    return {
      x: this.x,
      y: this.y,
      type: this.type,
      direction: this.direction,
      backpack: this.backpack,
      infiniteBackpack: this.infiniteBackpack,
      count: this.count,
      subtype: this.subtype,
    };
  }

  getDirection(): string {
    return this.direction;
  }

  getBackpack(): number {
    return this.backpack;
  }

  setDirection(direction: string): void {
    this.direction = direction;
  }

  setBackpack(backpack: number): void {
    this.backpack = backpack;
  }

  setInfiniteBackpack(infiniteBackpack: boolean): void {
    this.infiniteBackpack = infiniteBackpack;
  }
}
