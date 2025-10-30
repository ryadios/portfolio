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
        <CardContent className="px-8 py-10 flex flex-col items-start justify-between h-[280px]">
            <Image
                src="/icons/spotify.svg"
                alt="Spotify Icon"
                width={52}
                height={52}
            />
            <div className="flex gap-1 flex-col">
                <div className="flex items-center spotify-text">
                    <div className="h-5 mr-2 relative flex items-center justify-center">
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar1"></div>
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar2"></div>
                        <div className="w-[3px] h-[3px] mr-[3px] rounded-[1.5px] bg-[rgb(110,210,183)] animate-bar3"></div>
                    </div>
                    <p className="font-medium">{song.status}</p>
                </div>
                <div>
                    <h2
                        className={`${moranga.className} w-full max-w-[220px] font-bold text-2xl truncate leading-[26px] hover:opacity-50 cursor-pointer transition-opacity duration-500`}
                    >
                        {song.song}
                    </h2>

                    <p>{song.artist}</p>
                </div>
            </div>
        </CardContent>
    );
}
