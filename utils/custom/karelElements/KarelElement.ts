class KarelElement {
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

export default KarelElement;
