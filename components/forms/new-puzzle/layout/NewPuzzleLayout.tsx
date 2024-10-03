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
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { useSessionClearOnSignOut } from "@/hooks/useSessionClearOnSignOut";
import { ToastAction } from "@radix-ui/react-toast";

import { createPuzzle } from "@/lib/actions/puzzles";
import { useRouter } from "next/navigation";

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

interface NewPuzzleLayoutProps {
  children: React.ReactNode;
  currentUserID: string | undefined;
}

const NewPuzzleLayout: React.FC<NewPuzzleLayoutProps> = ({
  children,
  currentUserID,
}) => {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();

  const isUserSignedIn = () => {
    if (!isSignedIn) {
      sessionStorage.setItem(
        "puzzleFormData",
        JSON.stringify(form.getValues())
      );

      const errorTitle = "Not Signed In Error";
      const errorString =
        "You must be signed in to save a puzzle! Continue signing in to save your puzzle (any changes made will be saved).";
      toast({
        variant: "warning",
        title: errorTitle,
        description: errorString,
        action: (
          <ToastAction
            className={`text-ring ${buttonVariants({ variant: "outline" })}`}
            onClick={() => {
              redirectToSignIn({ signInForceRedirectUrl: "/new-puzzle" });
            }}
            altText="Sign In"
          >
            Sign In
          </ToastAction>
        ),
      });
      return false;
    }
    return true;
  };

  const onSubmitForm = async (data: z.infer<typeof puzzleSchema>) => {
    // Handle form submission
    console.log("Form data submitted 2:");
    console.log(data);
    console.log("goalWorldInfo", goalWorldInfo);
    console.log("startWorldInfo", startWorldInfo);
    data.startWorldInfo = startWorldInfo;
    data.goalWorldInfo = goalWorldInfo;
    const newPuzzle = await createPuzzle(data);
    //clear the session storage
    sessionStorage.removeItem("puzzleFormData");
    sessionStorage.removeItem("startWorldInfo");
    sessionStorage.removeItem("goalWorldInfo");

    router.push(`/puzzle/${newPuzzle.id}`);
  };

  const storedPuzzleFormData =
    typeof window !== "undefined"
      ? sessionStorage.getItem("puzzleFormData")
      : null;

  const initialFormValues = storedPuzzleFormData
    ? JSON.parse(storedPuzzleFormData)
    : {
        worldWidth: 10,
        worldHeight: 10,
        difficulty: -1,
        rating: -1,
        name: "",
        karelImage: "",
        beepersImage: "",
        description: "",
        backgroundImage: "",
        wallImage: "",
        tags: [],
        hints: [],
        creatorId: currentUserID, // TODO: change to currentUserID
      };
  const form = useForm<z.infer<typeof puzzleSchema>>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: {
      ...initialFormValues,
      creatorId: currentUserID, // TODO: change to currentUserID
    },
  });

  const watchValues = form.watch();
  useEffect(() => {
    console.log(watchValues);
    sessionStorage.setItem("puzzleFormData", JSON.stringify(watchValues));
  }, [watchValues]);

  const errors = form.formState.errors;
  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors, redirectToSignIn, toast]);

  const [showPreview, setShowPreview] = useState(false);

  const startWorldSavedData =
    typeof window !== "undefined"
      ? sessionStorage.getItem("startWorldInfo")
      : null;

  const initialStartWorld = startWorldSavedData
    ? JSON.parse(startWorldSavedData)
    : {
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

  const [startWorldInfo, setStartWorldInfo] =
    useState<worldInfoType>(initialStartWorld);

  useEffect(() => {
    console.log("start world changed");
    console.log("startWorldInfo", startWorldInfo);
    sessionStorage.setItem("startWorldInfo", JSON.stringify(startWorldInfo));
  }, [startWorldInfo]);

  const goalWorldSavedData =
    typeof window !== "undefined"
      ? sessionStorage.getItem("goalWorldInfo")
      : null;

  const initialGoalWorld = goalWorldSavedData
    ? JSON.parse(goalWorldSavedData)
    : {
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

  const [goalWorldInfo, setGoalWorldInfo] =
    useState<worldInfoType>(initialGoalWorld);

  useEffect(() => {
    sessionStorage.setItem("goalWorldInfo", JSON.stringify(goalWorldInfo));
  }, [goalWorldInfo]);

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

  useSessionClearOnSignOut();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <div className="flex w-full justify-center">
          <div className="flex h-full grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
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
                    <div className="flex w-full flex-col">
                      {children}
                      <MainNewPuzzle
                        form={form}
                        setShowPreview={setShowPreview}
                      />
                    </div>
                  </StartWorldInfoContext.Provider>
                </GoalWorldInfoContext.Provider>
                <RightSidebarFormComponent form={form} />
              </React.Fragment>
            )}
            {showPreview && (
              <div className="h-fit w-full">
                <div className="flex items-center justify-start gap-2 bg-primary p-4">
                  <Button
                    onClick={() => setShowPreview(false)}
                    className="flex w-fit gap-2"
                    variant={"outline"}
                    type="button"
                  >
                    <ArrowLeftIcon /> Back to Edit
                  </Button>
                  <h1
                    className={`w-full text-center text-lg font-bold md:text-2xl ${montserrat.className}`}
                  >
                    PREVIEW
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 bg-info/50 p-2">
                  {" "}
                  <h3 className="text-ring">
                    This puzzle is not shared -- so only you can see it. Click
                    Share to let everyone see it!
                  </h3>
                  <Button
                    type="submit"
                    className="flex w-fit gap-2"
                    variant={"gradient"}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      console.log("Form data submitted 1:");
                      e.preventDefault();
                      if (isUserSignedIn()) {
                        form.handleSubmit(onSubmitForm)();
                      }
                    }}
                  >
                    Share
                  </Button>
                </div>
                <div className="w-full">
                  <Puzzle
                    worldDimensions={{ width: worldWidth, height: worldHeight }}
                    puzzleImages={imagesObj}
                    startWorldInfo={startWorldInfo}
                    goalWorldInfo={goalWorldInfo}
                    puzzleName={puzzleName || ""}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewPuzzleLayout;
