import { getAccessToken } from "@/lib/spotify";
import { SongData } from "@/types/track";
import { NextResponse } from "next/server";

// export const revalidate = 60; // cache for 1 minute

const nowPlayingEndpoint =
    "https://api.spotify.com/v1/me/player/currently-playing";

interface SpotifyArtist {
    name: string;
}

interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
}

const lastTrack: SongData = {
    status: "Offline. Last Played",
    song: "Avid",
    artist: "SawanoHiroyuki[nZk], mizuki",
};

export async function GET() {
    try {
        const token = await getAccessToken();
        const res = await fetch(nowPlayingEndpoint, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        if (res.status === 204 || res.status >= 400)
            return NextResponse.json(lastTrack);

        const data = await res.json();
        const track: SpotifyTrack | undefined = data?.item;

        if (res.status === 204 || res.status >= 400 || !track)
            return NextResponse.json(lastTrack);

        return NextResponse.json({
            status: "Now Playing",
            song: track.name,
            artist: track.artists
                .slice(0, 2)
                .map((a: SpotifyArtist) => a.name)
                .join(", "),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(lastTrack, { status: 500 });
    }
}
