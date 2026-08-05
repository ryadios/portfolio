import { motion } from "framer-motion";
import { useState } from "react";
import { moranga } from "@/app/fonts";
import { Arrow } from "../arrow";
import { Button } from "../button";

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

    return (
        <div className="flex size-full flex-col items-center justify-between px-[44px] py-[40px]">
            <div>
                <h2 className={`${moranga.className} mb-1 font-bold text-2xl`}>
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
                className="no-drag mb-2 w-full rounded-none border-0 border-b-2 border-b-[rgb(240,242,248)] bg-transparent px-0 py-3 focus:outline-none dark:border-[rgb(48,54,61)]"
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
            <div className="flex w-full items-center justify-between">
                <Button
                    className="flex items-center justify-center font-medium"
                    onClick={handleSubmit}
                >
                    <Arrow />
                    <p className="ml-2 text-sm">Subscribe</p>
                </Button>
                <p className="font-medium text-sm tracking-tight">
                    <span className="hidden text-[#8a949e] lg:inline">
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
