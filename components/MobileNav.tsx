"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci';

const links = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'recipes',
        path: '/recipe',
    },
    {
        name: 'ingredients',
        path: '/ingredient',
    },
    {
        name: 'blog',
        path: '/blog',
    },
];

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleLinkClick = () => {
        setIsOpen(false);
    }

    return (
        <nav>
            <button className='flex justify-center items-center' onClick={handleMenuToggle}>
                <CiMenuFries className='text-[32px]' />
            </button>

            <div className={`md:hidden fixed top-0 right-0 w-full h-full bg-red-500 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="absolute top-4 right-4 text-2xl" onClick={handleMenuToggle}>&times;</button>
                <nav className="flex flex-col items-center mt-16 space-y-4">
                    {links.map((link, index) => {
                        return (
                            <Link
                                href={link.path}
                                key={index}
                                onClick={handleLinkClick}
                                className={`${link.path === pathname && "text-blue-500 border-b-2 border-accent"
                                    } capitalize `}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </nav>
    )
}

export default MobileNav