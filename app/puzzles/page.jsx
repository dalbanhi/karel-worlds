'use client';
import React from 'react'
import { useState, createContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

//subcomponents

import PuzzleCardList from '@components/Puzzles/PuzzleCardList';

const Puzzles = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();
    const [puzzles, setPuzzles] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {

            const fetchPuzzles = async () => {
                const res = await fetch('/api/puzzle');
                const data = await res.json();
                setPuzzles(data);
            }
            fetchPuzzles();
        }
        else{
            router.push('/');
        }
    }, [status]);

    const handlePuzzleClick = (puzzle) => {
        //check if the user is the creator of the puzzle
        if (user.id === puzzle.creator._id) {
            alert("Editing puzzles will be available soon!")
            // router.push(`/puzzle-creator/${puzzle.id}`);
        }
        else {
            const id = puzzle._id;
            router.push(`/puzzle/${id}`);
        }
    }

    return (
        <section className="mt-12  w-full flex-center flex-col">
            <h1 className="main_heading text-center">All Puzzles</h1>
            <section className="sm:hidden flex justify-center">
                KarelWorlds currently only supports puzzle editing on Desktop   
            </section>
            <section className="hidden sm:flex justify-evenly gap-4 my-4">
                  <PuzzleCardList 
                    puzzles={puzzles} 
                    handlePuzzleClick={handlePuzzleClick}/>
            </section>
        </section>
    )
}

export default Puzzles