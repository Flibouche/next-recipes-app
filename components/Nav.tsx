"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";

const links = [
    { name: 'Home', path: '/', },
    { name: 'recipes', path: '/recipe', },
    { name: 'ingredients', path: '/ingredient', },
    { name: 'blog', path: '/blog', },
];

const useCurrentTheme = (theme: string | undefined) => {
    const [currentTheme, setCurrentTheme] = useState<string>();

    useEffect(() => {
        if (!theme) {
            setCurrentTheme('dark');
        } else {
            setCurrentTheme(theme);
        }
    }, [theme])

    return { currentTheme }
}

const Nav = () => {
    const pathname: string = usePathname();
    const [theme, setTheme] = useState("");
    const { currentTheme } = useCurrentTheme(theme);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setTheme(storedTheme);
        }
    }, [currentTheme])

    const handleChangeTheme = () => {
        const theme = localStorage.theme;

        if (!theme && !document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else if (!document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }

    return (
        <nav className="flex gap-8" aria-label='Desktop navigation'>
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${link.path === pathname && "text-blue-500 border-b-2 border-accent"
                            } capitalize `}
                    >
                        {link.name}
                    </Link>
                );
            })}
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <button onClick={handleChangeTheme}>
                {currentTheme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
        </nav>
    )
}

export default Nav