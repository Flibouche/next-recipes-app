"use client";

// Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Clerk
import { SignedIn, SignedOut, SignInButton, UserButton, useSession } from '@clerk/nextjs';

// Utils
import { checkUserRoleByMetadata } from '@/utils/userUtils';

// Components
import ThemeToggle from './ThemeToggle';
// Headless UI Components
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// Icons
import { IoChevronDownCircleOutline, IoHome, IoFastFood } from 'react-icons/io5';
import { PiArticleNyTimesFill } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import React from 'react';


const links = [
    { name: 'Home', path: '/', icon: <IoHome className='size-4' /> },
    { name: 'recipes', path: '/recipe', icon: <IoFastFood className='size-4' /> },
    { name: 'blog', path: '/blog', icon: <PiArticleNyTimesFill className='size-4' /> },
];

const adminLinks = [
    { name: 'Admin', path: '/admin', icon: <IoHome className='size-4' /> },
]

const Nav = () => {
    const pathname: string = usePathname();

    const { session } = useSession();
    const isAdmin = checkUserRoleByMetadata(session);

    return (
        <nav className="flex items-center gap-8" aria-label='Desktop navigation'>
            {links.map((link, index) => (
                <Link
                    href={link.path}
                    key={index}
                    className={`${link.path === pathname && "border-b border-primary-800 text-primary hover:text-primary"
                        } text-sm font-bold uppercase duration-300 ease-in-out hover:text-primary-800 `}
                >
                    <div className='inline-flex items-center gap-2'>
                        {link.icon}
                        {link.name}
                    </div>
                </Link>
            ))}
            {session ? (
                <Menu>
                    <MenuButton className="inline-flex gap-2 rounded-md pb-1 duration-300 ease-in-out hover:text-primary-800">
                        <IoChevronDownCircleOutline className="size-5" />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom"
                        className="w-40 rounded-xl border border-white/5 bg-black/75 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        {adminLinks.map((link, index) => (
                            <Link
                                href={link.path}
                                key={index}
                            >
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10">
                                        {link.icon}
                                        {link.name}
                                    </button>
                                </MenuItem>
                            </Link>
                        ))}
                        <div className="my-1 h-px bg-white/5" />
                        {isAdmin && (
                            <div>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10">
                                        {/* <ArchiveBoxXMarkIcon className="size-4 fill-white/30" /> */}
                                        Archive
                                        {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd> */}
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10">
                                        {/* <TrashIcon className="size-4 fill-white/30" /> */}
                                        Delete
                                        {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd> */}
                                    </button>
                                </MenuItem>
                            </div>
                        )}
                    </MenuItems>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Menu>
            ) : (
                <>
                    <SignedOut>
                        <div className='group'>
                            <SignInButton>
                                <div className='flex flex-row items-center gap-2 duration-300 ease-in-out group-hover:cursor-pointer group-hover:text-primary-800'>
                                    <CiLogin />
                                    <span className='text-sm font-bold uppercase'>Sign In</span>
                                </div>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </>
            )}
            <ThemeToggle />
        </nav>
    );
};

export default Nav;