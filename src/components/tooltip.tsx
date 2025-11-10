import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface TooltipProps extends HTMLMotionProps<"a"> {
    children: React.ReactNode;
    hovered?: boolean;
}

export function Tooltip({
    children,
    hovered,
    className,
    ...props
}: TooltipProps) {
    const motionProps: Partial<HTMLMotionProps<"a">> =
        hovered !== undefined
            ? {
                  animate: { width: hovered ? "auto" : 36 },
                  initial: false,
                  transition: {
                      duration: 0.5,
                      ease: [0.85, 0, 0.3, 1],
                  },
              }
            : {};
    return (
        <motion.a
            target="_blank"
            {...motionProps}
            {...props}
            className={cn(
                `absolute bottom-3.5 left-3.5 z-10 flex size-9 items-center
                justify-center overflow-hidden rounded-full bg-white
                transition-shadow duration-200 ease-out
                hover:[box-shadow:rgb(255_255_255)_0_0_0_1px,rgba(255_255_255/0.5)_0_0_0_6px]
                dark:bg-[#0d1117] dark:shadow-[0_0_0_2px_rgb(48,54,61)]
                dark:hover:shadow-[0_0_0_5px_rgb(48,54,61)]`,
                className
            )}
        >
            {children}
        </motion.a>
    );
}
