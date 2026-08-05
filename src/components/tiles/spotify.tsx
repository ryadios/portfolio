import Image from "next/image";
import { moranga } from "@/app/fonts";

type SongData = {
    status: string;
    song: string;
    artist: string;
};

export function Spotify({ song }: { song: SongData }) {
    return (
        <div className="flex size-full flex-col justify-between px-10 py-9 md:px-8 md:py-7 lg:px-9.5 lg:py-8">
            <Image
                src="/icons/spotify.svg"
                alt="Spotify Icon"
                width={72}
                height={72}
                className="spotify-icon h-auto"
                priority
            />

            <div>
                <div className="spotify-text mb-0 flex items-center">
                    <div className="relative mr-2 flex h-5 items-center">
                        <div className="mr-[3px] h-[3px] w-[3px] animate-bar1 rounded-[1.5px] bg-[rgb(110,210,183)]"></div>
                        <div className="mr-[3px] h-[3px] w-[3px] animate-bar2 rounded-[1.5px] bg-[rgb(110,210,183)]"></div>
                        <div className="mr-[3px] h-[3px] w-[3px] animate-bar3 rounded-[1.5px] bg-[rgb(110,210,183)]"></div>
                    </div>
                    <p className="font-medium lg:text-sm">{song.status}</p>
                </div>
                <h2
                    className={`${moranga.className} w-full text-ellipsis font-bold text-2xl leading-[32px] sm:overflow-hidden sm:truncate sm:whitespace-nowrap`}
                >
                    {song.song}
                </h2>

                <p className="text-sm">{song.artist}</p>
            </div>
        </div>
    );
}
