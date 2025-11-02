import Image from "next/image";
import { CardContent } from "../ui/card";
import { moranga } from "@/app/fonts";

type SongData = {
    status: string;
    song: string;
    artist: string;
};

export function Spotify({ song }: { song: SongData }) {
    return (
        <div
            className="size-full flex flex-col justify-between px-10 py-9 lg:px-8 lg:py-7 xl:px-9.5 xl:py-8"
            //
        >
            <Image
                src="/icons/spotify.svg"
                alt="Spotify Icon"
                width={72}
                height={72}
                className="xl:size-[54px] lg:size-9 size-[72px] object-contain"
            />
            <div>
                <div className="flex items-center spotify-text mb-0">
                    <div className="h-5 mr-2 relative flex items-center">
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar1"></div>
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar2"></div>
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar3"></div>
                    </div>
                    <p className="font-medium lg:text-sm">{song.status}</p>
                </div>
                <h2
                    // className={`${moranga.className} w-full max-w-[220px] font-bold text-2xl truncate leading-[26px] hover:opacity-50 cursor-pointer transition-opacity duration-500`}
                    className={`${moranga.className} whitespace-nowrap overflow-hidden text-ellipsis w-full text-2xl leading-[32px] font-bold truncate`}
                >
                    {song.song}
                </h2>

                <p className="text-sm">{song.artist}</p>
            </div>
        </div>
    );
}
