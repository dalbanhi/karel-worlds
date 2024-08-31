"use client";
import React, { useState } from "react";
import { serialization, WorkspaceSvg, Events, getMainWorkspace } from "blockly";
import "@/utils/custom/blocks/CustomBlocks";
import { javascriptGenerator } from "blockly/javascript";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MyBlocklyWorkspace from "./MyBlocklyWorkspace";

const Puzzle = () => {
  const [userJavaScriptCode, setUserJavaScriptCode] = useState("");
  const [workspaceState, setWorkspaceState] = useState({});

  const [editorMode, setEditorMode] = useState("block");

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

  return (
    <section className=" w-full flex-col items-center p-4">
      <h2 className="mb-4 text-center">Example Puzzle</h2>
      <section className="flex w-full justify-between gap-6 border">
        <div className="flex min-h-96 w-7/12 flex-col gap-4  border border-blue-500 p-2">
          <div className="flex items-center justify-center gap-2">
            <Switch
              id="editor-mode"
              defaultChecked={editorMode === "block"}
              onCheckedChange={(checked) => {
                const goingToBlockMode = checked;

                if (goingToBlockMode) {
                  console.log("going to block mode");
                  //going to block mode
                  // check to see if the code is valid
                  //check to see if the code is the same as the saved block code
                  // if it is, convert it to blocks
                  // if it's not, show an error message and don't change the mode
                } else {
                  //going to text mode
                  //save the workspace state so it can be loaded back in
                  const workspace = getMainWorkspace();
                  const currWorkspaceSave =
                    serialization.workspaces.save(workspace);
                  setWorkspaceState(currWorkspaceSave);
                }

                setEditorMode(checked ? "block" : "text");
              }}
            />
            <Label
              htmlFor="editor-mode"
              className="capitalize"
            >{`${editorMode} Mode`}</Label>
          </div>
          {editorMode === "block" && (
            <MyBlocklyWorkspace
              workspaceDidChange={workspaceDidChange}
              savedWorkspaceState={workspaceState}
            />
          )}
          {/* {editorMode === "text" && (
            <AceEditor
              mode="javascript"
              theme="github"
              name="userJavaScriptCodeOnAce"
              width="100%"
              height="100%"
              onChange={(value) => onAceChange(value)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              readOnly={true}
              value={userJavaScriptCode}
              enableLiveAutocompletion={true}
              enableBasicAutocompletion={true}
              enableSnippets={true}
              setOptions={{
                showLineNumbers: true,
                tabSize: 5,
              }}
            />
          )} */}
        </div>
      </section>
    </section>
  );
};

export default Puzzle;
