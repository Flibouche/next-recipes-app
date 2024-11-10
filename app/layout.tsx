import type { Metadata } from "next";
import "./globals.css";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Next Recipes App",
    description: "A recipes app built with Next.js",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="container">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
