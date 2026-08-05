"use client";

import { useState } from "react";
import type { SongData } from "@/types/track";
import { TabKey } from "@/utils/tabs";
import Layout from "./layout";
import Navbar from "./navbar";

export function Main({ song }: { song: SongData }) {
    const [tab, setTab] = useState<TabKey>(TabKey.Home);
    const [x, setX] = useState(0);
    const [w, setW] = useState(0);

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
