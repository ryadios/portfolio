"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export function DarkMode() {
    const { theme, setTheme } = useTheme();

    const moonDelay = theme === "dark" ? 0.25 : 0;
    const sunDelay = theme === "light" ? 0.25 : 0;

    return (
        <div className="size-full flex justify-center items-center">
            <div
                className="no-drag w-20 h-12 flex items-center rounded-[40px] relative bg-[#f0f2f8] dark:bg-muted dark:shadow-[inset_0_0_0_2px_rgb(48,54,61)]"
                onClick={() =>
                    theme === "light" ? setTheme("dark") : setTheme("light")
                }
            >
                <motion.div
                    initial={false}
                    animate={{
                        x: theme === "dark" ? 38 : 6,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 15,
                        // This easing slows the middle of the motion slightly
                        ease: [0.65, 0.05, 0.36, 1],
                        duration: 0.55,
                    }}
                    className="size-9 rounded-[30px] flex items-center justify-center bg-[#0d1117]"
                >
                    <AnimatePresence mode="wait">
                        {theme === "light" ? (
                            <motion.svg
                                key="moon"
                                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                                animate={{
                                    rotate: 0,
                                    scale: 1,
                                    opacity: 1,
                                }}
                                exit={{
                                    rotate: 90,
                                    scale: 0,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                    delay: moonDelay,
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="19"
                                viewBox="0 0 17 19"
                            >
                                <path
                                    d="M36.7,18.974a9.469,9.469,0,0,0,7.369-3.513.445.445,0,0,0-.428-.717A7.432,7.432,0,0,1,38.571.982a.445.445,0,0,0-.139-.824A9.488,9.488,0,1,0,36.7,18.974Z"
                                    transform="translate(-27.211)"
                                    fill="#ffe3a4"
                                />
                            </motion.svg>
                        ) : (
                            <motion.svg
                                key="sun"
                                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                                animate={{
                                    rotate: 0,
                                    scale: 1,
                                    opacity: 1,
                                }}
                                exit={{
                                    rotate: 90,
                                    scale: 0,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                    delay: sunDelay,
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    id="icons8-sun_1_"
                                    data-name="icons8-sun (1)"
                                    d="M12,0a.945.945,0,0,0-1,1V2a1,1,0,0,0,2,0V1A.945.945,0,0,0,12,0ZM4.2,3.2a.986.986,0,0,0-.7.3.967.967,0,0,0,0,1.4l.7.7A.99.99,0,0,0,5.6,4.2l-.7-.7A.991.991,0,0,0,4.2,3.2Zm15.6,0a.991.991,0,0,0-.7.3l-.7.7a.99.99,0,0,0,1.4,1.4l.7-.7a.967.967,0,0,0,0-1.4A.986.986,0,0,0,19.8,3.2ZM12,5a7,7,0,1,0,7,7,7,7,0,0,0-7-7ZM1,11a1,1,0,0,0,0,2H2a1,1,0,0,0,0-2Zm21,0a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM4.9,18.1a.991.991,0,0,0-.7.3l-.7.7a.99.99,0,0,0,1.4,1.4l.7-.7a.967.967,0,0,0,0-1.4A.986.986,0,0,0,4.9,18.1Zm14.2,0a.986.986,0,0,0-.7.3.967.967,0,0,0,0,1.4l.7.7a.99.99,0,0,0,1.4-1.4l-.7-.7A.991.991,0,0,0,19.1,18.1ZM12,21a.945.945,0,0,0-1,1v1a1,1,0,0,0,2,0V22A.945.945,0,0,0,12,21Z"
                                    fill="#ffe3a4"
                                />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
