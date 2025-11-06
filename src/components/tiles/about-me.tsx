import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import { moranga } from "@/app/fonts";

export function AboutMe() {
    return (
        <div className="px-10 py-8 size-full flex flex-col items-start justify-end overflow-hidden gap-6">
            <div className="flex justify-between items-center pointer-events-none">
                <Image
                    src="/images/cat-profile.png"
                    alt="memoji"
                    className="max-h-32"
                    width={100}
                    height={100}
                />
            </div>
            <p className="leading-[26px]">
                I&apos;m{" "}
                <span className={`${moranga.className} font-bold text-3xl`}>
                    aditya
                </span>
                , a developer and product designer from India. I&apos;m
                interested in React, Node, Product Design, Nextjs, Design,
                Linux, Startups and Music.
            </p>
            <button
                onClick={() => {}}
                className="no-drag font-medium absolute h-9 top-5 right-5 flex items-center px-3 rounded-xl text-sm [box-shadow:0_0_0_2px_rgb(240,242,248)] cursor-pointer transition-shadow duration-200 ease-out hover:[box-shadow:0_0_0_5px_rgb(240,242,248)]"
            >
                <RefreshCcw className="size-3 rotate-180 stroke-2" />
                <p className="ml-1.5">Toggle Lockdown</p>
            </button>
        </div>
    );
}
