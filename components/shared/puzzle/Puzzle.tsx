"use client";
import React, { useState, useEffect, useCallback } from "react";
import { serialization, WorkspaceSvg, Events, getMainWorkspace } from "blockly";
import "@/utils/custom/blocks/CustomBlocks";
import { javascriptGenerator } from "blockly/javascript";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MyBlocklyWorkspace from "./MyBlocklyWorkspace";
import MyAceEditor from "./MyAceEditor";
import RunnableWorld from "@/components/karel-worlds/RunnableWorld";
import ViewableWorld from "@/components/karel-worlds/ViewableWorld";
import { useCanvasSize } from "@/lib/hooks/useWindowSize";
import { RunningKarelProvider } from "@/lib/context/RunningKarelContext";
import {
  worldInfoType,
  puzzleImagesType,
  SimpleKarelElementType,
  SimpleGridElementType,
} from "@/types/karelWorld";
import { useToast } from "@/hooks/use-toast";
import { PuzzleWithMoreStuff } from "@/types/puzzleExtensions";
import { buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import PuzzleRatingForm from "@/components/forms/rating-puzzle/PuzzleRatingForm";
import { addPuzzleToSolvedList } from "@/lib/actions/puzzles";

interface PuzzleProps {
  worldDimensions: { width: number; height: number };
  startWorldInfo: worldInfoType;
  goalWorldInfo: worldInfoType;
  puzzleImages: puzzleImagesType;
  puzzleName: string;
  puzzleInfoFromDB?: PuzzleWithMoreStuff;
  currentUserID: string;
}

const Puzzle: React.FC<PuzzleProps> = ({
  worldDimensions,
  startWorldInfo,
  goalWorldInfo,
  puzzleImages,
  puzzleName,
  puzzleInfoFromDB,
  currentUserID,
}) => {
  return (
    <RunningKarelProvider>
      <PuzzleContent
        worldDimensions={worldDimensions}
        startWorldInfo={startWorldInfo}
        goalWorldInfo={goalWorldInfo}
        puzzleImages={puzzleImages}
        puzzleName={puzzleName}
        puzzleInfoFromDB={puzzleInfoFromDB}
        currentUserID={currentUserID}
      />
    </RunningKarelProvider>
  );
};

const PuzzleContent: React.FC<PuzzleProps> = ({
  worldDimensions,
  startWorldInfo,
  goalWorldInfo,
  puzzleImages,
  puzzleName,
  puzzleInfoFromDB,
  currentUserID,
}) => {
  const { toast } = useToast();
  const canvasSize = useCanvasSize(
    worldDimensions.width,
    worldDimensions.height,
    true
  );
  const [userJavaScriptCode, setUserJavaScriptCode] = useState("");
  const [workspaceState, setWorkspaceState] = useState({});
  const [shouldCheckSolution, setShouldCheckSolution] = useState(false);
  const [runningWorldInfo, setRunningWorldInfo] =
    useState<worldInfoType>(startWorldInfo);
  const [editorMode, setEditorMode] = useState("block");

  const [showGoalWorld, setShowGoalWorld] = useState(true);

  const [openRatingDialog, setOpenRatingDialog] = useState(false);

  const onAceChange = (value: string) => {
    // setUserJavaScriptCode(value);
    console.log("ace value", value);
  };

  const workspaceDidChange = (workspace: WorkspaceSvg) => {
    //TODO: Add block highlighting
    // javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    // javascriptGenerator.addReservedWords('highlightBlock');
    //https://developers.google.com/blockly/reference/js/blockly.workspacesvg_class.highlightblock_1_method

    const code = javascriptGenerator.workspaceToCode(workspace);
    setUserJavaScriptCode(code);
    workspace.addChangeListener(Events.disableOrphans);

    const currWorkspaceSave = serialization.workspaces.save(workspace);
    // setWorkspaceState(currWorkspaceSave);
    //TODO: Save workspace state to local storage and for saving the code as it's being written / to translate back to JS
    // Blockly.serialization.workspaces.load(state, myWorkspace);
  };

  const handleEditorModeChange = (checked: boolean) => {
    const goingToBlockMode = checked;

    if (goingToBlockMode) {
      //going to block mode
      // check to see if the code is valid
      //check to see if the code is the same as the saved block code
      // if it is, convert it to blocks
      //   console.log("this is the previous workspace state", workspaceState);
      //   console.log(workspaceState);
      // if it's not, show an error message and don't change the mode
    } else {
      //going to text mode
      //save the workspace state so it can be loaded back in
      const workspace = getMainWorkspace();
      const currWorkspaceSave = serialization.workspaces.save(workspace);
      setWorkspaceState(currWorkspaceSave);
    }

    setEditorMode(checked ? "block" : "text");
  };

  function karelEquality(
    karel1: SimpleKarelElementType,
    karel2: SimpleKarelElementType
  ) {
    let xs = Number(karel1.x) === Number(karel2.x);
    let ys = Number(karel1.y) === Number(karel2.y);
    let dirs = karel1.direction === karel2.direction;
    let beeperBag = Number(karel1.backpack) === Number(karel2.backpack);
    return xs && ys && dirs && beeperBag;
  }

  function beepersListEquality(
    beepers1: SimpleGridElementType[],
    beepers2: SimpleGridElementType[]
  ) {
    if (beepers1.length !== beepers2.length) {
      return false;
    }
    for (let i = 0; i < beepers1.length; i++) {
      if (
        Number(beepers1[i].x) !== Number(beepers2[i].x) ||
        Number(beepers1[i].y) !== Number(beepers2[i].y) ||
        Number(beepers1[i].count) !== Number(beepers2[i].count)
      ) {
        return false;
      }
    }
    return true;
  }

  const addSolvedPuzzle = useCallback(async () => {
    // add the puzzle to the user's solved puzzles
    if (!puzzleInfoFromDB?.id) return;
    if (!currentUserID) return;
    await addPuzzleToSolvedList(puzzleInfoFromDB?.id, currentUserID);
  }, [puzzleInfoFromDB?.id, currentUserID]);

  useEffect(() => {
    if (shouldCheckSolution) {
      const checkPuzzleSolution = () => {
        try {
          let karelsEqual = karelEquality(
            goalWorldInfo.karel,
            runningWorldInfo.karel
          );
          const goalWorldBeeperList = goalWorldInfo.gridElements.filter(
            (element) => element.type === "beeper"
          );
          const runningWorldBeeperList = runningWorldInfo.gridElements.filter(
            (element) => element.type === "beeper"
          );
          let beepersEqual = beepersListEquality(
            goalWorldBeeperList,
            runningWorldBeeperList
          );
          if (karelsEqual && beepersEqual) {
            if (currentUserID) {
              toast({
                variant: "success",
                title: "Puzzle Solved",
                description: "You have successfully solved the puzzle!",
                action: (
                  <ToastAction
                    className={`text-ring ${buttonVariants({ variant: "outline" })}`}
                    onClick={() => {
                      setOpenRatingDialog(true);
                    }}
                    altText="Rate the Puzzle"
                  >
                    Rate the Puzzle
                  </ToastAction>
                ),
              });

              addSolvedPuzzle();
            } else {
              toast({
                variant: "success",
                title: "Puzzle Solved",
                description: "You have successfully solved the puzzle!",
              });
            }
          } else {
            if (!karelsEqual) {
              toast({
                variant: "warning",
                title: "Puzzle Not Solved: Karel is not correctly placed",
                description:
                  "The karel at the end of your code is not the same as the Karel in the Goal World",
              });
            } else {
              toast({
                variant: "warning",
                title: "Puzzle Not Solved: Beepers are in the wrong place",
                description:
                  "The beepers at the end of your code are not the same as the beepers in the Goal World",
              });
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setShouldCheckSolution(false);
        }
      };
      checkPuzzleSolution();
    }
  }, [
    goalWorldInfo,
    runningWorldInfo,
    shouldCheckSolution,
    toast,
    addSolvedPuzzle,
    currentUserID,
  ]);

  return (
    <section className=" w-full flex-col items-center p-2">
      <section className="flex w-full justify-between gap-6 max-sm:flex-col">
        <div className="flex h-full flex-col gap-2 p-4">
          {puzzleName && (
            <h1 className="text-xl font-extrabold">{puzzleName}</h1>
          )}
          {puzzleInfoFromDB?.description && (
            <p>{puzzleInfoFromDB.description}</p>
          )}
          <div className="flex size-full flex-col">
            <RunnableWorld
              name={puzzleName}
              canvasSize={canvasSize}
              worldDimensions={worldDimensions}
              rawCode={userJavaScriptCode}
              worldInfo={startWorldInfo}
              images={puzzleImages}
              runningWorldInfo={runningWorldInfo}
              setRunningWorldInfo={setRunningWorldInfo}
              setShouldCheckSolution={setShouldCheckSolution}
            />
            <ViewableWorld
              name={puzzleName}
              canvasSize={canvasSize}
              worldDimensions={worldDimensions}
              // hints={puzzle.puzzleInfo?.hints}
              worldInfo={goalWorldInfo}
              images={puzzleImages}
              showGoalWorld={showGoalWorld}
              setShowGoalWorld={setShowGoalWorld}
            />
          </div>
        </div>
        <div className="flex min-h-96 w-full flex-col gap-4 p-2 max-sm:h-96">
          <div className="flex items-center justify-center gap-2">
            <Switch
              id="editor-mode"
              defaultChecked={editorMode === "block"}
              aria-labelledby="editor-mode-label"
              onCheckedChange={(checked) => handleEditorModeChange(checked)}
            />
            <Label
              id="editor-mode-label"
              htmlFor="editor-mode"
              className="capitalize"
            >{`${editorMode} Mode ${editorMode === "text" ? "(Read Only" : ""}`}</Label>
          </div>
          {editorMode === "block" && (
            <MyBlocklyWorkspace
              workspaceDidChange={workspaceDidChange}
              savedWorkspaceState={workspaceState}
            />
          )}
          {editorMode === "text" && (
            <MyAceEditor
              onAceChange={onAceChange}
              userJavaScriptCode={userJavaScriptCode}
            />
          )}
        </div>
      </section>
      <PuzzleRatingForm
        open={openRatingDialog}
        setOpen={setOpenRatingDialog}
        puzzleId={puzzleInfoFromDB?.id}
        currentUserID={currentUserID}
      />
    </section>
  );
};

export default Puzzle;
