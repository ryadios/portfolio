"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";
import { absoluteStrategy } from "react-grid-layout/core";
import { cn } from "@/lib/utils";
import {
    AboutLayouts,
    HomeLayouts,
    keys,
    MediaLayouts,
    type PortfolioLayouts,
    ProjectLayouts,
} from "@/utils/layout.helper";
import { TabKey } from "@/utils/tabs";
import { AboutMe } from "./tiles/about-me";
import { Blog } from "./tiles/blog";
import { DarkMode } from "./tiles/dark-mode";
import { Empress } from "./tiles/empress";
import { Fluence } from "./tiles/fluence";
import { Github } from "./tiles/github";
import { MapTile } from "./tiles/map";
import { Myria } from "./tiles/myria";
import { Newsletter } from "./tiles/newsletter";
import { Spotify } from "./tiles/spotify";

type SongData = {
    status: string;
    song: string;
    artist: string;
};

interface LayoutProps {
    tab: TabKey;
    setTab: React.Dispatch<React.SetStateAction<TabKey>>;
    left?: number;
    sliderWidth?: number;
    song: SongData;
}

const componentMap: Record<
    string,
    (props: { song: SongData }) => React.ReactNode
> = {
    a: () => <AboutMe />,
    b: () => <MapTile />,
    c: () => <Myria />,
    d: ({ song }) => <Spotify song={song} />,
    e: () => <Github />,
    f: () => <DarkMode />,
    g: () => <Blog />,
    h: () => <Empress />,
    i: () => <Fluence />,
    j: () => <Newsletter />,
};

const rowHeights = {
    xl: 280,
    lg: 280,
    md: 180,
    sm: 164,
    xs: 136,
};

type Breakpoint = keyof typeof rowHeights;

const breakpoints = {
    xl: 1200,
    lg: 800,
    md: 375,
    sm: 324,
    xs: 0,
} as const;

const cols = { xl: 4, lg: 4, md: 4, sm: 2, xs: 2 } as const;

function Layout({ tab, song }: LayoutProps) {
    const [currentLayout, setCurrentLayout] =
        useState<PortfolioLayouts>(HomeLayouts);
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");
    const { containerRef, mounted, width } = useContainerWidth({
        measureBeforeMount: true,
    });

    useEffect(() => {
        switch (tab) {
            case TabKey.Projects:
                setCurrentLayout(ProjectLayouts);
                break;
            case TabKey.Home:
                setCurrentLayout(HomeLayouts);
                break;
            case TabKey.About:
                setCurrentLayout(AboutLayouts);
                break;
            case TabKey.Media:
                setCurrentLayout(MediaLayouts);
                break;
            default:
                setCurrentLayout(HomeLayouts);
        }
    }, [tab]);

    const layouts = useMemo(
        () => ({
            ...currentLayout,
            xl: currentLayout.lg,
            xs: currentLayout.sm,
        }),
        [currentLayout],
    );
    const activeLayout = layouts[breakpoint] ?? layouts.lg ?? [];

    return (
        <AnimatePresence>
            {song && (
                <motion.div
                    className="w-screen p-0 pb-20"
                    key="grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <div ref={containerRef} className="responsive w-full">
                        {mounted && (
                            <Responsive
                                className="w-full"
                                width={width}
                                breakpoints={breakpoints}
                                cols={cols}
                                margin={[16, 16]}
                                rowHeight={rowHeights[breakpoint]}
                                layouts={layouts}
                                onBreakpointChange={(bp) =>
                                    setBreakpoint(bp as Breakpoint)
                                }
                                dragConfig={{
                                    enabled:
                                        breakpoint !== "xs" &&
                                        breakpoint !== "sm",
                                    cancel: ".no-drag",
                                }}
                                resizeConfig={{ enabled: false }}
                                positionStrategy={absoluteStrategy}
                            >
                                {keys.map((key) => {
                                    const layoutItem = activeLayout.find(
                                        (item) => item.i === key,
                                    );
                                    const disabled =
                                        layoutItem?.disabled ?? false;
                                    return (
                                        <div
                                            key={key}
                                            className={cn(
                                                `group visible cursor-grab overflow-hidden rounded-xl bg-card p-0 hover:shadow-[0_5px_24px_0_rgba(100,100,111,0.1)] active:cursor-grabbing dark:shadow-[inset_0_0_0_2px_rgb(48,54,61)]`,
                                                disabled && "opacity-40",
                                            )}
                                        >
                                            {componentMap[key]({ song })}
                                        </div>
                                    );
                                })}
                            </Responsive>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Layout;
