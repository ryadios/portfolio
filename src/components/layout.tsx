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

interface LayoutProps {
    tab: TabKey;
    setTab: React.Dispatch<React.SetStateAction<TabKey>>;
    left?: number;
    sliderWidth?: number;
}

const componentMap: Record<string, React.ReactNode> = {
    a: <div className="bg-red-400">A Component</div>,
    b: <div className="bg-blue-400">B Component</div>,
    c: <div className="bg-green-400">C Component</div>,
    d: <div className="bg-yellow-400">D Component</div>,
    e: <div className="bg-pink-400">E Component</div>,
    f: <div className="bg-purple-400">F Component</div>,
    g: <div className="bg-gray-400">G Component</div>,
    h: <div className="bg-orange-400">H Component</div>,
    i: <div className="bg-lime-400">I Component</div>,
    j: <div className="bg-teal-400">J Component</div>,
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
                rowHeight={300}
                layouts={currentlayout}
                isResizable={false}
                onBreakpointChange={(bp) =>
                    setBreakpoint(bp === "xs" ? "xs" : "lg")
                }
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
                                "visible cursor-grab active:cursor-grabbing",
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
