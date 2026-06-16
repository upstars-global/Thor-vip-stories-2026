<script>
function setSrcset(src, num) {
    return src.replace("uploads", `resize/${ num }`);
}

function srcValue(context) {
    const src = context.props.src;

    if (context.props.srcset) {
        switch (context.props.type) {
            case "banner":
                return setSrcset(src, 720);
            case "compostelaBanner":
                return `${src}?dpr=1`;
            case "winners":
                return setSrcset(src, 136);
            case "game":
                return setSrcset(src, 200);
            default:
                return src;
        }
    }

    return src;
}

function srcsetValue(context) {
    const src = context.props.src;

    if (context.props.srcRetina) {
        const srcRetina = context.props.srcRetina;

        return `${ src } 1x, ${ srcRetina } 2x`;
    }

    if (context.props.srcset) {
        switch (context.props.type) {
            case "banner":
                return `${ setSrcset(src, 720) } 1x, ${ src } 2x`;
            case "compostelaBanner":
                return `${src}?dpr=1 1x, ${ src } 2x`;
            case "winners":
                return `${ setSrcset(src, 136) } 1054w`;
            case "game":
                return `${ setSrcset(src, 200) } 1x, ${ src } 2x`;
            default:
                return `${ setSrcset(src, 136) } 508w,
                 ${ setSrcset(src, 162) } 754w,
                 ${ setSrcset(src, 236) } 1054w,
                 ${ setSrcset(src, 298) } 1300w,
                 ${ setSrcset(src, 300) } 1792w`;
        }
    }
}

function isDef(val) {
    return val !== undefined && val !== null;
}

function stringifyArray(value) {
    let res = "";
    let stringified = "";
    for (let i = 0, length = value.length; i < length; i++) {
        // eslint-disable-next-line no-use-before-define
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
            if (res) {
                res = `${ res } `;
            }
            res = res + stringified;
        }
    }
    return res;
}

function stringifyObject(value) {
    let res = "";
    for (const key in value) {
        if (value[key]) {
            if (res) {
                res = `${res } `;
            }
            res = res + key;
        }
    }
    return res;
}

function stringifyClass(value) {
    if (Array.isArray(value)) {
        return stringifyArray(value);
    }
    if (typeof value === "object") {
        return stringifyObject(value);
    }
    if (typeof value === "string") {
        return value;
    }
    /* istanbul ignore next */
    return "";
}

export default {
    name: "FeImage",

    functional: true,

    props: {
        src: {
            type: String,
        },
        srcRetina: {
            type: String,
        },
        alt: {
            type: String,
        },
        svg: {
            type: String,
        },
        srcset: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
        },
        srcPlaceholder: {
            type: String,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
    },

    render(createElement, context) {
        const staticClass = context.data.staticClass || "";
        if (context.props.svg) {
            return createElement("div", {
                staticClass: `${ staticClass } ${ stringifyClass(context.data.class) }`,
                attrs:{
                    alt: context.props.alt,
                },
                domProps:{
                    innerHTML: context.props.svg,
                },
                on: {
                    ...context.listeners,
                },
            });
        }

        const src = srcValue(context);
        const srcset = srcsetValue(context);

        return createElement("img", {
            staticClass: `${ staticClass } ${ stringifyClass(context.data.class) }`,
            attrs: {
                src,
                srcset,
                alt: context.props.alt,
                width: context.props.width,
                height: context.props.height,
                loading: "lazy",
            },
            on: {
                ...context.listeners,
            },
        });
    },
};
</script>

<style lang="scss" src="./style.scss"></style>

