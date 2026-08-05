import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConstructionBanner } from "@/components/under-construction";
import { silka } from "./fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
    title: "aditya - things on internet",
    description:
        "a little bit of design, a little bit of code, a lot of tabs open.",
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
                <Analytics />
            </body>
        </html>
    );
}
