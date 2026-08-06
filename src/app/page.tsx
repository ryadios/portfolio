import { Main } from "@/components/main";

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://ryadi.dev/#website",
            name: "Aditya",
            url: "https://ryadi.dev/",
            publisher: {
                "@id": "https://ryadi.dev/#person",
            },
        },
        {
            "@type": "Person",
            "@id": "https://ryadi.dev/#person",
            name: "Aditya",
            jobTitle: "Developer & Product Designer",
            url: "https://ryadi.dev/",
            sameAs: [
                "https://github.com/ryadios/",
                "https://www.linkedin.com/in/ryadi/",
                "https://x.com/ryadi_os",
            ],
        },
    ],
};

export default function Home() {
    return (
        <>
            <h1 className="sr-only">Aditya - Developer & Product Designer</h1>
            <script
                type="application/ld+json"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD contains no user input
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <Main />
        </>
    );
}
