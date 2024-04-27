import React from 'react'

const PuzzleCard = ({puzzle, handleClick}) => {
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
                    </div>
                    <div className='w-1/2 flex'>
                        <figure className=' flex flex-col justify-start items-center'>
                            <figcaption className='font-bold'>Karel</figcaption>
                            <img src={puzzle.spriteImages.karel} alt="Karel in this puzzle" className='puzzle_card_image'/>
                    
                        </figure>
                        <figure className=' flex flex-col justify-start items-center'>
                            <figcaption className='font-bold'>Beepers</figcaption>
                            <img src={puzzle.spriteImages.beeper} alt="Beepers in this puzzle" className='puzzle_card_image'/>
                        </figure>
                    </div>
                </div>
                <div className='pt-2 flex justify-center items-center'>
                    <button 
                        className='puzzle_card_button'
                        onClick={() => handleClick(puzzle)}
                    >
                        Solve Puzzle
                    </button>
                </div>
                

            </div>
            
        </>
        
    )
}

export default PuzzleCard