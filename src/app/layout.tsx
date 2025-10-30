import type { Metadata } from "next";
import "./globals.css";
import { silka } from "./fonts";

export const metadata: Metadata = {
    title: "Aditya — Developer, Designer",
    description: "Love creating awesome stuff!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${silka.className} antialiased bg-[#f7f2f2] select-none`}
            >
                {children}
            </body>
        </html>
    );
}
