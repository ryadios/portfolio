const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOKEN_SAFETY_WINDOW_MS = 60_000;

let cachedAccessToken: {
    value: string;
    expiresAt: number;
} | null = null;

export class SpotifyRequestError extends Error {
    readonly status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "SpotifyRequestError";
        this.status = status;
    }
}

export async function getAccessToken(signal?: AbortSignal) {
    const now = Date.now();
    if (
        cachedAccessToken &&
        cachedAccessToken.expiresAt > now + TOKEN_SAFETY_WINDOW_MS
    ) {
        return cachedAccessToken.value;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken)
        throw new SpotifyRequestError("Spotify credentials are missing");

    const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`,
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        cache: "no-store",
        signal,
    });

    if (!res.ok)
        throw new SpotifyRequestError(
            "Spotify token request failed",
            res.status,
        );

    const data: unknown = await res.json();
    if (
        typeof data !== "object" ||
        data === null ||
        !("access_token" in data) ||
        typeof data.access_token !== "string" ||
        data.access_token.length === 0 ||
        !("expires_in" in data) ||
        typeof data.expires_in !== "number" ||
        !Number.isFinite(data.expires_in) ||
        data.expires_in <= 0
    )
        throw new SpotifyRequestError("Invalid Spotify token", res.status);

    cachedAccessToken = {
        value: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
    };

    return data.access_token;
}
