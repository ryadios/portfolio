export type SongData = {
    status: string;
    song: string;
    artist: string;
    artUrl?: string;
    spotifyUrl?: string;
};

export type SpotifyResponse =
    | { state: "last_played"; track: SongData }
    | { state: "empty" }
    | { state: "unavailable" };
