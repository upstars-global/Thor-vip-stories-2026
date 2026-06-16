<script>
import { colorsList } from "../lib";

/**
 * @typedef {Object} Theme
 * @property {Color} color
 * */

/**
 * @typedef {Object} ThemesList
 * @enum {Theme}
 * */
export const themes = {
    Primary: {
        color: colorsList.primary,
    },
    Secondary: {
        color: colorsList.secondary,
    },
};

export default {
    name: "FeLink",

    functional: true,

    props: {

        /**
         * @type {Theme}
         * */
        theme: {
            type: Object,
            default: () => {
                return themes.Secondary;
            },
        },
        to: {
            type: Object | String,
            default: () => {
                return {};
            },
        },

        classLink: {
            type: String,
            default: "",
        },
    },

    render(createElement, context) {
        return createElement(
            "router-link",
            {
                class: {
                    "fe-link": true,
                    [`fe-link--${ context.props.theme.color }`]: context.props.theme.color,
                    [context.props.classLink]: true,
                    [context.data.staticClass]: context.data.staticClass,
                },
                props: {
                    ...context.data.attrs,
                    to: context.props.to,
                },
                nativeOn: context.listeners,
            },
            context.children,
        );
    },
};
</script>
<style src="./style.scss"></style>
