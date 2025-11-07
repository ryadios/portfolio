import { moranga } from "@/app/fonts";
import { Arrow } from "../arrow";
import { Button } from "../button";

export function Blog() {
    return (
        <div className="py-[40px] px-[44px] size-full flex flex-col justify-between items-center">
            <div>
                <h2 className={`${moranga.className} font-bold text-2xl mb-1`}>
                    How it started vs. how it&apos;s going
                </h2>
                <p className="leading-[26px]">
                    A short personal history as it relates to design and
                    development, and how I&apos;ve found value in the
                    cross-section between both disciplines.
                </p>
            </div>
            <div className="flex justify-between items-center w-full">
                {/* <button className="no-drag font-medium h-9 flex items-center px-3 rounded-xl [box-shadow:0_0_0_2px_rgb(240,242,248)] cursor-pointer transition-shadow duration-200 ease-out hover:[box-shadow:0_0_0_5px_rgb(240,242,248)]">
                    <Arrow />
                    <p className="text-sm ml-2">Read more</p>
                </button> */}
                <Button className="flex justify-center items-center font-medium">
                    <Arrow />
                    <p className="text-sm ml-2">Read more</p>
                </Button>
                <p className="text-[#8A949E] text-sm font-medium">
                    May 5, 2021
                </p>
            </div>
        </div>
    );
}
