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

import RunnableWorld from '@components/PuzzleSolverPage/RunnableWorld';
import ViewableWorld from '@components/PuzzleSolverPage/ViewableWorld';
import KarelElement from '@utils/karel-elements/KarelElement';


languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
  });
  
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
  });

  useEffect(() => {
      function handleResize() {
          setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
          });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function setCanvasSize(windowSize){

  let canvasSize = {
      width: windowSize.width,
      height: windowSize.height
  };

  if(windowSize.width >= 1536){
      canvasSize.width = 500;
      canvasSize.height = 500;
  } else if(windowSize.width >= 1280){
      canvasSize.width = 450;
      canvasSize.height = 450;
  } else if(windowSize.width >= 1024){
      canvasSize.width = 400;
      canvasSize.height = 400;
  } else if(windowSize.width >= 768){
      canvasSize.width = 350;
      canvasSize.height = 350;
  } else if (windowSize.width >= 640){
      canvasSize.width = 300;
      canvasSize.height = 300;
  }
  return canvasSize;
}






const ExampleTest = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const [userJavaScriptCode, setUserJavaScriptCode] = useState('');
    const [toolboxData, setToolboxData] = useState(null);


    const size = useWindowSize();
    const maxWorldWH = 25;
    const canvasSize = setCanvasSize(size);

    const [worldDimensions, setWorldDimensions] = useState({
      width: 10,
      height: 10
    });

    //the same for both:
    const karelImg = "/assets/images/karel/karel.png";
    const beeper = {
      img: "/assets/images/beeper/beeper.png"
    }

    //the goal world is the world that the user is trying to achieve

    const tempInitialKarelGoalWorld = {
      x: 0,
      y: 4,
      direction: "west",
      beeperBag: 1000,
      img: karelImg
    }

    const tempInitialBeepersListGoalWorld = []

    //the runnable world is the world that the user's code will be run on
    const tempInitialKarelStartWorld = {
      x: 0,
      y: 0,
      direction: "east",
      beeperBag: 1000,
      img: karelImg
    }

    const tempInitialBeepersListStartWorld = [
        new KarelElement("beeper", 1, 1),
        new KarelElement("beeper", 2, 2, 4),
    ]


    useEffect(() => {
      const fetchToolboxData = async () => {
        try{
          const response = await fetch('/data/toolbox-data.json');
          if(!response.ok){
            throw new Error('Failed to fetch toolbox data');
          }
          const data = await response.json();
          setToolboxData(data);
        }
        catch(error){
          console.error(error);
        }
      };
      fetchToolboxData();     
    }, []);
    
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
        //TODO: Handle Ace Editor changes when user writes code. Check syntax and conversion to blocks
    }

    return (
        <section className="mt-12  w-full flex-center flex-col">
          <h1 className="main_heading text-center mb-4">Example Test</h1>
          <section className="sm:hidden flex justify-center">
            Puzzle Editing only available on Desktop    
          </section>
          <section className="flex justify-between gap-6">
          <div className='flex w-3/4 h-fot border-4 border-blue-500'>
            {toolboxData &&
            <BlocklyWorkspace 
              toolboxConfiguration={toolboxData}
              onWorkspaceChange={workspaceDidChange}
              className="w-1/2 h-full border-2 border-gray-300"
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
            />}
            <div className='w-1/2 h-full border-2 border-gray-300'>
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
          <div className='flex flex-col'>
            <h3 className='form_header blue_purple_gradient'>Solve the Puzzle...</h3>
            <h5 className='puzzle_instructions'>Drag & Drop the blocks on the left to write code and test it out below to attempt to solve the puzzle. Notice how you're actually writing real code!</h5>
            <RunnableWorld
              name="Example Puzzle"
              canvasSize={canvasSize}
              worldDimensions={worldDimensions}
              rawCode={userJavaScriptCode}
              initialKarel={tempInitialKarelStartWorld}
              initialBeepersList={tempInitialBeepersListStartWorld}
              initialBeeper={beeper}
              maxWorldWH={maxWorldWH}
            />
            <p className='puzzle_instructions'>The puzzle should look like the world below:</p>
            <ViewableWorld 
              name="Example Puzzle"
              canvasSize={canvasSize}
              worldDimensions={worldDimensions}
              hints={"This is a hint"}
              initialKarel={tempInitialKarelGoalWorld}
              initialBeepersList={tempInitialBeepersListGoalWorld}
              initialBeeper={beeper}
              maxWorldWH={maxWorldWH}
            />

          </div>

            </section>
 

        </section>
    )
}

export default ExampleTest;