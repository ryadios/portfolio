import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ConstructionBanner } from "@/components/under-construction";
import { silka } from "./fonts";

export const metadata: Metadata = {
    metadataBase: new URL("https://ryadi.dev"),
    title: "Aditya - Developer & Product Designer",
    description:
        "Developer & Product Designer building thoughtful digital products with React, Next.js, Node.js, and design.",
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: [
            {
                url: "/favicon-light.svg",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark.svg",
                media: "(prefers-color-scheme: dark)",
            },
        ],
    },
    openGraph: {
        title: "Aditya - Developer & Product Designer",
        description:
            "Developer & Product Designer building thoughtful digital products with React, Next.js, Node.js, and design.",
        url: "/",
        siteName: "Aditya",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 2400,
                height: 1260,
                alt: "Hi, I'm Aditya — making things on the internet",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aditya - Developer & Product Designer",
        description:
            "Developer & Product Designer building thoughtful digital products with React, Next.js, Node.js, and design.",
        images: ["/og-image.png"],
    },
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
