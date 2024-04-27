'use client';
import {useState, useRef, useEffect, createContext } from 'react';

import { useSession } from 'next-auth/react';
import {useRouter, useParams} from 'next/navigation';


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

export const RunningWorldStateContext = createContext();

const Puzzle = () => {
    const { data: session, status } = useSession();
    const {id} = useParams();
    const [puzzle, setPuzzle] = useState({});
    const router = useRouter();

    const [userJavaScriptCode, setUserJavaScriptCode] = useState('');
    const [toolboxData, setToolboxData] = useState(null);

    const size = useWindowSize();
    const maxWorldWH = 25;
    const canvasSize = setCanvasSize(size);

    const [worldDimensions, setWorldDimensions] = useState(null);

    const [karelStart, setKarelStart] = useState(null);
    const [karelGoal, setKarelGoal] = useState(null);
    const [karelRunning, setKarelRunning] = useState(null);

    const [beeper, setBeeper] = useState({
        img: '',
    });

    const [startWorldBeeperList, setStartWorldBeeperList] = useState([]);
    const [goalWorldBeeperList, setGoalWorldBeeperList] = useState([]);

    const [runningWorldBeeperList, setRunningWorldBeeperList] = useState([]);

    const [shouldCheckSolution, setShouldCheckSolution] = useState(false);

    //getting the puzzle info from the backend
    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/');
        }
        else{
            //get the puzzle info from backend
            const fetchPuzzle = async () => {
                const response = await fetch(`/api/puzzle/${id}`);
                const data = await response.json();
                console.log(data);
                setPuzzle(data);
            };
            fetchPuzzle();  
        }
    }, [status]);

    //getting the toolbox data from data folder
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

    //updating state once puzzle data is fetched
    useEffect(() => {

        if(puzzle){
            //set the world dimensions
            setWorldDimensions(puzzle.puzzleInfo?.worldDimensions);

            //set the intial karel
            setKarelStart({
                ...puzzle.startWorldInfo?.karel,
                img: puzzle.spriteImages?.karel
            });

            //set the goal karel
            setKarelGoal({
                ...puzzle.goalWorldInfo?.karel,
                img: puzzle.spriteImages?.karel
            });

            //set the start world beeper list
            //turn into array of KarelElements
            let startBeepers = puzzle.startWorldInfo?.beepers;
            if(startBeepers !== undefined){
                startBeepers = startBeepers.map(beeper => {
                    return new KarelElement("beeper", beeper.x, beeper.y, beeper.count);
                });

                setStartWorldBeeperList(startBeepers);
            }
            //set the goal world beeper list
            let goalBeepers = puzzle.goalWorldInfo?.beepers;

            if(goalBeepers !== undefined){
                goalBeepers = goalBeepers.map(beeper => {
                    return new KarelElement("beeper", beeper.x, beeper.y, beeper.count);
                });
                setGoalWorldBeeperList(goalBeepers);
            
            }
            let beeperImg = puzzle.spriteImages?.beeper;
            if(beeperImg !== undefined){
                setBeeper({
                    img: puzzle.spriteImages?.beeper
                });
            }
            
        }


    }, [puzzle, puzzle.puzzleInfo, puzzle.startWorldInfo, puzzle.goalWorldInfo, puzzle.spriteImages, puzzle.spriteImages?.karel, puzzle.spriteImages?.beeper, puzzle.startWorldInfo?.beepers, puzzle.goalWorldInfo?.beepers]);

    useEffect(() => {
        if(shouldCheckSolution){
            checkPuzzleSolution();
        }
    }, [shouldCheckSolution]);

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

    function karelEquality(karel1, karel2){
        let xs = Number(karel1.x) === Number(karel2.x);
        let ys = Number(karel1.y) === Number(karel2.y);
        let dirs = karel1.direction === karel2.direction;
        let beeperBag = Number(karel1.beeperBag) === Number(karel2.beeperBag);
        return xs && ys && dirs && beeperBag;
    }

    function beepersListEquality(beepers1, beepers2){
        if(beepers1.length !== beepers2.length){
            return false;
        }
        for(let i = 0; i < beepers1.length; i++){
            if(Number(beepers1[i].x) !== Number(beepers2[i].x) || Number(beepers1[i].y) !== Number(beepers2[i].y) || Number(beepers1[i].count) !== Number(beepers2[i].count)){
                return false;
            }
        }
        return true;
    }

    function checkPuzzleSolution(){
        console.log('Checking Solution');
        try{
            console.log(karelGoal)
            console.log(goalWorldBeeperList);
            console.log("THE RUNNING WORLD")
            console.log(runningWorldBeeperList);
            console.log(karelRunning);
            let karelsEqual = karelEquality(karelGoal, karelRunning);
            let beepersEqual = beepersListEquality(goalWorldBeeperList, runningWorldBeeperList);

            if(karelsEqual && beepersEqual){
                alert('Puzzle Solved!');
            }
            else{
                if(!karelsEqual){
                    alert('Karels are not equal');
                }
                else{
                    alert('Beepers are not equal');
                }
            }


        }
        catch(error){
            console.error(error);
        }
        finally{
            setShouldCheckSolution(false);
        }

    }

    if(!puzzle || !toolboxData || !worldDimensions || !karelStart || !karelGoal || beeper.img === '' || !startWorldBeeperList || !goalWorldBeeperList || !karelStart.img || !karelGoal.img){
        return <div className='mt-12'>Loading...</div>
    }
    return (
        <section className="mt-12  w-full flex-center flex-col">
          <h1 className="main_heading text-center mb-4">{puzzle.puzzleInfo?.name}</h1>
          <p text-center>
            {puzzle.puzzleInfo?.description}
          </p>
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
            {/* <RunningWorldStateContext.Provider value={{setKarelRunning, setRunningWorldBeeperList }}> */}
                <RunnableWorld
                    name="Example Puzzle"
                    canvasSize={canvasSize}
                    worldDimensions={worldDimensions}
                    rawCode={userJavaScriptCode}
                    initialKarel={karelStart}
                    initialBeepersList={startWorldBeeperList}
                    initialBeeper={beeper}
                    maxWorldWH={maxWorldWH}
                    setKarelRunning={setKarelRunning}
                    setRunningWorldBeeperList={setRunningWorldBeeperList}
                    setShouldCheckSolution={setShouldCheckSolution}
                />
            {/* </RunningWorldStateContext.Provider> */}
            <p className='puzzle_instructions'>The puzzle should look like the world below:</p>
            <ViewableWorld 
              name="Example Puzzle"
              canvasSize={canvasSize}
              worldDimensions={worldDimensions}
              hints={"This is a hint"}
              initialKarel={karelGoal}
              initialBeepersList={goalWorldBeeperList}
              initialBeeper={beeper}
              maxWorldWH={maxWorldWH}
            />

          </div>

            </section>
 

        </section>
    )
}

export default Puzzle