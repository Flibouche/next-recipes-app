import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Your Next Recipe",
    description: "A recipes app built with Next.js",
    openGraph: {
        title: "Your Next Recipe",
        description: "A cooking recipes app built with Next.js",
        url: "https://your-next-recipe.vercel.app",
        siteName: "Your Next Recipe",
        locale: "en_US",
        type: "website",
    }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <Toaster />
                    <ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
                        <Header />
                        <main className="min-h-screen bg-primary-50">
                            <Breadcrumb
                                separator=">"
                                activeClasses='text-primary'
                                listClasses='text-sm hover:underline hover:text-primary-700 mx-2 font-bold'
                                capitalizeLinks
                            />
                            {children}
                        </main>
                        <Footer />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
