"use client";

import Image from "next/image";
import {
    type CSSProperties,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
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

const cardClassName =
    "grid-card group visible cursor-grab overflow-hidden rounded-xl bg-card p-0 hover:shadow-[0_5px_24px_0_rgba(100,100,111,0.1)] active:cursor-grabbing dark:shadow-[inset_0_0_0_2px_rgb(48,54,61)]";

function StaticMap() {
    return <div className="size-full bg-muted" aria-hidden="true" />;
}

function StaticSpotify() {
    return (
        <div className="flex size-full flex-col justify-between px-10 py-9 md:px-8 md:py-7 lg:px-9.5 lg:py-8">
            <Image
                src="/icons/spotify.svg"
                alt=""
                width={72}
                height={72}
                className="spotify-icon h-auto"
            />
            <div className="relative min-h-[76px]" aria-hidden="true">
                <div className="mb-2 h-5 w-28 rounded-md bg-muted" />
                <div className="mb-1 h-8 w-3/4 rounded-md bg-muted" />
                <div className="h-5 w-1/2 rounded-md bg-muted" />
            </div>
        </div>
    );
}

const staticComponentMap: Record<string, () => React.ReactNode> = {
    ...componentMap,
    b: () => <StaticMap />,
    d: () => <StaticSpotify />,
};

function Layout({ tab }: LayoutProps) {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");
    const [interactive, setInteractive] = useState(false);
    const { containerRef, mounted, width, measureWidth } = useContainerWidth({
        measureBeforeMount: true,
    });

    // TEMP PERF TEST: measure before paint to remove the blank first frame.
    useIsomorphicLayoutEffect(() => {
        measureWidth();
    }, [measureWidth]);

    useEffect(() => {
        setInteractive(true);
    }, []);

    const currentLayout = layoutByTab[tab] ?? HomeLayouts;
    const layouts = {
        ...currentLayout,
        xl: currentLayout.lg,
        xs: currentLayout.sm,
    };
    const activeLayout = layouts[breakpoint] ?? layouts.lg ?? [];
    const staticCardStyle = (key: string) => {
        const style = {} as CSSProperties & Record<string, string>;

        for (const bp of Object.keys(rowHeights) as Breakpoint[]) {
            const item = layouts[bp]?.find(
                (layoutItem) => layoutItem.i === key,
            );

            if (!item) continue;

            style[`--grid-card-column-${bp}`] =
                `${item.x + 1} / span ${item.w}`;
            style[`--grid-card-row-${bp}`] = `${item.y + 1} / span ${item.h}`;
            style[`--grid-card-opacity-${bp}`] = item.disabled ? "0.4" : "1";
        }

        return style;
    };

    return (
        <div className="w-screen p-0 pb-20">
            <div ref={containerRef} className="responsive w-full">
                {interactive && mounted ? (
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
                            enabled: breakpoint !== "xs" && breakpoint !== "sm",
                            cancel: ".no-drag",
                        }}
                        resizeConfig={{ enabled: false }}
                        positionStrategy={absoluteStrategy}
                    >
                        {keys.map((key) => {
                            const layoutItem = activeLayout.find(
                                (item) => item.i === key,
                            );
                            const disabled = layoutItem?.disabled ?? false;
                            return (
                                <div
                                    key={key}
                                    className={cn(
                                        cardClassName,
                                        disabled && "opacity-40",
                                    )}
                                >
                                    {componentMap[key]()}
                                </div>
                            );
                        })}
                    </Responsive>
                ) : (
                    <div className="static-grid">
                        {keys.map((key) => (
                            <div
                                key={key}
                                style={staticCardStyle(key)}
                                className={cn(
                                    cardClassName,
                                    "static-grid-card",
                                )}
                            >
                                {staticComponentMap[key]()}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Layout;
