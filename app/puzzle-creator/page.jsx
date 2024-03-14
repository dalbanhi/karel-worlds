'use client'
import {useState } from 'react';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import {useRouter } from 'next/navigation';

// import Form from '@components/Form';
import WorldsEditor from '@components/WorldsEditor';
import EditableWorld from '@components/EditableWorld';
// import {NextReactP5Wrapper} from '@p5-wrapper/next';





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


const PuzzleCreator = () => {

    const {data: session} = useSession();

    const router = useRouter();

    const size = useWindowSize();
    const canvasSize = setCanvasSize(size);
    const [worldDimensions, setWorldDimensions] = useState({
        width: 10,
        height: 10
    })

    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log('submit');
    };


    return (
        <section className="mt-12  w-full flex-center flex-col">
            <h1 className="main_heading text-center">Puzzle Creator</h1>
            <p>{size.width}px / {size.height}px</p>
            <section className="sm:hidden flex justify-center">
                Puzzle Editing only available on Desktop
                
            </section>
            <section className="hidden sm:flex justify-between gap-4">
                <WorldsEditor 
                    handleSubmit={handleSubmit}
                    worldDimensions={worldDimensions}
                    setWorldDimensions={setWorldDimensions}
                />
                <EditableWorld
                    name="Start World"
                    canvasSize={canvasSize}
                    interactableName="Ball"
                    worldDimensions={worldDimensions}
                />
                <EditableWorld
                    name="End World"
                    canvasSize={canvasSize}
                    interactableName="Ball"
                    worldDimensions={worldDimensions}
                />
                
            </section>
            <section>
                There is an end here.
            </section>

            
        </section>
    )
}

export default PuzzleCreator;