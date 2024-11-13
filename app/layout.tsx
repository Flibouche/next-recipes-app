import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Next Recipes App",
    description: "A recipes app built with Next.js",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Header />
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <main className="container">
                        {children}
                    </main>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
