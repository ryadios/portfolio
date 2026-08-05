export type SongData = {
    status: string;
    song: string;
    artist: string;
};

export type SpotifyResponse =
    | { state: "last_played"; track: SongData }
    | { state: "empty" }
    | { state: "unavailable" };
