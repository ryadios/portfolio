const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function getAccessToken() {
    const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
        }),
        cache: "no-store",
    });
    const data = await res.json();
    if (!data.access_token) throw new Error("Invalid Spotify token");
    return data.access_token;
}
