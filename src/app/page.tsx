import { Main } from "@/components/main";
import { fallbackTrack } from "@/lib/spotify";

export default function Home() {
    return <Main initialSong={fallbackTrack} />;
}
