import { motion } from "framer-motion";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: ReactNode;
    hovered?: boolean;
    className?: string;
    href?: string;
    rel?: string;
    target?: HTMLAttributeAnchorTarget;
    "aria-label"?: string;
}

export function Tooltip({
    children,
    hovered,
    className,
    href,
    rel,
    target,
    ...props
}: TooltipProps) {
    const motionProps =
        hovered !== undefined
            ? {
                  animate: { width: hovered ? "auto" : 36 },
                  initial: false,
                  transition: {
                      duration: 0.5,
                      ease: [0.85, 0, 0.3, 1] as const,
                  },
              }
            : {};
    const tooltipClassName = cn(
        `absolute bottom-3.5 left-3.5 z-10 flex size-9 items-center justify-center overflow-hidden rounded-full bg-white transition-shadow duration-200 ease-out dark:bg-[#0d1117] dark:shadow-[0_0_0_2px_rgb(48,54,61)] dark:hover:shadow-[0_0_0_5px_rgb(48,54,61)] hover:[box-shadow:rgb(255_255_255)_0_0_0_1px,rgba(255_255_255/0.5)_0_0_0_6px]`,
        className,
    );

    if (!href) {
        return (
            <motion.div
                aria-hidden="true"
                {...motionProps}
                {...props}
                className={tooltipClassName}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.a
            href={href}
            target={target ?? "_blank"}
            rel={rel ?? "noreferrer"}
            {...motionProps}
            {...props}
            className={tooltipClassName}
        >
            {children}
        </motion.a>
    );
}
