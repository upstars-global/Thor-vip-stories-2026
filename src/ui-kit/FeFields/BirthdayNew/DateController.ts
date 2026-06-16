import {
    MASK_MAP,
    PLACEHOLDER_MAP,
    DATE_FORMATS,
    DEFAULT_DATE_FORMAT,
    DAYJS_FORMAT_MAP, DateFormat, DatePartMap,
} from "@ui-kit/FeFields/BirthdayNew/dateConfig";
import dayjs from "dayjs";

function mapFormat(format: DateFormat, map: DatePartMap): string {
    return format.order.reduce((mask, part, index) => {
        if (index > 0) {
            mask += format.separator;
        }
        return mask + map[part];
    }, "");
}
function mapDayJSFormat(format: DateFormat): string {
    return mapFormat(format, DAYJS_FORMAT_MAP);
}
function fromToFormat(value: string, from: DateFormat, to: DateFormat) {
    const fromFormat = mapDayJSFormat(from);
    const toFormat = mapDayJSFormat(to);

    if (fromFormat === toFormat || !value) return value;

    const date = dayjs(value, fromFormat, true);
    if (!date.isValid()) return "";
    return date.format(toFormat);
}

export interface DateControllerParams {
    country: string;
}

export class DateController {
    private readonly format: DateFormat;

    constructor(params: DateControllerParams) {
        this.format = DATE_FORMATS.find((item) => {
            return item.countries.includes(params.country);
        })?.format || DEFAULT_DATE_FORMAT;
    }

    public getPlaceholder() {
        return mapFormat(this.format, PLACEHOLDER_MAP);
    }
    public getMask() {
        return mapFormat(this.format, MASK_MAP);
    }
    public formatToDefault(value: string) {
        return fromToFormat(value, this.format, DEFAULT_DATE_FORMAT);
    }
    public formatFromDefault(value: string) {
        return fromToFormat(value, DEFAULT_DATE_FORMAT, this.format);
    }
}
