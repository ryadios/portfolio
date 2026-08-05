"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { TabKey } from "@/utils/tabs";

interface NavbarProps {
    tab: TabKey;
    setTab: (tab: TabKey) => void;
    left?: number;
    sliderWidth?: number;
    setX: (x: number) => void;
    setW: (w: number) => void;
}

const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

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

    useIsomorphicLayoutEffect(() => {
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
                src="/images/ryadi.webp"
                alt="ryadi"
                width={256}
                height={112}
                loading="eager"
                fetchPriority="high"
                sizes="102px"
                className="h-auto w-25.5"
            />
            <div className="relative flex items-center justify-between rounded-[23px] bg-[rgba(0,0,0,0.04)] p-1.25 dark:border-2 dark:border-[rgb(48,54,61)] dark:bg-background">
                {tabs.map(({ key, label }) => (
                    <button
                        type="button"
                        key={key}
                        aria-pressed={tab === key}
                        ref={(el) => {
                            tabRefs.current[key] = el;
                        }}
                        className={`nav-tab tab z-10 flex h-8 items-center rounded-[50px] border-0 bg-transparent px-4 ${
                            tab !== key && "cursor-pointer"
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
                        transition:
                            sliderWidth > 0
                                ? "left 500ms cubic-bezier(0.23, 1, 0.32, 1), width 180ms cubic-bezier(0.23, 1, 0.32, 1)"
                                : "none",
                    }}
                ></div>
            </div>
            <div className="nav-socials">
                <a
                    className="nav-social"
                    href="https://x.com/ryadi_os"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X profile"
                >
                    <span
                        aria-hidden="true"
                        className="nav-social-icon nav-social-icon-x"
                    />
                    <span className="sr-only">X profile</span>
                </a>
                <a
                    className="nav-social"
                    href="https://www.linkedin.com/in/ryadi/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                >
                    <span
                        aria-hidden="true"
                        className="nav-social-icon nav-social-icon-linkedin"
                    />
                    <span className="sr-only">LinkedIn profile</span>
                </a>
                <a
                    className="nav-social"
                    href="https://github.com/ryadios/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                >
                    <span
                        aria-hidden="true"
                        className="nav-social-icon nav-social-icon-github"
                    />
                    <span className="sr-only">GitHub profile</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
