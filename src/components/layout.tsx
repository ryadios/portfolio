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
import { Card, CardHeader, CardTitle } from "./ui/card";

interface LayoutProps {
    tab: TabKey;
    setTab: React.Dispatch<React.SetStateAction<TabKey>>;
    left?: number;
    sliderWidth?: number;
}

function Layout({ tab }: LayoutProps) {
    const [currentlayout, setCurrentLayout] = useState(HomeLayouts);

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

    return (
        <div className="w-screen m-auto flex justify-between">
            <ResponsiveReactGridLayout
                className="m-auto w-[1200px] gap-12"
                breakpoints={{ xl: 1200, lg: 899, md: 768, sm: 480, xs: 200 }}
                cols={{ xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
                rowHeight={300}
                layouts={currentlayout}
                isResizable={false}
            >
                {keys.map((key) => (
                    <Card
                        key={key}
                        className="flex justify-center items-center visible cursor-grab active:cursor-grabbing"
                    >
                        <CardHeader>
                            <CardTitle>{key}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </ResponsiveReactGridLayout>
        </div>
    );
}

export default Layout;
