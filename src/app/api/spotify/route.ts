import { NextResponse } from "next/server";

export const revalidate = 300; // cache for 5 minutes

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const nowPlayingEndpoint =
    "https://api.spotify.com/v1/me/player/currently-playing";
const recentlyPlayedEndpoint =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

let lastTrack = {
    status: "Offline. Last Played",
    song: "Avid",
    artist: "SawanoHiroyuki[nZk], mizuki",
};

async function getAccessToken() {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
    const res = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
        cache: "no-store",
    });
    const data = await res.json();
    if (!data.access_token) throw new Error("Failed to get access token");
    return data.access_token;
}

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
            const track = recent?.items?.[0]?.track;
            if (track) {
                lastTrack = {
                    status: "Offline. Last Played",
                    song: track.name,
                    artist: track.artists.map((a: any) => a.name).join(", "),
                };
            }
            return NextResponse.json(lastTrack);
        }

        const data = await res.json();
        const track = data?.item;

        if (!track) return NextResponse.json(lastTrack);

        lastTrack = {
            status: "Currently Playing",
            song: track.name,
            artist: track.artists.map((a: any) => a.name).join(", "),
        };

        return NextResponse.json(lastTrack);
    } catch {
        return NextResponse.json(lastTrack, { status: 500 });
    }
}
