"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import LeftSidebarFormComponent from "@/components/forms/new-puzzle/LeftSidebarFormComponent";
import RightSidebarFormComponent from "@/components/forms/new-puzzle/RightSidebarFormComponent";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { puzzleSchema } from "@/lib/validators/puzzle.schema";

import { Form } from "@/components/ui/form";
import MainNewPuzzle from "../MainNewPuzzle";
import { useState, createContext } from "react";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";
import { montserrat } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  EyeClosedIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

export type WorldInfoContextType = {
  worldInfo: worldInfoType;
  setWorldInfo: React.Dispatch<React.SetStateAction<worldInfoType>>;
};

export const GoalWorldInfoContext = createContext<WorldInfoContextType | null>(
  null
);

export const StartWorldInfoContext = createContext<WorldInfoContextType | null>(
  null
);

export default function NewPuzzleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
  };

  const form = useForm<z.infer<typeof puzzleSchema>>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: {
      worldWidth: 10,
      worldHeight: 10,
      name: "",
      karelImage: "",
      beepersImage: "",
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const [startWorldInfo, setStartWorldInfo] = useState<worldInfoType>({
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

  const [goalWorldInfo, setGoalWorldInfo] = useState<worldInfoType>({
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
  const worldWidth = form.watch("worldWidth");
  const worldHeight = form.watch("worldHeight");
  const puzzleName = form.watch("name");

  const karelImage = form.watch("karelImage");
  const beepersImage = form.watch("beepersImage");
  const backgroundImage = form.watch("backgroundImage");
  const wallImage = form.watch("wallImage");

  const [imagesObj, setImagesObj] = useState<puzzleImagesType>({
    karel: karelImage || "",
    beeper: beepersImage || "",
    background: backgroundImage || "",
    wall: wallImage || "",
  });

  useEffect(() => {
    setImagesObj({
      karel: karelImage || "",
      beeper: beepersImage || "",
      background: backgroundImage || "",
      wall: wallImage || "",
    });
  }, [karelImage, beepersImage, backgroundImage, wallImage]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full justify-center">
          <div className="flex min-h-screen grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
            {!showPreview && (
              <React.Fragment>
                <LeftSidebarFormComponent form={form} />
                <GoalWorldInfoContext.Provider
                  value={{
                    worldInfo: goalWorldInfo,
                    setWorldInfo: setGoalWorldInfo,
                  }}
                >
                  <StartWorldInfoContext.Provider
                    value={{
                      worldInfo: startWorldInfo,
                      setWorldInfo: setStartWorldInfo,
                    }}
                  >
                    <MainNewPuzzle
                      form={form}
                      setShowPreview={setShowPreview}
                    />
                  </StartWorldInfoContext.Provider>
                </GoalWorldInfoContext.Provider>
                <RightSidebarFormComponent form={form} />
              </React.Fragment>
            )}
            {showPreview && (
              <div className="h-fit w-full">
                <div className="flex justify-start items-center gap-2 p-4 bg-primary">
                  <Button
                    onClick={() => setShowPreview(false)}
                    className="w-fi flex gap-2"
                    variant={"outline"}
                    type="button"
                  >
                    <ArrowLeftIcon /> Back to Edit
                  </Button>
                  <h1
                    className={`text-center w-full text-lg font-bold md:text-2xl ${montserrat.className}`}
                  >
                    PREVIEW
                  </h1>
                </div>
                <div className="w-full bg-card">
                  <Puzzle
                    worldDimensions={{ width: worldWidth, height: worldHeight }}
                    puzzleImages={imagesObj}
                    startWorldInfo={startWorldInfo}
                    goalWorldInfo={goalWorldInfo}
                    puzzleName={puzzleName}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
