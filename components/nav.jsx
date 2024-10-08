'use client'
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);

    const handleGenerateClick = () => {
        // Your logic for generating with Gemini AI goes here
        console.log('Generate with Gemini AI clicked!');
        // Example: You could navigate to a specific page or call an API
        try {
            // If you need to make an API call, you can do it here
            // Example: await fetch('/api/generate-with-gemini', { method: 'POST' });

            // Navigate to the page after processing
            Router.push('/generate_gemini');
        } catch (error) {
            console.error('Error While connecting to Gemini AI:', error);
        }
         
    };

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <img
                    src="/assets/images/logo.svg"
                    alt="PromptAI Logo"
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>PromptAI</p>
            </Link>
            {/* Desktop navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <Link href="/contact" className='black_btn'>
                            Contact Us
                        </Link>
                        <Link href="/generate_gemini" className='black_btn'>
                           Generate With Gemini
                        </Link>
                        
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <img src={session?.user.image || "/assets/images/profile.jpg"} alt="Profile Image"
                                width={37} height={37} className='rounded-full'
                                onError={(e) => e.target.src = '/assets/images/profile.jpg'} />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <img
                            src={session?.user.image || "/assets/images/profile.jpg"}
                            alt="Profile Image"
                            width={37} height={37}
                            className='rounded-full'
                            onError={(e) => e.target.src = '/assets/images/profile.jpg'}
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <Link
                                    href="/contact"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/generate_gemini"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Generate With Gemini
                                </Link>
                               
                                <button
                                    type='button'
                                    className=' mt-5 w-full black_btn'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
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
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
