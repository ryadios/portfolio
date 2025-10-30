"use client";

import { useState } from "react";
import Navbar from "./navbar";
import { TabKey } from "@/utils/tabs";
import Layout from "./layout";

export function Main() {
    const [tab, setTab] = useState<TabKey>(TabKey.Home);
    const [x, setX] = useState(0);
    const [w, setW] = useState(0);

    return (
        <main className="bg-[#f7f2f2]">
            <Navbar
                tab={tab}
                setTab={setTab}
                left={x}
                sliderWidth={w}
                setX={setX}
                setW={setW}
            />
            <Layout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
        </main>
    );
}
