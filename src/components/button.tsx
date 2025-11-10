"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "default" | "tooltip";
}

const buttonVariants = {
    base: "no-drag transition-shadow duration-200 ease-out cursor-pointer",
    default:
        "h-9 px-3 rounded-xl text-sm [box-shadow:0_0_0_2px_rgb(240,242,248)] hover:[box-shadow:0_0_0_5px_rgb(240,242,248)] dark:shadow-[0_0_0_2px_rgb(48,54,61)] dark:hover:shadow-[0_0_0_5px_rgb(48,54,61)]",
    tooltip:
        "h-8 bg-white dark:bg-[#0d1117] rounded-full flex items-center justify-center z-10 transition-shadow duration-200 ease-out hover:[box-shadow:rgb(255_255_255)_0_0_0_1px,rgba(255_255_255_/_0.5)_0_0_0_6px] dark:shadow-[0_0_0_2px_rgb(48,54,61)] dark:hover:shadow-[0_0_0_5px_rgb(48,54,61)]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    buttonVariants.base,
                    buttonVariants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
