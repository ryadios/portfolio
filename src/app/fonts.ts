import localFont from "next/font/local";

export const moranga = localFont({
    src: [
        {
            path: "../../public/fonts/Moranga/Moranga-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-moranga",
    display: "swap",
    preload: false,
});

export const silka = localFont({
    src: [
        {
            path: "../../public/fonts/Silka/Silka-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Silka/Silka-Medium.otf",
            weight: "500",
            style: "normal",
        },
    ],
    variable: "--font-silka",
    display: "swap",
    preload: true,
});
