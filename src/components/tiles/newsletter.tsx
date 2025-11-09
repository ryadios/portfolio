import { moranga } from "@/app/fonts";
import { Arrow } from "../arrow";
import { Button } from "../button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [shake, setShake] = useState(false);

    const handleSubmit = () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValid) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        } else {
            // handle valid submission here
        }
    };

    const shakeKeyframes = [0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0];

    return (
        <div className="py-[40px] px-[44px] size-full flex flex-col justify-between items-center">
            <div>
                <h2 className={`${moranga.className} font-bold text-2xl mb-1`}>
                    Shall I keep you in the loop?
                </h2>
                <p className="leading-[26px]">
                    Content includes articles, early access to products, and
                    ongoing learnings.
                </p>
            </div>
            <motion.input
                key="email-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="no-drag w-full bg-transparent border-0 border-b-2 border-b-[rgb(240,242,248)] dark:border-[rgb(48,54,61)] py-3 px-0 mb-2 rounded-none focus:outline-none"
                spellCheck={false}
                animate={
                    shake ? { x: [0, 4.6, -4.6, 4.6, -4.6, 4.6, 0] } : { x: 0 }
                }
                transition={{
                    duration: 0.5,
                    ease: "linear",
                    times: [0, 1 / 6, 3 / 6, 5 / 6, 1],
                }}
            />
            <div className="w-full flex justify-between items-center">
                <Button
                    className="flex justify-center items-center font-medium"
                    onClick={handleSubmit}
                >
                    <Arrow />
                    <p className="text-sm ml-2">Subscribe</p>
                </Button>
                <p className="tracking-tight font-medium text-sm">
                    <span className="hidden lg:inline text-[#8a949e]">
                        You&apos;ll be subscriber number{" "}
                    </span>
                    <span className={`${moranga.className} font-bold text-2xl`}>
                        0
                    </span>
                    <span className="inline lg:hidden"> subscribers</span>
                </p>
            </div>
        </div>
    );
}
