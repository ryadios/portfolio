"use client";

import { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { TabKey } from "@/utils/tabs";
import {
    AboutLayouts,
    HomeLayouts,
    MediaLayouts,
    ProjectLayouts,
    keys,
} from "@/utils/layout.helper";
import { AboutMe } from "./tiles/about-me";
import { cn } from "@/lib/utils";
import { Map } from "./tiles/map";
import { Project1 } from "./tiles/project1";
import { Spotify } from "./tiles/spotify";
import { Github } from "./tiles/github";
import { DarkMode } from "./tiles/dark-mode";
import { History } from "./tiles/history";
import { Project2 } from "./tiles/project2";
import { Project3 } from "./tiles/project3";
import { Subscribe } from "./tiles/subscribe";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";

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
    b: () => <Map />,
    c: () => <Project1 />,
    d: ({ song }) => <Spotify song={song} />,
    e: () => <Github />,
    f: () => <DarkMode />,
    g: () => <History />,
    h: () => <Project2 />,
    i: () => <Project3 />,
    j: () => <Subscribe />,
};

const rowHeights = {
    lg: 280,
    md: 180,
    sm: 164,
    xs: 136,
};

type Breakpoint = keyof typeof rowHeights;

function Layout({ tab, song }: LayoutProps) {
    const [currentlayout, setCurrentLayout] = useState(HomeLayouts);
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

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

    const ResponsiveReactGridLayout = useMemo(
        () => WidthProvider(Responsive),
        []
    );
    const activeLayout = currentlayout[breakpoint] || currentlayout.lg;
    const rowHeight = rowHeights[breakpoint] || 180;

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
                    <div className="w-full responsive">
                        <ResponsiveReactGridLayout
                            className={"w-full"}
                            breakpoints={{
                                xl: 1200,
                                lg: 800,
                                md: 375,
                                sm: 324,
                                xs: 0,
                            }}
                            cols={{ xl: 4, lg: 4, md: 4, sm: 2, xs: 2 }}
                            margin={[16, 16]}
                            rowHeight={rowHeight}
                            layouts={currentlayout}
                            onBreakpointChange={(bp) =>
                                setBreakpoint(bp as Breakpoint)
                            }
                            isResizable={false}
                            draggableCancel=".no-drag"
                        >
                            {keys.map((key) => {
                                const layoutItem = activeLayout.find(
                                    (item) => item.i === key
                                );
                                const disabled = layoutItem?.disabled ?? false;
                                return (
                                    <Card
                                        key={key}
                                        className={cn(
                                            "rounded-xl p-0 bg-white visible cursor-grab active:cursor-grabbing overflow-hidden hover:shadow-[0_5px_24px_0_rgba(100,100,111,0.1)] group",
                                            disabled && "opacity-40"
                                        )}
                                    >
                                        {componentMap[key]({ song })}
                                    </Card>
                                );
                            })}
                        </ResponsiveReactGridLayout>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Layout;
