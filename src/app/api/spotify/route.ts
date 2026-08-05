import { NextResponse } from "next/server";
import { getAccessToken, SpotifyRequestError } from "@/lib/spotify";
import type { SpotifyResponse } from "@/types/track";

const recentlyPlayedEndpoint =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

interface SpotifyArtist {
    name: string;
}

interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    album?: {
        images?: Array<{ url?: string }>;
    };
    external_urls?: { spotify?: string };
}

function isSpotifyTrack(value: unknown): value is SpotifyTrack {
    if (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        typeof value.name === "string" &&
        value.name.trim().length > 0 &&
        "artists" in value &&
        Array.isArray(value.artists) &&
        value.artists.length > 0 &&
        value.artists.every(
            (artist) =>
                typeof artist === "object" &&
                artist !== null &&
                "name" in artist &&
                typeof artist.name === "string" &&
                artist.name.trim().length > 0,
        )
    )
        return true;
    return false;
}

function isRecentlyPlayedPayload(
    value: unknown,
): value is { items: Array<{ track: SpotifyTrack }> } {
    return (
        typeof value === "object" &&
        value !== null &&
        "items" in value &&
        Array.isArray(value.items)
    );
}

function response(body: SpotifyResponse, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: { "Cache-Control": "no-store" },
    });
}

const unavailable = (stage: string, status?: number) => {
    console.warn("[spotify] unavailable", {
        stage,
        ...(status === undefined ? {} : { status }),
    });
    return response({ state: "unavailable" }, 502);
};

export async function GET() {
    const signal = AbortSignal.timeout(8_000);
    let stage = "token";

    try {
        const token = await getAccessToken(signal);
        stage = "recently-played";
        const res = await fetch(recentlyPlayedEndpoint, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
            signal,
        });

        if (!res.ok) return unavailable(stage, res.status);

        const data: unknown = await res.json();
        if (!isRecentlyPlayedPayload(data))
            return unavailable("recently-played-payload", res.status);
        if (data.items.length === 0) return response({ state: "empty" });

        const firstItem = data.items[0];
        if (
            typeof firstItem !== "object" ||
            firstItem === null ||
            !("track" in firstItem) ||
            !isSpotifyTrack(firstItem.track)
        )
            return unavailable("recently-played-payload", res.status);

        return response({
            state: "last_played",
            track: {
                status: "Last Played",
                song: firstItem.track.name,
                artist: firstItem.track.artists
                    .slice(0, 2)
                    .map((artist) => artist.name)
                    .join(", "),
                artUrl: firstItem.track.album?.images?.[0]?.url,
                spotifyUrl: firstItem.track.external_urls?.spotify,
            },
        });
    } catch (error) {
        return unavailable(
            stage,
            error instanceof SpotifyRequestError ? error.status : undefined,
        );
    }
}
