import React from "react";
import { Sprite, Text } from "@pixi/react";
import { TextStyle } from "@pixi/text";

interface SimpleBeeper {
  img: string;
  beeperCount: number;
}

interface BeeperProps {
  x: number;
  y: number;
  width: number;
  height: number;
  beeper: SimpleBeeper;
}

const Beeper: React.FC<BeeperProps> = ({ x, y, width, height, beeper }) => {
  const myTextStyle = new TextStyle({
    align: "center",
    stroke: "black",
    strokeThickness: 3,
    fontSize: height / 2,
    fill: "white",
  });

  return (
    <>
      <Sprite
        x={x}
        y={y}
        width={width}
        height={height}
        image={beeper.img}
        anchor={0.5}
        zIndex={3}
      />
      <Text
        x={x}
        y={y}
        text={`${beeper.beeperCount}`}
        style={myTextStyle}
        anchor={0.5}
        zIndex={4}
        // eventMode="static"
        //TODO: Add onclick to edit the beeper count
        // onclick={() => {}}
      />
    </>
  );
};

export default Beeper;
