"use client";

import { TabKey } from "@/utils/tabs";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
        { key: TabKey.Home, label: "All" },
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
        <nav className="responsive-nav font-medium text-sm">
            <Image
                src="/images/ryadi.png"
                alt="ryadi"
                width={102}
                height={24}
            />
            <div className="relative flex items-center justify-between bg-[rgba(0,0,0,0.04)] rounded-[23px] p-[5px]">
                {tabs.map(({ key, label }) => (
                    <div
                        key={key}
                        ref={(el) => {
                            tabRefs.current[key] = el;
                        }}
                        className={`tab flex items-center h-8 px-4 rounded-[50px] transition-opacity duration-300 z-10 ${
                            tab === key
                                ? "text-black"
                                : "text-black-300 hover:opacity-50 cursor-pointer"
                        }`}
                        onClick={() => setTab(key)}
                    >
                        {label}
                    </div>
                ))}
                <div
                    className="absolute bg-white rounded-xl h-8"
                    style={{
                        left: `${left}px`,
                        width: `${sliderWidth}px`,
                        transition: "left 0.38s",
                    }}
                ></div>
            </div>
            <a className="text-black hover:opacity-50 cursor-pointer transition-opacity duration-200">
                <p>Contact</p>
            </a>
        </nav>
    );
};

export default Navbar;
