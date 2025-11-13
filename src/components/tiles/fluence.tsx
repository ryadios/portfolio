"use client";

import { Arrow } from "../arrow";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltip";
import Image from "next/image";
import { config } from "../../../config";

export function Fluence() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="group relative flex size-full items-center
                justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                src="/images/fluence.png"
                alt="fluence"
                width={1161}
                height={564}
                className="absolute top-0 left-0 size-full object-cover
                    transition-transform duration-800 group-hover:scale-105"
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
                    className="mr-8 ml-4 text-sm whitespace-nowrap"
                >
                    Fluence
                </motion.p>
                <div
                    className={cn(
                        `absolute right-0 flex size-9 items-center
                        justify-center`
                    )}
                >
                    <Arrow />
                </div>
            </Tooltip>
        </div>
    );
}
