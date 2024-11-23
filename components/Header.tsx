// Components
import Link from "next/link"
import MobileNav from "./MobileNav"
import Nav from "./Nav"

const Header = () => {
    return (
        <header className="w-full py-3">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href='/'>
                    <h1 className="text-2xl text-primary font-semibold">Reeecipes</h1>
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