"use client";

import { TabKey } from "@/utils/tabs";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
    tab: TabKey;
    setTab: (tab: TabKey) => void;
    left?: number;
    sliderWidth?: number;
    setX: (x: number) => void;
    setW: (w: number) => void;
}

const Navbar = ({
    tab,
    setTab,
    left = 0,
    sliderWidth = 0,
    setX,
    setW,
}: NavbarProps) => {
    const tabs = [
        { key: TabKey.Home, label: "Home" },
        { key: TabKey.About, label: "About" },
        { key: TabKey.Projects, label: "Projects" },
        { key: TabKey.Media, label: "Media" },
    ];

    const tabRefs = useRef<Record<TabKey, HTMLDivElement | null>>({
        [TabKey.Home]: null,
        [TabKey.About]: null,
        [TabKey.Projects]: null,
        [TabKey.Media]: null,
    });

    useEffect(() => {
        const calculateSliderPosition = () => {
            const currentTabRef = tabRefs.current[tab];

            if (currentTabRef) {
                const rect = currentTabRef.getBoundingClientRect();
                const parentRect =
                    currentTabRef.parentElement?.getBoundingClientRect();
                if (parentRect) {
                    setX(rect.left - parentRect.left);
                    setW(rect.width);
                }
            }
        };

        calculateSliderPosition();

        window.addEventListener("resize", calculateSliderPosition);

        return () => {
            window.removeEventListener("resize", calculateSliderPosition);
        };
    }, [tab, setW, setX]);

    return (
        <nav className="w-full flex items-center justify-between py-10 px-16 text-sm font-medium">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <p className="text-xl font-bold">ryadi</p>
            </motion.div>
            <div className="relative flex items-center justify-between bg-[#EDE9E9] rounded-[23px] p-[5px]">
                {tabs.map(({ key, label }) => (
                    <div
                        key={key}
                        ref={(el) => {
                            tabRefs.current[key] = el;
                        }}
                        className={`tab flex items-center h-9 flex-1 cursor-pointer justify-center z-20 px-4 rounded-[50px] ${
                            tab === key
                                ? "text-black"
                                : "text-black-300 hover:opacity-50 transition-opacity duration-300"
                        }`}
                        onClick={() => setTab(key)}
                    >
                        {label}
                    </div>
                ))}
                <div
                    className="absolute bg-background/80 rounded-xl z-10 p-1 h-8 ease-out"
                    style={{
                        left: `${left}px`,
                        width: `${sliderWidth}px`,
                        transition: "left 0.38s",
                    }}
                ></div>
            </div>
            <div className="text-black hover:opacity-50 cursor-pointer transition-opacity duration-[0.25s]">
                <a>Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
