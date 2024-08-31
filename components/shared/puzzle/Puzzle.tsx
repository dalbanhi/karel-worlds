"use client";
import React, { useEffect, useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {
  serialization,
  WorkspaceSvg,
  getMainWorkspace,
  BlockSvg,
  Events,
} from "blockly";
import "@/utils/custom/blocks/CustomBlocks";
import { javascriptGenerator } from "blockly/javascript";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CustomTheme from "@/utils/custom/blocks/CustomTheme";

const Puzzle = () => {
  const [toolboxData, setToolboxData] = useState(null);
  const [userJavaScriptCode, setUserJavaScriptCode] = useState("");

  const [editorMode, setEditorMode] = useState("block");

  //getting the toolbox data from data folder
  useEffect(() => {
    const fetchToolboxData = async () => {
      try {
        const response = await fetch("/data/toolbox-data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch toolbox data");
        }
        const data = await response.json();
        setToolboxData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchToolboxData();
  }, []);

  function workspaceDidChange(workspace: WorkspaceSvg) {
    //TODO: Add block highlighting
    // javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    // javascriptGenerator.addReservedWords('highlightBlock');
    //https://developers.google.com/blockly/reference/js/blockly.workspacesvg_class.highlightblock_1_method

    const code = javascriptGenerator.workspaceToCode(workspace);
    setUserJavaScriptCode(code);
    workspace.addChangeListener(Events.disableOrphans);

    const workSpaceState = serialization.workspaces.save(workspace);
    //TODO: Save workspace state to local storage and for saving the code as it's being written / to translate back to JS
    // Blockly.serialization.workspaces.load(state, myWorkspace);
  }

  useEffect(() => {
    const workspace = getMainWorkspace();
    console.log("workspace", workspace);
    if (workspace) {
      const startBlock = workspace.newBlock("starting_point") as BlockSvg;
      startBlock.initSvg();
      startBlock.render();
      // Lock the starting block position
      startBlock.setMovable(false);
      startBlock.setDeletable(false);
      console.log("Start block added");
      const moveBlock = workspace.newBlock("move_forward") as BlockSvg;
      moveBlock.initSvg();
      moveBlock.render();
      moveBlock.previousConnection.connect(startBlock.nextConnection);
    }
  }, [toolboxData]);
  return (
    <section className=" w-full flex-col items-center p-4">
      <h2 className="mb-4 text-center">Example Puzzle</h2>
      <section className="flex w-full justify-between gap-6 border">
        <div className="flex min-h-96 w-7/12 flex-col gap-4  p-2">
          <div className="flex items-center justify-center gap-2 ">
            <Switch
              id="editor-mode"
              defaultChecked={editorMode === "block"}
              onCheckedChange={(checked) => {
                setEditorMode(checked ? "block" : "text");
              }}
            />
            <Label
              htmlFor="editor-mode"
              className="capitalize"
            >{`${editorMode} Mode`}</Label>
          </div>
          {toolboxData && (
            <BlocklyWorkspace
              toolboxConfiguration={toolboxData}
              onWorkspaceChange={workspaceDidChange}
              className="size-full"
              workspaceConfiguration={{
                collapse: false,
                comments: false,
                disable: false,
                maxBlocks: Infinity,
                trashcan: true,
                horizontalLayout: false,
                toolboxPosition: "start",
                theme: CustomTheme,
                css: true,
                rtl: false,
                scrollbars: true,
                sounds: true,
                oneBasedIndex: false,
                grid: {
                  spacing: 20,
                  length: 3,
                  colour: "#1f2141",
                  snap: true,
                },
              }}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default Puzzle;
