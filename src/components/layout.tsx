import { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { TabKey } from "../App";
import {
    AboutLayouts,
    HomeLayouts,
    MediaLayouts,
    ProjectLayouts,
    keys,
} from "@/utils/layout.helper";
import { Card } from "./ui/card";
import { AboutMe } from "./tiles/about-me";
import { cn } from "@/lib/utils";
import { Map } from "./tiles/map";
import { Project1 } from "./tiles/project1";
import { Spotify } from "./tiles/spotify";
import { Twitter } from "./tiles/twitter";
import { DarkMode } from "./tiles/dark-mode";
import { History } from "./tiles/history";
import { Project2 } from "./tiles/project2";
import { Project3 } from "./tiles/project3";
import { Subscribe } from "./tiles/subscribe";

interface LayoutProps {
    tab: TabKey;
    setTab: React.Dispatch<React.SetStateAction<TabKey>>;
    left?: number;
    sliderWidth?: number;
}

const componentMap: Record<string, React.ReactNode> = {
    a: <AboutMe />,
    b: <Map />,
    c: <Project1 />,
    d: <Spotify />,
    e: <Twitter />,
    f: <DarkMode />,
    g: <History />,
    h: <Project2 />,
    i: <Project3 />,
    j: <Subscribe />,
};

function Layout({ tab }: LayoutProps) {
    const [currentlayout, setCurrentLayout] = useState(HomeLayouts);
    const [breakpoint, setBreakpoint] =
        useState<keyof typeof currentlayout>("lg");

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

    return (
        <div className="w-screen m-auto flex justify-between">
            <ResponsiveReactGridLayout
                className="m-auto w-[1200px] gap-12"
                breakpoints={{ xl: 1200, lg: 899, md: 768, sm: 480, xs: 200 }}
                cols={{ xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
                rowHeight={280}
                layouts={currentlayout}
                isResizable={false}
                onBreakpointChange={(bp) =>
                    setBreakpoint(bp === "xs" ? "xs" : "lg")
                }
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
                                "visible cursor-grab active:cursor-grabbing [box-shadow:inset_0_0_0_2px_transparent] p-0",
                                disabled && "opacity-40"
                            )}
                        >
                            {componentMap[key]}
                        </Card>
                    );
                })}
            </ResponsiveReactGridLayout>
        </div>
    );
}

export default Layout;
