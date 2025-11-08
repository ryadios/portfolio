import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const revalidate = 300; // cache for 5 minutes

const nowPlayingEndpoint =
    "https://api.spotify.com/v1/me/player/currently-playing";
const recentlyPlayedEndpoint =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

interface SpotifyArtist {
    name: string;
}

interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
}

let lastTrack = {
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

        if (res.status === 204 || res.status >= 400) {
            const recentRes = await fetch(recentlyPlayedEndpoint, {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
            });
            const recent = await recentRes.json();
            const track: SpotifyTrack | undefined = recent?.items?.[0]?.track;
            if (track) {
                lastTrack = {
                    status: "Offline. Last Played",
                    song: track.name,
                    artist: track.artists
                        .slice(0, 2)
                        .map((a: SpotifyArtist) => a.name)
                        .join(", "),
                };
            }
            return NextResponse.json(lastTrack);
        }

        const data = await res.json();
        const track: SpotifyTrack | undefined = data?.item;

        if (!track) return NextResponse.json(lastTrack);

        lastTrack = {
            status: "Currently Playing",
            song: track.name,
            artist: track.artists
                .slice(0, 2)
                .map((a: SpotifyArtist) => a.name)
                .join(", "),
        };

        return NextResponse.json(lastTrack);
    } catch {
        return NextResponse.json(lastTrack, { status: 500 });
    }
}
