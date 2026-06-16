import { COUNTRIES } from "@theme/configs/constsLocales";

export enum DatePart {
    DAY = "D",
    MONTH = "M",
    YEAR = "Y",
}

export type DatePartMap = Record<DatePart, string>;

export const MASK_MAP: DatePartMap = {
    [DatePart.DAY]: "##",
    [DatePart.MONTH]: "##",
    [DatePart.YEAR]: "####",
};
export const PLACEHOLDER_MAP: DatePartMap = {
    [DatePart.DAY]: "DD",
    [DatePart.MONTH]: "MM",
    [DatePart.YEAR]: "YYYY",
};
export const DAYJS_FORMAT_MAP: DatePartMap = {
    [DatePart.DAY]: "DD",
    [DatePart.MONTH]: "MM",
    [DatePart.YEAR]: "YYYY",
};

export interface DateFormat {
    order: DatePart[];
    separator: string;
}

export interface DateFormatItem {
    format: DateFormat;
    countries: string[];
}

export const DEFAULT_DATE_FORMAT: DateFormat = { // Y-M-D
    order: [DatePart.YEAR, DatePart.MONTH, DatePart.DAY],
    separator: "-",
};

export const DATE_FORMATS: DateFormatItem[] = [
    {
        format: { // D/M/Y
            order: [DatePart.DAY, DatePart.MONTH, DatePart.YEAR],
            separator: "/",
        },
        countries: [
            COUNTRIES.AUSTRALIA,
            COUNTRIES.BRASILIA,
            COUNTRIES.INDIA,
            COUNTRIES.NEW_ZEALAND,
            COUNTRIES.ENGLAND,
            COUNTRIES.AUSTRIA,
        ],
    },
    {
        format: { // M/D/Y
            order: [DatePart.MONTH, DatePart.DAY, DatePart.YEAR],
            separator: "/",
        },
        countries: [
            COUNTRIES.USA,
        ],
    },
    {
        format: { // D.M.Y
            order: [DatePart.DAY, DatePart.MONTH, DatePart.YEAR],
            separator: ".",
        },
        countries: [
            COUNTRIES.GERMANY,
        ],
    }
];
