export const revalidate = 300; // Cache this API response for 5 minutes globally

import { NextResponse } from "next/server";

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const nowPlayingEndpoint =
    "https://api.spotify.com/v1/me/player/currently-playing";
const recentlyPlayedEndpoint =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
    const response = await fetch(tokenEndpoint, {
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
        // Access token calls should not be cached
        cache: "no-store",
    });

    const data = await response.json();
    return data.access_token;
}

export async function GET() {
    try {
        const access_token = await getAccessToken();

        // Primary request
        const nowPlayingRes = await fetch(nowPlayingEndpoint, {
            headers: { Authorization: `Bearer ${access_token}` },
            cache: "no-store", // Spotify endpoint must not be cached individually
        });

        if (nowPlayingRes.status === 204 || nowPlayingRes.status >= 400) {
            const recentRes = await fetch(recentlyPlayedEndpoint, {
                headers: { Authorization: `Bearer ${access_token}` },
                cache: "no-store",
            });
            const recentData = await recentRes.json();
            const track = recentData?.items?.[0]?.track;
            return NextResponse.json({
                status: "Offline. Last Played",
                song: track?.name ?? "Unknown Track",
                artist:
                    track?.artists?.map((a: any) => a.name).join(", ") ??
                    "Unknown Artist",
            });
        }

        const nowPlayingData = await nowPlayingRes.json();
        const track = nowPlayingData?.item;

        if (!track) {
            const recentRes = await fetch(recentlyPlayedEndpoint, {
                headers: { Authorization: `Bearer ${access_token}` },
                cache: "no-store",
            });
            const recentData = await recentRes.json();
            const recentTrack = recentData?.items?.[0]?.track;
            return NextResponse.json({
                status: "Offline. Last Played",
                song: recentTrack?.name ?? "Unknown Track",
                artist:
                    recentTrack?.artists?.map((a: any) => a.name).join(", ") ??
                    "Unknown Artist",
            });
        }

        return NextResponse.json({
            status: "Currently Playing",
            song: track.name,
            artist: track.artists.map((a: any) => a.name).join(", "),
        });
    } catch {
        return NextResponse.json(
            {
                status: "Offline. Last Played",
                song: "Unknown Track",
                artist: "Unknown Artist",
            },
            { status: 500 }
        );
    }
}
