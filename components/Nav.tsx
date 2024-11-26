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
                    className={`${link.path === pathname && "border-b border-primary-200 text-primary hover:text-primary"
                        } text-sm font-bold uppercase duration-300 ease-in-out hover:text-primary-300 `}
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