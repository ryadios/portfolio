"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { moranga } from "@/app/fonts";
import { cn } from "@/lib/utils";
import type { SongData, SpotifyResponse } from "@/types/track";

function isSongData(value: unknown): value is SongData {
    if (
        typeof value === "object" &&
        value !== null &&
        "status" in value &&
        "song" in value &&
        "artist" in value &&
        typeof value.status === "string" &&
        typeof value.song === "string" &&
        typeof value.artist === "string"
    )
        return true;
    return false;
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
    const shouldReduceMotion = useReducedMotion();
    const loading = view.state === "loading";
    const fadeTransition = {
        duration: shouldReduceMotion ? 0 : 0.18,
        ease: [0.23, 1, 0.32, 1] as const,
    };

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
    const lastPlayedTrack =
        view.state === "last_played" ? view.track : undefined;
    const artworkCandidate = lastPlayedTrack?.artUrl;
    const artworkUrl =
        typeof artworkCandidate === "string" &&
        artworkCandidate.startsWith("https://i.scdn.co/")
            ? artworkCandidate
            : undefined;
    const spotifyCandidate = lastPlayedTrack?.spotifyUrl;
    const spotifyUrl =
        typeof spotifyCandidate === "string" &&
        spotifyCandidate.startsWith("https://open.spotify.com/")
            ? spotifyCandidate
            : undefined;

    return (
        <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-xl p-10 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-xl after:content-[''] md:p-8 lg:p-9 dark:after:shadow-[inset_0_0_0_2px_rgb(48_54_61)]">
            <Image
                src="/icons/spotify.svg"
                alt="Spotify Icon"
                width={72}
                height={72}
                className="spotify-icon h-auto"
                priority
            />

            {lastPlayedTrack && artworkUrl && spotifyUrl ? (
                <motion.a
                    key={artworkUrl}
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${lastPlayedTrack.song} on Spotify`}
                    className="no-drag absolute -top-9 -right-9 z-0 block aspect-square size-[148px] overflow-hidden rounded-full bg-card shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)] min-[800px]:max-[1200px]:top-1/2 min-[800px]:max-[1200px]:right-[-75px] min-[800px]:max-[1200px]:h-[110%] min-[800px]:max-[1200px]:w-auto min-[800px]:max-[1200px]:-translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={fadeTransition}
                >
                    <span className="absolute inset-0 block animate-[spin_8s_linear_infinite] overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_20%),_inset_-10px_-14px_20px_rgb(0_0_0_/_18%)] motion-reduce:animate-none">
                        <Image
                            src={artworkUrl}
                            alt=""
                            fill
                            sizes="225px"
                            className="rounded-[inherit] object-cover"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute top-1/2 left-1/2 flex size-[20%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#9aa1ab] shadow-[inset_0_-1px_2px_rgb(0_0_0_/_20%)]"
                        >
                            <span
                                aria-hidden="true"
                                className="size-1/2 rounded-full bg-[#20242a]"
                            />
                        </span>
                    </span>
                </motion.a>
            ) : null}

            <div className="grid" aria-busy={loading}>
                <AnimatePresence initial={false} mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            aria-hidden="true"
                            className="relative z-[1] col-start-1 row-start-1 min-[800px]:max-[1200px]:pr-36"
                            exit={{ opacity: 0 }}
                            transition={fadeTransition}
                        >
                            <div className="mb-2 h-5 w-28 rounded-md bg-muted" />
                            <div className="mb-1 h-8 w-3/4 rounded-md bg-muted" />
                            <div className="h-5 w-1/2 rounded-md bg-muted" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className="relative z-[1] col-start-1 row-start-1 min-[800px]:max-[1200px]:pr-36"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={fadeTransition}
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
                                className={`${moranga.className} w-full text-ellipsis font-bold text-2xl leading-8 sm:overflow-hidden sm:truncate sm:whitespace-nowrap`}
                            >
                                {resolvedSong.song}
                            </h2>

                            <p className="text-sm">{resolvedSong.artist}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
