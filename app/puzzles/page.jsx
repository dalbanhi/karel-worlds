'use client';
import React from 'react'
import { useState, createContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

//subcomponents

import PuzzleCardList from '@components/Puzzles/PuzzleCardList';

const Puzzles = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [puzzles, setPuzzles] = useState([]);

    useEffect(() => {
        console.log(status);
        if (status === 'authenticated') {

            const fetchPuzzles = async () => {
                const res = await fetch('/api/puzzle');
                const data = await res.json();
                setPuzzles(data);
            }
            fetchPuzzles();
        }
    }, [status]);

    const handlePuzzleClick = (id) => {
        console.log(id);
    }

    return (
        <section className="mt-12  w-full flex-center flex-col">
            <h1 className="main_heading text-center">All Puzzles</h1>
            <section className="sm:hidden flex justify-center">
                KarelWorlds currently only supports puzzle editing on Desktop   
            </section>
            <section className="hidden sm:flex justify-evenly gap-4 my-4">
                {console.log(puzzles)}
                  <PuzzleCardList 
                    puzzles={puzzles} 
                    handlePuzzleClick={handlePuzzleClick}/>
            </section>
        </section>
    )
}

export default Puzzles