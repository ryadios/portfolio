import { moranga } from "@/app/fonts";
import { Arrow } from "../arrow";
import { Button } from "../button";

export function Blog() {
    return (
        <div className="flex size-full flex-col items-center justify-between px-[44px] py-[40px]">
            <div>
                <h2 className={`${moranga.className} mb-1 font-bold text-2xl`}>
                    How it started vs. how it&apos;s going
                </h2>
                <p className="leading-[26px]">
                    A short personal history as it relates to design and
                    development, and how I&apos;ve found value in the
                    cross-section between both disciplines.
                </p>
            </div>
            <div className="flex w-full items-center justify-between">
                <Button className="flex items-center justify-center font-medium">
                    <Arrow />
                    <p className="ml-2 text-sm">Read more</p>
                </Button>
                <p className="font-medium text-[#8A949E] text-sm">
                    May 5, 2021
                </p>
            </div>
        </div>
    );
}
