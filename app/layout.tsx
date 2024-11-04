import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Next Recipes App",
    description: "A recipes app built with Next.js",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
