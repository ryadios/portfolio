import Image from "next/image";
import { moranga } from "@/app/fonts";
import { Button } from "../button";

export function AboutMe() {
    return (
        <div className="flex size-full flex-col items-start justify-end gap-6 overflow-hidden px-8 py-6 sm:px-10 sm:py-8">
            <div className="pointer-events-none flex items-center justify-between">
                <Image
                    src="/images/cat-profile.png"
                    alt="memoji"
                    className="size-[50px] max-h-32 sm:size-[100px]"
                    width={100}
                    height={100}
                />
            </div>
            <p className="text-[13px] leading-6 sm:text-sm sm:leading-6.5">
                I&apos;m{" "}
                <span className={`${moranga.className} font-bold text-3xl`}>
                    aditya
                </span>
                , a developer and product designer from India. I&apos;m
                interested in React, Node, Product Design, Nextjs, Design,
                Linux, Startups and Music.
            </p>
            <Button
                onClick={() => {}} // TODO
                className="absolute top-5 right-5 flex items-center font-medium"
            >
                <svg
                    aria-hidden="true"
                    id="Arrow_Rotate.2"
                    data-name="Arrow, Rotate.2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.702"
                    height="15.702"
                    viewBox="0 0 15.702 15.702"
                    className="dark:invert"
                >
                    <g
                        id="Group_6"
                        data-name="Group 6"
                        transform="translate(2.62 2.617)"
                    >
                        <path
                            id="Path_5"
                            data-name="Path 5"
                            d="M14.8,12.032a5.229,5.229,0,0,1-9.824,2.482"
                            transform="translate(-4.34 -6.777)"
                            fill="none"
                            stroke="#0D1117"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.4"
                        ></path>
                        <path
                            id="Path_6"
                            data-name="Path 6"
                            d="M4,9.149A5.231,5.231,0,0,1,13.83,6.731"
                            transform="translate(-4.004 -4)"
                            fill="none"
                            stroke="#0D1117"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.4"
                        ></path>
                        <path
                            id="Path_7"
                            data-name="Path 7"
                            d="M15.953,6.952h2.313V4.639"
                            transform="translate(-8.135 -4.221)"
                            fill="none"
                            stroke="#0D1117"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.4"
                        ></path>
                        <path
                            id="Path_8"
                            data-name="Path 8"
                            d="M6.825,15.825H4.512v2.313"
                            transform="translate(-4.18 -8.088)"
                            fill="none"
                            stroke="#0D1117"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.4"
                        ></path>
                    </g>
                    <path
                        id="Path_9"
                        data-name="Path 9"
                        d="M0,0H15.7V15.7H0Z"
                        fill="none"
                    ></path>
                </svg>
                <p className="ml-1.5">Toggle Lockdown</p>
            </Button>
        </div>
    );
}
