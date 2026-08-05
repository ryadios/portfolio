import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConstructionBanner } from "@/components/under-construction";
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
        <html lang="en" suppressHydrationWarning>
            <body className={`${silka.className} select-none antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {process.env.NODE_ENV === "production" && (
                        <ConstructionBanner />
                    )}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
