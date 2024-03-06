'use client';
import Link from 'next/link';
import Image from 'next/image';

import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';


const Nav = () => {
    const isUserLoggedin = true;
  return (
    <nav className=' nav_bar flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/karelWorldsLogo.jpg" 
                alt="KarelLogo" 
                width={50} 
                height={50}
                className=' object-contain rounded-full' 
            />
            <p className='logo_text'>KarelWorlds</p>
        </Link>
        <div className="sm:flex hidden">
            {isUserLoggedin ? (
                <div className='flex gap-3 md_gap-5'>
                    <Link 
                        href="/puzzles" 
                        className='nav_link'>
                            Puzzles
                    </Link>
                </div>
            ) : (
                <>
                </>
            )}

        </div>
    </nav>
  )
}

export default Nav;