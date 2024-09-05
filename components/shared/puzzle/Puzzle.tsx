"use client";

import React, { useState, useEffect } from "react";
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
import { worldInfoType, puzzleImagesType } from "@/types/karelWorld";

interface PuzzleProps {
  worldDimensions: { width: number; height: number };
  startWorldInfo: worldInfoType;
  goalWorldInfo: worldInfoType;
  puzzleImages: puzzleImagesType;
}

const Puzzle: React.FC<PuzzleProps> = ({
  worldDimensions,
  startWorldInfo,
  goalWorldInfo,
  puzzleImages,
}) => {
  const canvasSize = useCanvasSize();
  const [userJavaScriptCode, setUserJavaScriptCode] = useState("");
  const [workspaceState, setWorkspaceState] = useState({});
  const [karelRunning, setKarelRunning] = useState(false);

  const [editorMode, setEditorMode] = useState("block");

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
      //   console.log("going to block mode");
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

  return (
    <section
      suppressHydrationWarning
      className=" w-full flex-col items-center p-4"
    >
      <section className="flex w-full justify-between gap-6 border">
        <div className="flex flex-col gap-2 p-4">
          <RunnableWorld
            name={"Example Puzzle"}
            canvasSize={canvasSize}
            worldDimensions={worldDimensions}
            rawCode={userJavaScriptCode}
            worldInfo={startWorldInfo}
            images={puzzleImages}
            // setKarelRunning={setKarelRunning}
            // setRunningWorldBeeperList={setRunningWorldBeeperList}
            // setShouldCheckSolution={setShouldCheckSolution}
          />
          <p className="">
            The puzzle should look like the world below (click the arrow to
            expand).
          </p>
          <ViewableWorld
            name={"Example Puzzle"}
            canvasSize={canvasSize}
            worldDimensions={worldDimensions}
            // hints={puzzle.puzzleInfo?.hints}
            worldInfo={goalWorldInfo}
            images={puzzleImages}
          />
        </div>
        <div className="flex min-h-96 w-full flex-col gap-4  border border-blue-500 p-2">
          <div className="flex items-center justify-center gap-2">
            <Switch
              id="editor-mode"
              defaultChecked={editorMode === "block"}
              onCheckedChange={(checked) => handleEditorModeChange(checked)}
            />
            <Label
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
    </section>
  );
};

export default Puzzle;
