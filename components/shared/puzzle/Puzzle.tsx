"use client";

import React, { useState, useEffect } from "react";
import { serialization, WorkspaceSvg, Events, getMainWorkspace } from "blockly";
import "@/utils/custom/blocks/CustomBlocks";
import { javascriptGenerator } from "blockly/javascript";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MyBlocklyWorkspace from "./MyBlocklyWorkspace";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
const languages = ["javascript"];
const themes = ["textmate"];

import "ace-builds/src-noconflict/ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const Puzzle = () => {
  const [userJavaScriptCode, setUserJavaScriptCode] = useState("");
  const [workspaceState, setWorkspaceState] = useState({});

  const [editorMode, setEditorMode] = useState("block");

  // State to track when the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  return (
    <section
      suppressHydrationWarning
      className=" w-full flex-col items-center p-4"
    >
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
          {hasMounted && editorMode === "text" && (
            <AceEditor
              mode="javascript"
              theme="textmate"
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
          )}
        </div>
      </section>
    </section>
  );
};

export default Puzzle;
