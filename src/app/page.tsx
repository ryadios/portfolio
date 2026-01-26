export const dynamic = "force-dynamic";

import { Main } from "@/components/main";

export default async function Home() {
    try {
        const res = await fetch("/api/spotify", {
            cache: "no-store"
        });
        if (!res.ok) throw new Error("Failed to fetch Spotify data");
        const data = await res.json();

        return <Main song={data} />;
    } catch (err) {
        console.log(err);
        return null;
    }
}
