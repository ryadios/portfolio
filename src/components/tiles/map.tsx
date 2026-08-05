"use client";

import { Map as MapLibre, useMap } from "@vis.gl/react-maplibre";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon } from "lucide-react";
import { setWorkerUrl } from "maplibre-gl";
import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "../button";

setWorkerUrl("https://unpkg.com/maplibre-gl@6.1.0/dist/maplibre-gl-worker.mjs");

const zoomMap: Record<number, number> = {
    1: 9,
    2: 13,
};

function MapControls() {
    const { current: map } = useMap();
    const [zoomLevel, setZoomLevel] = useState(2);

    useEffect(() => {
        if (map) map.flyTo({ zoom: zoomMap[zoomLevel] });
    }, [zoomLevel, map]);

    const zoomIn = () => {
        if (zoomLevel === 2) return;
        setZoomLevel((prev) => prev + 1);
    };

    const zoomOut = () => {
        if (zoomLevel === 1) return;
        setZoomLevel((prev) => prev - 1);
    };

    return (
        <AnimatePresence>
            {zoomLevel !== 1 && (
                <Button
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.5,
                    }}
                    className="absolute bottom-3.5 left-3.5 size-8"
                    variant="tooltip"
                    onClick={zoomOut}
                >
                    <MinusIcon className="size-4 stroke-3" />
                </Button>
            )}

            {zoomLevel !== 2 && (
                <Button
                    key="plus"
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.5,
                    }}
                    className="absolute right-3.5 bottom-3.5 size-8"
                    variant="tooltip"
                    onClick={zoomIn}
                >
                    <PlusIcon className="size-4 stroke-3" />
                </Button>
            )}
        </AnimatePresence>
    );
}

function Overlay() {
    return (
        <div className="pointer-events-none absolute inset-1/2 flex size-[82px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#98d0ff80] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:scale-110 lg:size-24">
            <Image
                src="/images/cat.png"
                alt="User"
                width={50}
                height={50}
                sizes="50px"
            />
        </div>
    );
}

export function MapTile() {
    const { theme } = useTheme();

    const mapId =
        theme === "light"
            ? process.env.NEXT_PUBLIC_MAPTILER_MAP_ID!
            : process.env.NEXT_PUBLIC_MAPTILER_DARK_MAP_ID!;
    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    const mapStyle = (id: string) =>
        `https://api.maptiler.com/maps/${id}/style.json?key=${key}`;

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[14px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mapId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    className="absolute inset-0"
                >
                    <MapLibre
                        initialViewState={{
                            latitude: 26.84689,
                            longitude: 80.985,
                            zoom: 13,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        mapStyle={mapStyle(mapId)}
                        attributionControl={false}
                        dragPan={false}
                        scrollZoom={false}
                        doubleClickZoom={false}
                        touchZoomRotate={false}
                        keyboard={false}
                    >
                        <MapControls />
                    </MapLibre>
                </motion.div>
            </AnimatePresence>
            <Overlay />
        </div>
    );
}
