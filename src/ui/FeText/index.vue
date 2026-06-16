<script>
import { colorsList } from "@ui/lib.js";

/**
 * @typedef {Object} Theme
 * @property {Color} color
 * */

/**
 * @typedef {Object} ThemesList
 * @enum {Theme}
 * */
export const themes = {
    White: {
        color: colorsList.white,
    },
    Black: {
        color: colorsList.black,
    },
    Disabled: {
        color: colorsList.disabled,
    },
    Primary: {
        color: colorsList.primary,
    },
    Secondary: {
        color: colorsList.secondary,
    },
    Success: {
        color: colorsList.success,
    },
    Alert: {
        color: colorsList.alert,
    },
    Danger: {
        color: colorsList.danger,
    },
    Gray: {
        color: colorsList.gray,
    },
};

/**
 * @typedef {Object} Size
 * @property {HTMLElementTagNameMap} tag
 * @property {String} [classPrefix]
 * */

/**
 * @typedef {Object} SizeList
 * @enum {Size}
 * */
export const size = {
    H1: {
        tag: "p",
        classPrefix: "h1",
    },
    H2: {
        tag: "p",
        classPrefix: "h2",
    },
    H3: {
        tag: "p",
        classPrefix: "h3",
    },
    H4: {
        tag: "p",
        classPrefix: "h4",
    },
    Base: {
        tag: "p",
    },
    BaseRegular: {
        tag: "p",
        classPrefix: "regular",
    },
    Inline: {
        tag: "span",
    },
    Small: {
        tag: "small",
        classPrefix: "small",
    },
    SmallRegular: {
        tag: "small",
        classPrefix: "small-regular",
    },
};

/**
 * @typedef {String} Font
 * */

/**
 * @typedef {String} Align
 * */

/**
 * @typedef {Object} AlignList
 * @enum {Align}
 * */
export const align = {
    Left: "left",
    Center: "center",
    Right: "right",
};

export default {
    name: "FeText",

    functional: true,

    props: {

        /**
         * @type {Theme}
         * */
        theme: {
            type: Object,
            default: () => {
                return {};
            },
        },

        /**
         * @type {Align}
         * */
        align: {
            type: String,
        },

        /**
         * @type {Size}
         * */
        size: {
            type: Object,
            default: () => {
                return size.Base;
            },
        },

        html: {
            type: String,
        },
    },

    render(createElement, context) {
        const params = {
            class: {
                [context.data.staticClass]: context.data.staticClass,
                "fe-text": true,
                [`fe-text--${ context.props.theme.color }`]: context.props.theme.color,
                [`fe-text--${ context.props.size.classPrefix }`]: context.props.size.classPrefix,
                [`fe-text--text-${ context.props.align }`]: context.props.align,
                [context.props.size.classPrefix]: context.props.size.classPrefix,
            },
        };

        if (context.props.html) {
            params.domProps = {
                innerHTML: context.props.html,
            };
        }

        return createElement(context.props.size.tag, params, context.children);
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
