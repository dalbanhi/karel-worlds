import React from 'react'
import PuzzleCard from '@components/Puzzles/PuzzleCard';

const PuzzleCardList = ({puzzles, handlePuzzleClick}) => {
    return (
        <div className='w-5/6 mt-16 puzzles_layout flex flex-row flex-wrap'>
            {puzzles.map((puzzle, index) => {
                return (
                    <PuzzleCard 
                        key={index} 
                        puzzle={puzzle} 
                        handlePuzzleClick={handlePuzzleClick}/>
                )
            })}
        </div>
    )
}

export default PuzzleCardList