'use client';
import Link from 'next/link';
import Image from 'next/image';

import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';


const Nav = () => {
    const {data: session} = useSession();

    const [toggleDropdown, setToggleDropdown] = useState(false);

    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);


    return (
        <nav className='nav_bar flex justify-between w-full mb-16 py-3 gap-2'>
            <Link href="/" className='flex flex-initial gap-2 flex-center items-center'>
                <Image 
                    src="/assets/images/karelWorldsLogo.jpg" 
                    alt="KarelLogo" 
                    width={50} 
                    height={50}
                    className=' object-contain rounded-full' 
                />
                <p className='logo_text text-center'>KarelWorlds</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden relative justify-center">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-1'>
                        <Link 
                            href="/puzzles" 
                            className='nav_link main_nav_link'>
                                Puzzles
                        </Link>
                        <Link 
                            href="/puzzle-creator" 
                            className='nav_link main_nav_link'>
                                Create a Puzzle
                        </Link>
                        <button
                            type="button"
                            className='nav_link opp_nav_link'
                            // onClick={signOut}
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image 
                                src = {session?.user.image}
                                alt="Profile"
                                width={37}
                                height={37}
                                className='object-contain rounded-full'
                            />
                        </Link>

                    </div>
                ) : (
                    <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                type="button"
                                className='nav_link opp_nav_link'
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        ))
                    }
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex justify-center">
            {session?.user  ? (
                   <div className='flex'>
                        <Image 
                            src = {session?.user.image}
                            alt="Profile"
                            width={35}
                            height={35}
                            className='object-contain rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown_menu'>
                                <Link
                                    href="/profile"
                                    className='dropdown_link main_dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/puzzles"
                                    className='dropdown_link main_dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Puzzles
                                </Link>
                                <Link
                                    href="/puzzle-creator"
                                    className='dropdown_link main_dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create a Puzzle
                                </Link>
                                <button
                                    type="button"
                                    className='dropdown_link opposite_dropdown_link'
                                    onClick={() =>{
                                        signOut();
                                        setToggleDropdown(false);
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                   </div>
                ) : (
                    <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                type="button"
                                className='nav_link opp_nav_link'
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        ))
                    }
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav;