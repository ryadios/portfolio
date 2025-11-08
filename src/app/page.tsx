import { Main } from "@/components/main";

export default async function Home() {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");

    try {
        const res = await fetch(`${baseUrl}/api/spotify`);
        if (!res.ok) throw new Error("Failed to fetch Spotify data");
        const data = await res.json();
        return <Main song={data} />;
    } catch (err) {
        console.log(err);
        return null;
    }
}
