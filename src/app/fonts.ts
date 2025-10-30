import localFont from "next/font/local";

export const moranga = localFont({
    src: [
        {
            path: "../../public/fonts/Moranga/Moranga-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/Moranga/Moranga-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Moranga/Moranga-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Moranga/Moranga-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-moranga",
    display: "swap",
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
        {
            path: "../../public/fonts/Silka/Silka-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-silka",
    display: "swap",
    preload: true,
});
