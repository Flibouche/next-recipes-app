"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

const Nav = () => {
    const pathname = usePathname();
    return (
        <nav className="flex gap-8">
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
        </nav>
    )
}

export default Nav