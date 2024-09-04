import React from "react";
import { Sprite } from "@pixi/react";
import { KarelElement } from "@/utils/custom/KarelElement/KarelElement";

interface KarelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  karel: KarelElement;
  karelImage: string;
}

const Karel: React.FC<KarelProps> = ({
  x,
  y,
  width,
  height,
  karel,
  karelImage,
}) => {
  const directions = {
    east: 0,
    south: 90,
    west: 180,
    north: 270,
  };

  if (karelImage === "") {
    karelImage = "/images/pixi-js/classic-karel.png";
  }

  return (
    <Sprite
      x={x}
      y={y}
      width={width}
      height={height}
      image={karelImage}
      anchor={0.5}
      angle={directions[karel.direction as keyof typeof directions]}
      zIndex={2}
      eventMode="static"
      //TODO: Add onclick to edit the karel direction
      onclick={() => {}}
    />
  );
};

export default Karel;
