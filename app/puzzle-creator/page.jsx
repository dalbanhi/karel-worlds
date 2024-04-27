'use client'
import {useState, createContext } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// import Form from '@components/Form';
import WorldsEditor from '@components/PuzzleCreatorPage/WorldsEditor/WorldsEditor';
import EditableWorld from '@components/PuzzleCreatorPage/EditableWorld/EditableWorld';

//TODO: Make this into a hook
// import { useWindowSize } from '../../hooks/useWindowSize'

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

export const SpriteImagesContext = createContext();
export const BasePuzzleInfoContext = createContext();

const PuzzleCreator = () => {

    const {data: session, status} = useSession();

    const router = useRouter();

    const size = useWindowSize();
    const maxWorldWH = 25;
    const canvasSize = setCanvasSize(size);


    const defaultKarelImg = "/assets/images/karel/karel.png";
    const defaultBeeperImg = "/assets/images/beeper/beeper.png";
    // const defaultWallPieceImg = "/assets/images/walls/wall-piece.png";
    // const defaultWallCornerImg = "/assets/images/walls/wall-corner.png";

    const [basePuzzleInfo, setBasePuzzleInfo] = useState({
        name: '',
        description: '',
        worldDimensions: {
            width: 10,
            height: 10
        },
        hints:['', '', '']
    })

    const [spriteImages, setSpriteImages] = useState({
        defaultKarel: defaultKarelImg,
        karel: defaultKarelImg,
        defaultBeeper: defaultBeeperImg,
        beeper: defaultBeeperImg,
        // defaultWallPiece: defaultWallPieceImg,
        // wallPiece: defaultWallPieceImg,
        // defaultWallCorner: defaultWallCornerImg,
        // wallCorner: defaultWallCornerImg,
    });

    const [startWorldInfo, setStartWorldInfo] = useState({
        karel: {},
        beepers: []
    });

    const [goalWorldInfo, setGoalWorldInfo] = useState({
        karel: {},
        beepers: []
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        //check if user is authenticatedq
        if(status !== 'authenticated'){
            alert('You must be logged in to create a puzzle');
            return;
        }
        
        e.preventDefault();
        setSubmitting(true);
        //here I will save information about the images and the world dimensions (and hints) to the database


        try{
            //don't save the default images
            const customImages = {
                karel: spriteImages.karel,
                beeper: spriteImages.beeper,
            }
            const startWorldInfoNoImages = {
                ...startWorldInfo,
                karel:{
                    ...startWorldInfo.karel,
                    img: ''
                }
            };


            //don' save the karel images in the world to avoid redundancy
            const goalWorldInfoNoImages = {
                ...goalWorldInfo,
                karel:{
                    ...goalWorldInfo.karel,
                    img: ''
                }
            };
            const response = await fetch('/api/puzzle/new',{
                method: 'POST',
                body: JSON.stringify({
                    userId: session.user.id,
                    puzzleInfo: basePuzzleInfo,
                    spriteImages: customImages,
                    startWorldInfo: startWorldInfoNoImages,
                    goalWorldInfo: goalWorldInfoNoImages,
                }),

            });
            if(response.ok){
                router.push('/puzzles');
            }
            const data = await response.json();
        }
        catch(error){
            console.error('Error creating PUZZLE:', error);
        }
        finally{
            setSubmitting(false);
        }

    };

    return (
        <SpriteImagesContext.Provider value={[spriteImages, setSpriteImages]}>
            <BasePuzzleInfoContext.Provider value={[basePuzzleInfo, setBasePuzzleInfo]}>
                <section className="mt-12  w-full flex-center flex-col">
                    <h1 className="main_heading text-center">Puzzle Creator</h1>
                    {/* <p>{size.width}px / {size.height}px</p> */}
                    <section className="sm:hidden flex justify-center">
                        Puzzle Editing only available on Desktop    
                    </section>
                    <WorldsEditor 
                            handleSubmit={handleSubmit}
                            maxWorldWH={maxWorldWH}
                            submitting={submitting}
                    />
                    <section className="hidden sm:flex justify-evenly gap-4 my-4">
                        
                        <EditableWorld
                            name="Starting World"
                            canvasSize={canvasSize}
                            maxWorldWH={maxWorldWH}
                            worldInfo={startWorldInfo}
                            onWorldInfoChange={setStartWorldInfo}
                        />
                        <EditableWorld
                            name="Goal World"
                            canvasSize={canvasSize}
                            maxWorldWH={maxWorldWH}
                            worldInfo={goalWorldInfo}
                            onWorldInfoChange={setGoalWorldInfo}
                        />    
                    </section>
                </section>
            </BasePuzzleInfoContext.Provider>
        </SpriteImagesContext.Provider>
    )
}

export default PuzzleCreator;