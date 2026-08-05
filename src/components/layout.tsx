"use client";

import { useEffect, useLayoutEffect } from "react";
import {
    getBreakpointFromWidth,
    Responsive,
    useContainerWidth,
} from "react-grid-layout";
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

interface LayoutProps {
    tab: TabKey;
}

const componentMap: Record<string, () => React.ReactNode> = {
    a: () => <AboutMe />,
    b: () => <MapTile />,
    c: () => <Myria />,
    d: () => <Spotify />,
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

const layoutByTab: Record<TabKey, PortfolioLayouts> = {
    [TabKey.Home]: HomeLayouts,
    [TabKey.Projects]: ProjectLayouts,
    [TabKey.About]: AboutLayouts,
    [TabKey.Media]: MediaLayouts,
};

const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

const cardEntryClass = "grid-card-enter";

function Layout({ tab }: LayoutProps) {
    const { containerRef, mounted, width, measureWidth } = useContainerWidth({
        measureBeforeMount: true,
    });

    const breakpoint = getBreakpointFromWidth(breakpoints, width) as Breakpoint;

    useIsomorphicLayoutEffect(() => {
        measureWidth();
    }, [measureWidth]);

    const currentLayout = layoutByTab[tab] ?? HomeLayouts;
    const layouts = {
        ...currentLayout,
        xl: currentLayout.lg,
        xs: currentLayout.sm,
    };
    const activeLayout = layouts[breakpoint] ?? layouts.lg ?? [];

    return (
        <div className="w-screen p-0 pb-20">
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
                        dragConfig={{
                            enabled: breakpoint !== "xs" && breakpoint !== "sm",
                            cancel: ".no-drag",
                        }}
                        resizeConfig={{ enabled: false }}
                        positionStrategy={absoluteStrategy}
                    >
                        {keys.map((key, index) => {
                            const layoutItem = activeLayout.find(
                                (item) => item.i === key,
                            );
                            const disabled = layoutItem?.disabled ?? false;
                            return (
                                <div
                                    key={key}
                                    style={{
                                        animationDelay: `${index * 32}ms`,
                                    }}
                                    className={cn(
                                        cardEntryClass,
                                        `grid-card group visible cursor-grab overflow-hidden rounded-xl bg-card p-0 hover:shadow-[0_5px_24px_0_rgba(100,100,111,0.1)] active:cursor-grabbing dark:shadow-[inset_0_0_0_2px_rgb(48,54,61)]`,
                                        disabled && "opacity-40",
                                    )}
                                >
                                    {componentMap[key]()}
                                </div>
                            );
                        })}
                    </Responsive>
                )}
            </div>
        </div>
    );
}

export default Layout;
