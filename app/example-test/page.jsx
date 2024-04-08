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
            name: "Karel Actions",
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
            name: "Karel Logic",
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
          }
        ],
      };

    
    function workspaceDidChange(workspace) {
        // console.log(workspace);
        //TODO: Fix block highlighting
        // function highlightBlock(id) {
        //     workspace.highlightBlock(id);
        //   }
          
        // javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        // javascriptGenerator.addReservedWords('highlightBlock');

        const code = javascriptGenerator.workspaceToCode(workspace);
        setUserJavaScriptCode(code);

        const workSpaceState = Blockly.serialization.workspaces.save(workspace);
        // console.log(workSpaceState);
        // Blockly.serialization.workspaces.load(state, myWorkspace);

    }

    function onAceChange(value){
        console.log(value);
    }

    return (
        <section className="mt-12  w-full flex-center flex-col">
            <h1 className="main_heading text-center">Example Test</h1>
            <section className="sm:hidden flex justify-center">
                Puzzle Editing only available on Desktop    
            </section>
            <section className="hidden sm:flex justify-between gap-4">
                <BlocklyWorkspace 
                    toolboxConfiguration={toolboxCategories}
                    onWorkspaceChange={workspaceDidChange}
                    className="w-1/3 h-96 border-2 border-gray-300"
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
                <AceEditor 
                    mode="javascript"
                    theme="github"
                    name="userJavaScriptCodeonAce"
                    onChange={(value) => onAceChange(value)}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={userJavaScriptCode}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 5,
                    }}

                />
                <RunnableWorld
                    name="Example Puzzle"
                    canvasSize={{width: 300, height: 300}}
                    interactableName="Ball"
                    worldDimensions={{width: 10, height: 10}}
                    rawCode={userJavaScriptCode}
                />  
            </section>

        </section>
    )
}

export default ExampleTest;