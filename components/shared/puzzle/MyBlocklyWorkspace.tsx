"use client";
import React, { useEffect } from "react";
import { BlocklyWorkspace } from "react-blockly";
import CustomTheme from "@/utils/custom/blocks/CustomTheme";
import { getMainWorkspace, BlockSvg, serialization } from "blockly";
import toolboxData from "@/public/data/toolbox-data.json";

interface MyBlocklyWorkspaceProps {
  workspaceDidChange: any;
  savedWorkspaceState?: any;
}

function isEmpty(obj: any) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const MyBlocklyWorkspace: React.FC<MyBlocklyWorkspaceProps> = ({
  workspaceDidChange,
  savedWorkspaceState,
}) => {
  useEffect(() => {
    const workspace = getMainWorkspace();
    //check if the workspace is empty
    //if it is, add the starting block
    if (workspace) {
      // check if there is a saved workspace state
      // if there is, load it in
      if (!isEmpty(savedWorkspaceState)) {
        serialization.workspaces.load(savedWorkspaceState, workspace);
      } else {
        // if there isn't, add the starting block
        const startBlock = workspace.newBlock("starting_point") as BlockSvg;
        startBlock.initSvg();
        startBlock.render();
        // Lock the starting block position
        startBlock.setMovable(false);
        startBlock.setDeletable(false);
        const moveBlock = workspace.newBlock("move_forward") as BlockSvg;
        moveBlock.initSvg();
        moveBlock.render();
        moveBlock.previousConnection.connect(startBlock.nextConnection);
      }
    }
  }, [savedWorkspaceState]);

  return (
    <React.Fragment>
      {toolboxData && (
        <BlocklyWorkspace
          toolboxConfiguration={toolboxData}
          onWorkspaceChange={workspaceDidChange}
          className="size-full"
          workspaceConfiguration={{
            collapse: true,
            comments: false,
            disable: false,
            maxBlocks: Infinity,
            trashcan: true,
            horizontalLayout: true,
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
    </React.Fragment>
  );
};

export default MyBlocklyWorkspace;
