'use client'
import {useState, useRef, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';

import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly';
import '@utils/custom-blocks/CustomBlocks';
import { javascriptGenerator } from 'blockly/javascript';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
const languages = ["javascript"];
const themes = ["github"];

import "ace-builds/src-noconflict/ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";


languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
  });
  
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));


import RunnableWorld from '@components/RunnableWorld';

const ExampleTest = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const [userJavaScriptCode, setUserJavaScriptCode] = useState('');

    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Logic",
            colour: "#5b80a5",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
              {
                kind: "block",
                type: "logic_operation",

              },
              {
                kind: "block",
                type: "logic_negate",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
            ],
          },
          {
            kind: "category",
            name: " Math & Numbers",
            colour: "#5b67a5",
            contents: [
              {
                kind: "block",
                type: "math_number",
              },
            ],
          },
          {
            kind: "category",
            name: "Loops",
            colour: "#5ba55b",
            contents: [
              {
                kind: "block",
                type: "controls_repeat_ext",
              },
              {
                kind: "block",
                type: "controls_whileUntil",
              },
              {
                kind: "block",
                type: "controls_for",
              },
            ],
          },
          {
            kind: "category",
            name: "Movement Actions",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "move_forward",
              },
              {
                kind: "block",
                type: "turn_left",
              },
            ],
          },
          {
            kind: "category",
            name: "Beeper Actions",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "put_beeper",
              },
              {
                kind: "block",
                type: "take_beeper",
              },
            ],
          },
          {
            kind: "category",
            name: "Direction Logic",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "is_facing_north",
              },
              {
                kind: "block",
                type: "is_facing_south",
              },
              {
                kind: "block",
                type: "is_facing_east",
              },
              {
                kind: "block",
                type: "is_facing_west",
              },
              {
                kind: "block",
                type: "is_not_facing_north",
              },
              {
                kind: "block",
                type: "is_not_facing_south",
              },
              {
                kind: "block",
                type: "is_not_facing_east",
              },
              {
                kind: "block",
                type: "is_not_facing_west",
              },
            ],
          },
          {
            kind: "category",
            name: "Clear/Blocked Logic",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "front_is_clear",
              },
              {
                kind: "block",
                type: "front_is_blocked",
              },
              {
                kind: "block",
                type: "left_is_clear",
              },
              {
                kind: "block",
                type: "left_is_blocked",
              },
              {
                kind: "block",
                type: "right_is_clear",
              },
              {
                kind: "block",
                type: "right_is_blocked",
              },
            ],
          },
          {
            kind: "category",
            name: "Beeper Logic",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "beepers_present",
              },
              {
                kind: "block",
                type: "no_beepers_present",
              },
            ],
          }
        ],
      };

    
    function workspaceDidChange(workspace) {
      //TODO: Add block highlighting
      // javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      // javascriptGenerator.addReservedWords('highlightBlock');
      //https://developers.google.com/blockly/reference/js/blockly.workspacesvg_class.highlightblock_1_method

      const code = javascriptGenerator.workspaceToCode(workspace);
      setUserJavaScriptCode(code);

      const workSpaceState = Blockly.serialization.workspaces.save(workspace);
      //TODO: Save workspace state to local storage and for saving the code as it's being written / to translate back to JS
      // Blockly.serialization.workspaces.load(state, myWorkspace);

    }

    function onAceChange(value){
        // console.log(value);
    }

    return (
        <section className="mt-12  w-full flex-center flex-col">
            <h1 className="main_heading text-center mb-4">Example Test</h1>
            <section className="sm:hidden flex justify-center">
                Puzzle Editing only available on Desktop    
            </section>
            <section className="flex justify-between gap-6">
              <div className='flex w-3/4 h-full border-4 border-blue-500'>
              <BlocklyWorkspace 
                    toolboxConfiguration={toolboxCategories}
                    onWorkspaceChange={workspaceDidChange}
                    className="w-1/2 h-dvh border-2 border-gray-300"
                    workspaceConfiguration={{
                        collapse: true,
                        comments: false,
                        disable: false,
                        maxBlocks: Infinity,
                        trashcan: true,
                        horizontalLayout: false,
                        toolboxPosition: 'start',
                        css: true,
                        media: 'https://blockly-demo.appspot.com/static/media/',
                        rtl: false,
                        scrollbars: true,
                        sounds: true,
                        oneBasedIndex: false,
                        grid: {
                            spacing: 20,
                            length: 3,
                            colour: '#888',
                            snap: true,
                        },
                    }}
                />
                <div className='w-1/2 h-svh border-2 border-gray-300'>
                  <AceEditor 
                      mode="javascript"
                      theme="github"
                      name="userJavaScriptCodeOnAce"
                      width='100%'
                      height='100%'
                      onChange={(value) => onAceChange(value)}
                      fontSize={14}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      readOnly={true}
                      value={userJavaScriptCode}
                      setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                          showLineNumbers: true,
                          tabSize: 5,
                      }}

                  />
                </div>
              </div>
              <RunnableWorld
                  name="Example Puzzle"
                  canvasSize={{width: 300, height: 300}} //fix canvas size
                  interactableName="Ball"
                  worldDimensions={{width: 10, height: 10}} //get world dimensions from puzzle
                  rawCode={userJavaScriptCode}
              /> 
            </section>
 

        </section>
    )
}

export default ExampleTest;