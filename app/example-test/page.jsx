'use client'
import {useState } from 'react';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import {useRouter } from 'next/navigation';

import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly';
import '@utils/custom-blocks/CustomBlocks';
import { javascriptGenerator } from 'blockly/javascript';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import RunnableWorld from '@components/RunnableWorld';


const ExampleTest = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const [xml, setXml] = useState("");
    const [userJavaScriptCode, setUserJavaScriptCode] = useState('');

    const initialXml = `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>`;

    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Logic",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
            ],
          },
          {
            kind: "category",
            name: "Actions",
            colour: "#000000",
            contents: [
              {
                kind: "block",
                type: "move_forward",
              },
            //   {
            //     kind: "block",
            //     type: "turn_right",
            //   },
            ],
          },
        ],
      };

    
    function workspaceDidChange(workspace) {
        console.log(workspace);
        const code = javascriptGenerator.workspaceToCode(workspace);
        console.log(code);
        setUserJavaScriptCode(code);
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
                        grid: {
                            spacing: 20,
                            length: 3,
                            colour: '#ccc',
                            snap: true,
                        },
                    }}
                />
                <AceEditor 
                    mode="javascript"
                    theme="monokai"
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