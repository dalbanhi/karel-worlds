"use client";
import { PixiComponent } from "@pixi/react";
import { Graphics as PIXIGraphics } from "pixi.js";
interface CircleProps {
  x: number;
  y: number;
  radius: number;
  color: number;
}

const Circle = PixiComponent<CircleProps, PIXIGraphics>("Circle", {
  create: () => new PIXIGraphics(),
  applyProps: (g, _, props) => {
    g.clear();
    g.beginFill(props.color);
    g.drawCircle(props.x, props.y, props.radius);
    g.endFill();
  },
});

export default Circle;
