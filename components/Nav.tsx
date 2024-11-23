"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const links = [
    { name: 'Home', path: '/', },
    { name: 'recipes', path: '/recipe', },
    { name: 'ingredients', path: '/ingredient', },
    { name: 'blog', path: '/blog', },
];

const Nav = () => {
    const pathname: string = usePathname();

    return (
        <nav className="flex items-center gap-8" aria-label='Desktop navigation'>
            {links.map((link, index) => (
                <Link
                    href={link.path}
                    key={index}
                    className={`${link.path === pathname && "text-primary border-primary-200 border-b-[1px] hover:text-primary"
                        } text-sm font-bold uppercase hover:text-primary-300 ease-in-out duration-300 `}
                >
                    {link.name}
                </Link>
            ))}
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <ThemeToggle />
        </nav>
    );
};

export default Nav;