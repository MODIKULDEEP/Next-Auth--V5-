import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";
import {SessionProvider} from "next-auth/react";
import {auth} from '@/auth'
import {SpeedInsights} from '@vercel/speed-insights/next';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Next Auth App",
    description: "Next.js based authentication app",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
            <body className={inter.className}>
            <Toaster/>
            {children}
            <SpeedInsights/>
            </body>
            </html>
        </SessionProvider>
    );
}
