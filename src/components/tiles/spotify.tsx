import { CardContent } from "../ui/card";

export function Spotify() {
    return (
        <>
            <CardContent className="px-8 py-9 flex flex-col items-start justify-between h-full">
                <img src="/icons/spotify.svg" alt="Icon" className="size-13" />
                <div className="flex gap-2 flex-col">
                    <div className="flex items-center spotify-text">
                        <div className="h-5 mr-2 relative flex items-center justify-center">
                            <div className="w-[3px] h-[3px] mr-[3px] bg-[rgb(110,210,183)] rounded-[1.5px] animate-bar1"></div>
                            <div className="w-[3px] h-[3px] mr-[3px] bg-[rgb(110,210,183)] rounded-[1.5px] animate-bar2"></div>
                            <div className="w-[3px] h-[3px] bg-[rgb(110,210,183)] rounded-[1.5px] animate-bar3"></div>
                        </div>
                        <p className="font-medium">Offline. Last Played</p>
                    </div>
                    <div>
                        <h2 className="w-full font-moranga font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis leading-[26px] hover:opacity-50 cursor-pointer transition-opacity duration-500">
                            Avid
                        </h2>
                        <p>Sawano Hiroyuki</p>
                    </div>
                </div>
            </CardContent>
        </>
    );
}
