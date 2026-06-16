<template>
    <div
        class="fe-card"
        :class="{
            [`fe-card--${ theme.color }`]: theme.color,
            'fe-card--shadow': shadow,
            'fe-card--border': border,
        }"
        :[padding]="padding"
    >
        <slot />
    </div>
</template>

<script>
import { colorsList } from "../lib";

/**
 * @static
 * @typedef {Object} Theme
 * @property {Color} color
 * */

/**
 * @static
 * @cons
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
    Success: {
        color: colorsList.success,
    },
    Alert: {
        color: colorsList.alert,
    },
    Danger: {
        color: colorsList.danger,
    },
    Disabled: {
        color: colorsList.disabled,
    },
    White: {
        color: colorsList.white,
    },
    Dark: {
        color: colorsList.dark,
    },
    SecondaryDark: {
        color: colorsList.blueLight,
    },
};

/**
 * @static
 * @cons
 * @typedef {Object} PaddingSizes
 * */
export const PaddingSizes = {
    paddingXS: "padding-xs",
    paddingS: "padding-s",
    paddingM: "padding-m",
    paddingEmpty: "",
};

export default {
    name: "FeCard",

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
         * @type {Boolean}
         * */
        shadow: {
            type: Boolean,
            default: false,
        },

        /**
         * @type {Boolean}
         * */
        border: {
            type: Boolean,
            default: false,
        },

        /**
         * @type {PaddingSizes}
         * */
        padding: {
            type: String,
            default: PaddingSizes.paddingEmpty,
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
