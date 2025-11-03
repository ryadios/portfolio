"use client";

import { Map, useMap } from "@vis.gl/react-maplibre";
import { MinusIcon, PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

const zoomMap: Record<number, number> = {
    1: 6,
    2: 9,
    3: 13,
};

function MapControls() {
    const { current: map } = useMap();
    const [zoomLevel, setZoomLevel] = useState(3);

    useEffect(() => {
        if (map) map.flyTo({ zoom: zoomMap[zoomLevel] });
    }, [zoomLevel, map]);

    const zoomIn = () => {
        if (zoomLevel === 3) return;
        setZoomLevel((prev) => prev + 1);
    };

    const zoomOut = () => {
        if (zoomLevel === 1) return;
        setZoomLevel((prev) => prev - 1);
    };

    return (
        <AnimatePresence>
            {zoomLevel !== 1 && (
                <motion.button
                    key="minus"
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.5,
                    }}
                    onClick={zoomOut}
                    className="absolute left-3.5 bottom-3.5 size-8 no-drag bg-white rounded-full flex items-center justify-center z-1 tooltip-btn"
                >
                    <MinusIcon className="size-4 stroke-3" />
                </motion.button>
            )}

            {zoomLevel !== 3 && (
                <motion.button
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
                    onClick={zoomIn}
                    className="absolute right-3.5 bottom-3.5 size-8 no-drag bg-white rounded-full flex items-center justify-center z-1 tooltip-btn"
                >
                    <PlusIcon className="size-4 stroke-3" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export function MapComponent() {
    const mapId = process.env.NEXT_PUBLIC_MAPTILER_MAP_ID;
    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    return (
        <div className="size-full flex items-center justify-center relative">
            <Map
                initialViewState={{
                    latitude: 26.84689,
                    longitude: 80.97991,
                    zoom: 13,
                }}
                style={{ width: 280, height: 280, borderRadius: "14px" }}
                mapStyle={`https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`}
                attributionControl={false}
                dragPan={false}
                scrollZoom={false}
                doubleClickZoom={false}
                touchZoomRotate={false}
                keyboard={false}
            >
                <MapControls />
            </Map>
        </div>
    );
}
