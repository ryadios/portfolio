export const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

interface Item {
    i: (typeof keys)[number];
    x: number;
    y: number;
    w: number;
    h: number;
    disabled?: boolean;
}

export const HomeLayouts: { lg: Item[]; xs: Item[] } = {
    lg: [
        { i: "a", x: 0, y: 0, w: 2, h: 1 },
        { i: "b", x: 2, y: 0, w: 1, h: 1 },
        { i: "c", x: 3, y: 0, w: 1, h: 2 },
        { i: "d", x: 0, y: 2, w: 1, h: 1 },
        { i: "e", x: 1, y: 2, w: 1, h: 1 },
        { i: "f", x: 3, y: 2, w: 1, h: 1 },
        { i: "g", x: 0, y: 3, w: 2, h: 1 },
        { i: "h", x: 2, y: 3, w: 1, h: 2 },
        { i: "i", x: 0, y: 3, w: 2, h: 1 },
        { i: "j", x: 3, y: 3, w: 2, h: 1 },
    ],
    xs: [
        { i: "a", x: 0, y: 0, w: 2, h: 1 },
        { i: "b", x: 0, y: 1, w: 1, h: 1 },
        { i: "c", x: 0, y: 7, w: 1, h: 1 },
        { i: "d", x: 0, y: 3, w: 1, h: 1 },
        { i: "e", x: 1, y: 4, w: 1, h: 1 },
        { i: "f", x: 0, y: 2, w: 1, h: 1 },
        { i: "g", x: 1, y: 12, w: 2, h: 1 },
        { i: "h", x: 0, y: 9, w: 2, h: 1 },
        { i: "i", x: 0, y: 5, w: 1, h: 1 },
        { i: "j", x: 3, y: 4, w: 2, h: 1 },
    ],
};

export const AboutLayouts = {
    lg: [
        { i: "a", x: 0, y: 0, w: 2, h: 1 },
        { i: "b", x: 2, y: 0, w: 1, h: 1 },
        { i: "c", x: 3, y: 1, w: 1, h: 2, disabled: true },
        { i: "d", x: 0, y: 2, w: 1, h: 1, disabled: true },
        { i: "e", x: 3, y: 0, w: 1, h: 1 },
        { i: "f", x: 1, y: 2, w: 1, h: 1, disabled: true },
        { i: "g", x: 0, y: 3, w: 2, h: 1, disabled: true },
        { i: "h", x: 2, y: 3, w: 1, h: 2, disabled: true },
        { i: "i", x: 0, y: 3, w: 2, h: 1, disabled: true },
        { i: "j", x: 3, y: 4, w: 2, h: 1, disabled: true },
    ],
    xs: [
        { i: "b", x: 0, y: 0, w: 2, h: 1 },
        { i: "i", x: 2, y: 0, w: 1, h: 1 },
        { i: "g", x: 0, y: 5, w: 1, h: 1 },
        { i: "c", x: 0, y: 1, w: 1, h: 1 },
        { i: "h", x: 1, y: 4, w: 1, h: 1 },
        { i: "f", x: 2, y: 2, w: 1, h: 1 },
        { i: "e", x: 0, y: 4, w: 2, h: 1 },
        { i: "d", x: 2, y: 4, w: 1, h: 1 },
        { i: "a", x: 2, y: 4, w: 3, h: 1 },
    ],
};

export const ProjectLayouts = {
    lg: [
        { i: "a", x: 0, y: 1, w: 2, h: 1, disabled: true },
        { i: "b", x: 2, y: 1, w: 1, h: 1, disabled: true },
        { i: "c", x: 3, y: 0, w: 1, h: 2 },
        { i: "d", x: 0, y: 2, w: 1, h: 1, disabled: true },
        { i: "e", x: 1, y: 2, w: 1, h: 1, disabled: true },
        { i: "f", x: 3, y: 2, w: 1, h: 1, disabled: true },
        { i: "g", x: 0, y: 3, w: 2, h: 1, disabled: true },
        { i: "h", x: 2, y: 0, w: 1, h: 2 },
        { i: "i", x: 0, y: 0, w: 2, h: 1 },
        { i: "j", x: 3, y: 4, w: 2, h: 1, disabled: true },
    ],
    xs: [
        { i: "l", x: 0, y: 0, w: 2, h: 1 },
        { i: "i", x: 2, y: 0, w: 1, h: 1 },
        { i: "g", x: 0, y: 0, w: 1, h: 1 },
        { i: "c", x: 0, y: 1, w: 1, h: 1 },
        { i: "d", x: 1, y: 1, w: 1, h: 1 },
        { i: "f", x: 2, y: 1, w: 1, h: 1 },
        { i: "j", x: 1, y: 1, w: 2, h: 1 },
        { i: "e", x: 0, y: 3, w: 2, h: 1 },
        { i: "a", x: 0, y: 4, w: 1, h: 1 },
        { i: "b", x: 2, y: 4, w: 1, h: 1 },
        { i: "h", x: 2, y: 4, w: 3, h: 1 },
        { i: "k", x: 2, y: 2, w: 1, h: 1 },
        { i: "m", x: 2, y: 2, w: 1, h: 1 },
        { i: "n", x: 2, y: 2, w: 1, h: 1 },
    ],
};

export const MediaLayouts = {
    lg: [
        { i: "a", x: 0, y: 3, w: 2, h: 1, disabled: true },
        { i: "b", x: 1, y: 1, w: 1, h: 1, disabled: true },
        { i: "c", x: 3, y: 0, w: 1, h: 2, disabled: true },
        { i: "d", x: 0, y: 2, w: 1, h: 1 },
        { i: "e", x: 3, y: 3, w: 1, h: 1, disabled: true },
        { i: "f", x: 2, y: 3, w: 1, h: 1, disabled: true },
        { i: "g", x: 0, y: 0, w: 2, h: 1 },
        { i: "h", x: 2, y: 1, w: 1, h: 2, disabled: true },
        { i: "i", x: 0, y: 2, w: 2, h: 1, disabled: true },
        { i: "j", x: 3, y: 0, w: 2, h: 1 },
    ],
    xs: [
        { i: "k", x: 1, y: 1, w: 2, h: 1 },
        { i: "i", x: 2, y: 2, w: 1, h: 1 },
        { i: "g", x: 0, y: 0, w: 1, h: 1 },
        { i: "j", x: 0, y: 3, w: 1, h: 1 },
        { i: "h", x: 0, y: 0, w: 1, h: 1 },
        { i: "f", x: 2, y: 1, w: 1, h: 1 },
        { i: "c", x: 0, y: 1, w: 2, h: 1 },
        { i: "e", x: 0, y: 3, w: 2, h: 1 },
        { i: "b", x: 0, y: 4, w: 1, h: 1 },
        { i: "d", x: 2, y: 3, w: 1, h: 1 },
        { i: "a", x: 2, y: 2, w: 3, h: 1 },
        { i: "l", x: 0, y: 1, w: 1, h: 1 },
        { i: "m", x: 0, y: 1, w: 1, h: 1 },
        { i: "n", x: 0, y: 1, w: 1, h: 1 },
    ],
};
