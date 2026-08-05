"use client";

import { useEffect, useState } from "react";
import type { SongData } from "@/types/track";
import { TabKey } from "@/utils/tabs";
import Layout from "./layout";
import Navbar from "./navbar";

function isSongData(value: unknown): value is SongData {
    return (
        typeof value === "object" &&
        value !== null &&
        "status" in value &&
        "song" in value &&
        "artist" in value &&
        typeof value.status === "string" &&
        typeof value.song === "string" &&
        typeof value.artist === "string"
    );
}

export function Main({ initialSong }: { initialSong: SongData }) {
    const [tab, setTab] = useState<TabKey>(TabKey.Home);
    const [x, setX] = useState(0);
    const [w, setW] = useState(0);
    const [song, setSong] = useState<SongData>(initialSong);

    useEffect(() => {
        let cancelled = false;

        fetch("/api/spotify")
            .then((response) => (response.ok ? response.json() : null))
            .then((data: unknown) => {
                if (!cancelled && isSongData(data)) setSong(data);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main>
            <Navbar
                tab={tab}
                setTab={setTab}
                left={x}
                sliderWidth={w}
                setX={setX}
                setW={setW}
            />
            <Layout
                song={song}
                tab={tab}
                setTab={setTab}
                left={x}
                sliderWidth={w}
            />
        </main>
    );
}
