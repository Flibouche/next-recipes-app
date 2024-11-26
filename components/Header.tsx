"use client";

// Components
import Link from "next/link"
import MobileNav from "./MobileNav"
import Nav from "./Nav"
import Image from "next/image"
import { useEffect, useState } from "react"

const Header = () => {
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            const storedTheme: string = localStorage.getItem("theme") || "dark";
            setTheme(storedTheme);
            if (storedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    return (
        <header className="w-full bg-primary-50 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href='/'>
                    {theme === "dark" ? (
                        <Image
                            src={"/logodarkmode.svg"}
                            alt="Logo"
                            width={200}
                            height={150}
                            className="fill-current text-blue-500"
                        />
                    ) : (
                        <Image
                            src={"/logolightmode.svg"}
                            alt="Logo"
                            width={200}
                            height={150}
                            className="fill-current text-red-500"
                        />
                    )}
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-8 xl:flex">
                    <Nav />
                </div>

                {/* Mobile nav */}
                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header