import Image, { ImageProps } from "next/image";

export function Arrow(
    props: Omit<ImageProps, "src" | "alt" | "width" | "height">
) {
    return (
        <Image
            {...props}
            src="/icons/arrow.svg"
            alt="arrow"
            width={18.25}
            height={18.25}
            className="dark:invert"
        />
    );
}
