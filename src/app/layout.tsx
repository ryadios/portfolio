import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { ConstructionBanner } from "@/components/under-construction";
import { silka } from "./fonts";

export const metadata: Metadata = {
    metadataBase: new URL("https://ryadi.dev"),
    title: "Aditya - Developer & Product Designer",
    description:
        "Developer and product designer from India, building thoughtful digital experiences while exploring Linux, startups, music, and the occasional side quest.",
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
            "Developer and product designer from India, building thoughtful digital experiences while exploring Linux, startups, music, and the occasional side quest.",
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
            "Developer and product designer from India, building thoughtful digital experiences while exploring Linux, startups, music, and the occasional side quest.",
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
