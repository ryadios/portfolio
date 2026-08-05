"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TabKey } from "@/utils/tabs";
import { config } from "../../config";

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

    const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
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
                width={1024}
                height={446}
                loading="eager"
                sizes="102px"
                className="h-auto w-[102px]"
            />
            <div className="relative flex items-center justify-between rounded-[23px] bg-[rgba(0,0,0,0.04)] p-[5px] dark:border-2 dark:border-[rgb(48,54,61)] dark:bg-background">
                {tabs.map(({ key, label }) => (
                    <button
                        type="button"
                        key={key}
                        aria-pressed={tab === key}
                        ref={(el) => {
                            tabRefs.current[key] = el;
                        }}
                        className={`tab z-10 flex h-8 items-center rounded-[50px] border-0 bg-transparent px-4 transition-opacity duration-300 ${
                            tab !== key && "cursor-pointer hover:opacity-50"
                        }`}
                        onClick={() => setTab(key)}
                    >
                        {label}
                    </button>
                ))}
                <div
                    className="absolute h-8 rounded-xl bg-white dark:bg-muted"
                    style={{
                        left: `${left}px`,
                        width: `${sliderWidth}px`,
                        transition: "left 0.38s",
                    }}
                ></div>
            </div>
            <a
                className="contact cursor-pointer transition-opacity duration-200 hover:opacity-50"
                href={`mailto:${config.email}`}
            >
                <p>Contact</p>
            </a>
        </nav>
    );
};

export default Navbar;
