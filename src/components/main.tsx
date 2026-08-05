"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { TabKey } from "@/utils/tabs";
import Layout from "./layout";
import Navbar from "./navbar";

export function Main() {
    const [tab, setTab] = useState<TabKey>(TabKey.Home);
    const [x, setX] = useState(0);
    const [w, setW] = useState(0);

    return (
        /* TEMP MOTION TEST: respect reduced-motion preferences during the experiment. */
        <MotionConfig reducedMotion="user">
            <main>
                <Navbar
                    tab={tab}
                    setTab={setTab}
                    left={x}
                    sliderWidth={w}
                    setX={setX}
                    setW={setW}
                />
                <Layout tab={tab} />
            </main>
        </MotionConfig>
    );
}
