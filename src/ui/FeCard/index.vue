<template>
    <div
        class="fe-card"
        :class="{
            [`fe-card--${ theme.color }`]: theme.color,
            'fe-card--shadow': shadow,
            'fe-card--border': border,
            [`fe-card--${ borderRadius }`]: borderRadius,
        }"
        :[padding]="padding"
    >
        <slot />
    </div>
</template>

<script>
import { colorsList } from "@ui/lib.js";

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
        color: colorsList.secondaryDark,
    },
    Black: {
        color: colorsList.black,
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


export const BorderSizes = {
    borderRadiusXS: "border-radius-xs",
    borderRadiusS: "border-radius-s",
    borderRadiusM: "border-radius-m",
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

        borderRadius: {
            type: String,
            default: BorderSizes.borderRadiusS,
        },


    },
};
</script>

<style lang="scss" src="./style.scss"></style>
