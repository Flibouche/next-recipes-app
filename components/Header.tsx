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
        <header className="w-full py-4 bg-primary-50">
            <div className="container mx-auto flex justify-between items-center">
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
                            className="fill-curent text-red-500"
                        />
                    )}
                </Link>

                {/* Desktop nav */}
                <div className="hidden xl:flex items-center gap-8">
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