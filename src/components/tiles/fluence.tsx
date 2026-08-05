"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { config } from "../../../config";
import { Arrow } from "../arrow";
import { Tooltip } from "../tooltip";

export function Fluence() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="group relative flex size-full items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                src="/images/fluence.webp"
                alt="fluence"
                width={1280}
                height={720}
                sizes="(max-width: 799px) 100vw, 50vw"
                className="absolute top-0 left-0 size-full object-cover transition-transform duration-800 group-hover:scale-105"
            />
            <Tooltip hovered={hovered} href={config.projects.fluence}>
                <motion.p
                    initial={false}
                    animate={
                        hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
                    }
                    transition={
                        hovered
                            ? { delay: 0.3, duration: 0.3 }
                            : { delay: 0, duration: 0.3 }
                    }
                    className="mr-8 ml-4 whitespace-nowrap text-sm"
                >
                    Fluence
                </motion.p>
                <div
                    className={cn(
                        `absolute right-0 flex size-9 items-center justify-center`,
                    )}
                >
                    <Arrow />
                </div>
            </Tooltip>
        </div>
    );
}
