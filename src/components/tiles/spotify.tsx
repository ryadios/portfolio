"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { moranga } from "@/app/fonts";
import { cn } from "@/lib/utils";
import type { SongData, SpotifyResponse } from "@/types/track";

function isSongData(value: unknown): value is SongData {
    return (
        typeof value === "object" &&
        value !== null &&
        "status" in value &&
        "song" in value &&
        "artist" in value &&
        typeof value.status === "string" &&
        typeof value.song === "string" &&
        typeof value.artist === "string"
    );
}

function isSpotifyResponse(value: unknown): value is SpotifyResponse {
    if (typeof value !== "object" || value === null || !("state" in value))
        return false;
    if (value.state === "unavailable") return true;
    if (value.state === "empty") return true;
    return (
        value.state === "last_played" &&
        "track" in value &&
        isSongData(value.track)
    );
}

type SpotifyView =
    | { state: "loading" }
    | { state: "last_played"; track: SongData }
    | { state: "empty" }
    | { state: "unavailable" };

const emptyTrack: SongData = {
    status: "No recent track",
    song: "Nothing to show",
    artist: "Play something on Spotify",
};

const unavailableTrack: SongData = {
    status: "Spotify unavailable",
    song: "Unable to check",
    artist: "Try again later",
};

export function Spotify() {
    const [view, setView] = useState<SpotifyView>({ state: "loading" });
    const loading = view.state === "loading";

    useEffect(() => {
        const controller = new AbortController();
        let active = true;
        let timedOut = false;
        const timeout = window.setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, 10_000);

        fetch("/api/spotify", { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) throw new Error("Spotify request failed");
                const data: unknown = await response.json();
                if (!isSpotifyResponse(data))
                    throw new Error("Invalid Spotify data");
                return data;
            })
            .then((data) => {
                if (!active) return;
                if (data.state === "unavailable") {
                    setView({ state: "unavailable" });
                    return;
                }
                if (data.state === "empty") {
                    setView({ state: "empty" });
                    return;
                }
                setView({
                    state: "last_played",
                    track: data.track,
                });
            })
            .catch((error: unknown) => {
                if (!active) return;
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError" &&
                    !timedOut
                )
                    return;
                setView({ state: "unavailable" });
            })
            .finally(() => window.clearTimeout(timeout));

        return () => {
            active = false;
            controller.abort();
            window.clearTimeout(timeout);
        };
    }, []);

    const resolvedSong =
        view.state === "last_played"
            ? view.track
            : view.state === "empty"
              ? emptyTrack
              : unavailableTrack;
    const neutral = view.state === "empty" || view.state === "unavailable";

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

            <div className="relative min-h-[76px]" aria-busy={loading}>
                <div
                    aria-hidden="true"
                    className={cn(
                        "transition-opacity duration-[180ms] ease-out motion-reduce:transition-none",
                        loading
                            ? "opacity-100"
                            : "pointer-events-none opacity-0",
                    )}
                >
                    <div className="mb-2 h-5 w-28 rounded-md bg-muted" />
                    <div className="mb-1 h-8 w-3/4 rounded-md bg-muted" />
                    <div className="h-5 w-1/2 rounded-md bg-muted" />
                </div>

                <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-hidden={loading}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-[180ms] ease-out motion-reduce:transition-none",
                        loading
                            ? "pointer-events-none opacity-0"
                            : "opacity-100",
                    )}
                >
                    <div
                        className={cn(
                            "spotify-text mb-0 flex items-center",
                            neutral && "text-muted-foreground",
                        )}
                    >
                        <div
                            aria-hidden="true"
                            className="spotify-bars mr-2 flex h-5 items-center"
                        >
                            <span className="spotify-indicator-bar spotify-indicator-bar-1" />
                            <span className="spotify-indicator-bar spotify-indicator-bar-2" />
                            <span className="spotify-indicator-bar spotify-indicator-bar-3" />
                        </div>
                        <p className="font-medium lg:text-sm">
                            {resolvedSong.status}
                        </p>
                    </div>
                    <h2
                        className={`${moranga.className} w-full text-ellipsis font-bold text-2xl leading-[32px] sm:overflow-hidden sm:truncate sm:whitespace-nowrap`}
                    >
                        {resolvedSong.song}
                    </h2>

                    <p className="text-sm">{resolvedSong.artist}</p>
                </div>
            </div>
        </div>
    );
}
