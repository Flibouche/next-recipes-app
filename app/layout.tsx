import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                    <ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
                        <Header />
                        <main>
                            {children}
                        </main>
                        <Footer />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
