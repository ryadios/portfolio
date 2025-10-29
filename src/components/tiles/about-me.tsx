import { RefreshCcw } from "lucide-react";
import { CardContent } from "../ui/card";

export function AboutMe() {
    return (
        <>
            <CardContent className="px-10 py-6 size-full flex flex-col items-start justify-end overflow-hidden gap-6">
                <div className="flex justify-between items-center pointer-events-none">
                    <img
                        src="/images/cat-profile.png"
                        alt="memoji"
                        className="max-h-32"
                    />
                </div>
                <p className="leading-[26px]">
                    I'm{" "}
                    <span className="font-moranga font-bold text-[40px]">
                        aditya
                    </span>
                    , a developer and product designer from India. I'm
                    interested in React, Node, Product Design, Nextjs, Design,
                    Linux, Startups and Music.
                </p>
                <button
                    onClick={() => {}}
                    className="no-drag absolute h-9 top-5 right-5 flex items-center px-3 rounded-xl text-sm [box-shadow:0_0_0_2px_rgb(240,242,248)] cursor-pointer transition-shadow duration-200 ease-out hover:[box-shadow:0_0_0_5px_rgb(240,242,248)]"
                >
                    <RefreshCcw className="size-3" />
                    <p className="ml-1.5 text-[16px]">Toggle Lockdown</p>
                </button>
            </CardContent>
        </>
    );
}
