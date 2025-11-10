import Image from "next/image";
import { config } from "../../../config";
import { Arrow } from "../arrow";
import { Button } from "../button";
import { Tooltip } from "../tooltip";

export function Github() {
    return (
        <div
            className="size-full flex items-center justify-center bg-[#24292e]
                dark:bg-transparent"
        >
            <Image
                src="/icons/github.svg"
                alt="github"
                width={48}
                height={48}
                className="github-icon"
            />
            <Tooltip className="size-8" href={config.github} target="_blank">
                <Arrow />
            </Tooltip>
        </div>
    );
}
