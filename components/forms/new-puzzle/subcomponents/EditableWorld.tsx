"use client";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";
import React, { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import EditingShelf from "@/components/forms/new-puzzle/subcomponents/EditingShelf/EditingShelf";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";
import { Stage, Container } from "@pixi/react";
import Grid from "@/components/PixiJS/Grid";
import { useCanvasSize } from "@/lib/hooks/useWindowSize";
import {
  GridElement,
  KarelElement,
} from "@/utils/custom/KarelElement/KarelElement";

interface EditableWorldProps {
  form: UseFormReturn<z.infer<typeof puzzleSchema>>;
  name: string;
}

function makeNewGrid(rows: number, cols: number): GridElement[][][] {
  let newGrid: GridElement[][][] = [];
  for (let i = 0; i < rows; i++) {
    let newRow: GridElement[][] = [];
    newGrid.push(newRow);
    for (let j = 0; j < cols; j++) {
      newGrid[i].push([new GridElement("empty", i, j)]); // Push an array with a single empty Karel Element object
    }
  }
  return newGrid;
}

const EditableWorld: React.FC<EditableWorldProps> = ({ form, name }) => {
  const [worldInfo, setWorldInfo] = useState<worldInfoType>({
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
  });
  const canvasSize = useCanvasSize();
  const worldWidth = form.watch("worldWidth");
  const worldHeight = form.watch("worldHeight");
  const karelImage = form.watch("karelImage");
  const beeperImage = form.watch("beeperImage");
  const backgroundImage = form.watch("backgroundImage");
  const wallImage = form.watch("wallImage");

  const [imagesObj, setImagesObj] = useState<puzzleImagesType>({
    karel: karelImage || "",
    beeper: beeperImage || "",
    background: backgroundImage || "",
    wall: wallImage || "",
  });

  useEffect(() => {
    setImagesObj({
      karel: karelImage || "",
      beeper: beeperImage || "",
      background: backgroundImage || "",
      wall: wallImage || "",
    });
  }, [karelImage, beeperImage, backgroundImage, wallImage]);

  const initialKarel = new KarelElement(
    worldInfo.karel.x,
    worldInfo.karel.y,
    worldInfo.karel.direction,
    worldInfo.karel.backpack,
    worldInfo.karel.infiniteBackpack
  );
  const initialBeepers = worldInfo.gridElements.filter(
    (element) => element.type === "beeper"
  );
  const [karel, setKarel] = useState<KarelElement>(initialKarel);
  const [beepers, setBeepers] = useState([...initialBeepers]);

  const firstEmptyGrid = makeNewGrid(worldWidth, worldHeight);

  const [internalGrid, setInternalGrid] = useState(firstEmptyGrid);

  useEffect(() => {
    let newGrid = makeNewGrid(worldWidth, worldHeight);
    let newKarel = new KarelElement(
      worldInfo.karel.x,
      worldInfo.karel.y,
      worldInfo.karel.direction,
      worldInfo.karel.backpack,
      worldInfo.karel.infiniteBackpack
    );

    let newBeepers = worldInfo.gridElements.filter(
      (element) => element.type === "beeper"
    );

    //add beepers to the grid
    newBeepers.forEach((beeper) => {
      let boundBeeperX = beeper.x >= worldWidth ? worldWidth - 1 : beeper.x;
      let boundBeeperY = beeper.y >= worldHeight ? worldHeight - 1 : beeper.y;

      newGrid[boundBeeperX][boundBeeperY] = [
        new GridElement("beeper", boundBeeperX, boundBeeperY, beeper.count),
      ];
    });

    //   //add karel to the grid
    let boundKarelX = newKarel.x >= worldWidth ? worldWidth - 1 : newKarel.x;
    let boundKarelY = newKarel.y >= worldHeight ? worldHeight - 1 : newKarel.y;

    // //only unshift if there is a beeper, otherwise, replace
    if (newGrid[boundKarelX][boundKarelY][0].type === "beeper") {
      newGrid[boundKarelX][boundKarelY].unshift(
        new KarelElement(
          boundKarelX,
          boundKarelY,
          newKarel.direction,
          newKarel.backpack,
          newKarel.infiniteBackpack
        )
      );
    } else {
      newGrid[boundKarelX][boundKarelY] = [
        new KarelElement(
          boundKarelX,
          boundKarelY,
          newKarel.direction,
          newKarel.backpack,
          newKarel.infiniteBackpack
        ),
      ];
    }

    setInternalGrid(newGrid);
    setKarel(newKarel);
    // setBeepers(newBeepers);
  }, [worldWidth, worldHeight, worldInfo.karel, worldInfo.gridElements]);

  return (
    <section className="flex flex-col justify-center gap-2 w-full">
      <h5 className="font-semibold text-center">{name}</h5>
      <EditingShelf
        form={form}
        name={name}
        worldInfo={worldInfo}
        setWorldInfo={setWorldInfo}
      />
      <div className="flex justify-center">
        <Stage
          width={canvasSize.width * 2}
          height={canvasSize.height * 2}
          options={{ background: 0xffffff }}
        >
          <Container x={0} y={0} sortableChildren={true} eventMode="static">
            <Grid
              pxWidth={canvasSize.width * 2}
              pxHeight={canvasSize.height * 2}
              rows={worldWidth}
              cols={worldHeight}
              internalGrid={internalGrid}
              karel={initialKarel}
              images={imagesObj}
            />
          </Container>
        </Stage>
      </div>
    </section>
  );
};

export default EditableWorld;
