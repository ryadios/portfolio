import Image from "next/image";
import { config } from "../../../config";
import { Arrow } from "../arrow";
import { Button } from "../button";

export function Github() {
    return (
        <div className="size-full flex items-center justify-center bg-[#24292e] dark:bg-transparent">
            <Image
                src="/icons/github.svg"
                alt="github"
                width={48}
                height={48}
                className="github-icon"
            />
            <div className="absolute bottom-3.5 left-3.5">
                <Button variant="tooltip">
                    <a href={config.github} target="_blank">
                        <Arrow />
                    </a>
                </Button>
            </div>
        </div>
    );
}
