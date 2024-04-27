'use client'
import React from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react'; 

const PuzzleCard = ({puzzle, handlePuzzleClick}) => {
    const { data: session, status } = useSession();

    const isAuthenticated = status === 'authenticated';
    const isUser = isAuthenticated && session.user.id === puzzle.creator._id;

    return (
        <>
            <div 
                className='puzzle_card glassy'
            >
                <div className='flex'>
                    <div className="w-1/2 flex flex-col">
                        <h2><span className='puzzle_card_title blue_purple_gradient'>Title: </span> {puzzle.puzzleInfo.name}</h2>
                        <p><span className='puzzle_card_title blue_purple_gradient'>Description: </span><span className='puzzle_card_description'>{puzzle.puzzleInfo.description}</span></p>
                        <p><span className='puzzle_card_title blue_purple_gradient'>World Dimensions: </span><span className='puzzle_card_description'>{puzzle.puzzleInfo.worldDimensions.width}x{puzzle.puzzleInfo.worldDimensions.height}</span></p>
                        <p><span className='puzzle_card_title blue_purple_gradient'>Creator: </span><span className='puzzle_card_description'>{isUser ? `You`: puzzle.creator.username}</span></p>
                    </div>
                    <div className='w-1/2 flex'>
                        <figure className='px-3 flex flex-col justify-start items-center'>
                            <figcaption className='font-bold'>Karel</figcaption>
                            <Image
                                src={puzzle.spriteImages.karel}
                                alt="Karel in this puzzle"
                                width={150}
                                height={200}
                            />
                    
                        </figure>
                        <figure className='px-3 flex flex-col justify-start items-center'>
                            <figcaption className='font-bold'>Beepers</figcaption>
                            <Image
                                src={puzzle.spriteImages.beeper}
                                alt="Beepers in this puzzle"
                                width={150}
                                height={200}
                            />   
                        </figure>
                    </div>
                </div>
                <div className='pt-2 flex justify-center items-center'>
                    <button 
                        className='puzzle_card_button'
                        onClick={() => handlePuzzleClick(puzzle)}
                    >
                        {isAuthenticated ? (
                            isUser ? `Edit Puzzle` : `Solve Puzzle`
                        ): `Sign in to Solve`}
                    </button>
                </div>
                

            </div>
            
        </>
        
    )
}

export default PuzzleCard