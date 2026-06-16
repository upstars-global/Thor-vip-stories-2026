<script>
function srcsetValue(context) {
    if (context.props.srcRetina) {
        return `${ context.props.src } 1x, ${ context.props.srcRetina } 2x`;
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
                res = `${ res } `;
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
        type: {
            type: String,
        },
    },

    render(createElement, context) {
        const staticClass = context.data.staticClass || "";
        const src = context.props.src;
        const srcset = srcsetValue(context);
        return createElement("img", {
            staticClass: `${ staticClass } ${ stringifyClass(context.data.class) }`,
            attrs: {
                src,
                srcset,
                alt: context.props.alt,
                loading: "lazy",
            },
            on: {
                ...context.listeners,
            },
        });
    },
};
</script>

<style lang="scss">
object {
    pointer-events: none;
}
</style>
