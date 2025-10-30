import { Main } from "@/components/main";

export default async function Home() {
    let data = null;
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/spotify`);
        if (!res.ok) throw new Error("Failed to fetch Spotify data");
        data = await res.json();
    } catch (err) {
        console.log(err);
    }

    return <Main song={data} />;
}
