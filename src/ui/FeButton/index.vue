<template>
    <button
        class="fe-button"
        :type="buttonType"
        :class="classes"
        :disabled="disabled || waiting"
        @click="clickHandler"
    >
        <FeIcon v-if="waiting" :icon="icons.outline.loader" class="fe-button__icon fe-button__loading" />
        <FeIcon v-else-if="icon && !iconLeft" class="fe-button__icon" :icon="icon" />
        <span v-if="$slots.default" class="fe-button__title"><slot /></span>
        <span v-if="$slots.right" class="fe-button__right"><slot name="right" /></span>
    </button>
</template>

<script>
import { colorsList } from "@ui/lib.js";
import FeIcon, { icons } from "@ui/FeIcon/index.vue";

/**
 * @typedef {String} Size
 * */

/**
 * @cons
 * @typedef {Object} SizeList
 * @enum {Size}
 * */
const sizeList = {
    extraSmall: "extra-small",
    small: "small",
    medium: "medium",
};

/**
 * @cons
 * @typedef {Object} SizeShadowList
 * @enum {Size}
 * */
export const sizeShadowList = {
    small: "small",
    normal: "normal",
    medium: "medium",
};

/**
 * @typedef {Object} Theme
 * @property {Color} color
 * @property {Size} size
 * */

/**
 * @cons
 * @typedef {Object} ThemesList
 * @enum {Theme}
 * */
export const themes = {
    PrimaryMedium: {
        color: colorsList.primary,
        size: sizeList.medium,
    },
    PrimarySmall: {
        color: colorsList.primary,
        size: sizeList.small,
    },
    PrimaryExtraSmall: {
        color: colorsList.primary,
        size: sizeList.extraSmall,
    },
    SecondaryMedium: {
        color: colorsList.secondary,
        size: sizeList.medium,
    },
    SecondarySmall: {
        color: colorsList.secondary,
        size: sizeList.small,
    },
    SecondaryExtraSmall: {
        color: colorsList.secondary,
        size: sizeList.extraSmall,
    },
    TertiaryMedium: {
        color: colorsList.tertiary,
        size: sizeList.medium,
    },
    TertiarySmall: {
        color: colorsList.tertiary,
        size: sizeList.small,
    },
    TertiaryExtraSmall: {
        color: colorsList.tertiary,
        size: sizeList.extraSmall,
    },
    GhostMedium: {
        color: colorsList.ghost,
        size: sizeList.medium,
    },
    GhostSmall: {
        color: colorsList.ghost,
        size: sizeList.small,
    },
};

export default {
    name: "FeButton",

    components: {
        FeIcon,
    },

    props: {

        /**
         * Button theme
         *
         * @type {Theme}
         * */
        theme: {
            type: Object,
            default: () => {
                return themes.PrimarySmall;
            },
        },

        /**
         * Force 100% of the button width
         * */
        fullWidth: {
            type: Boolean,
            default: false,
        },

        /**
         * Force 100% of the button width
         * */
        fullWidthMobile: {
            type: Boolean,
            default: false,
        },

        /**
         * @type Boolean
         * @default false
         * */
        uppercase: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: [ Boolean, String ],
            default: false,
        },
        textAlign: {
            type: String,
            default: "",
        },
        waiting: {
            type: Boolean,
            default: false,
        },
        shadowSize: {
            type: String,
            default: sizeShadowList.small,
        },
        shadow: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * @type Boolean
         * @default false
         * */
        submit: {
            type: Boolean,
            default: false,
        },

        /**
         * @type Boolean
         * @default false
         * */
        iconLeft: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            icons,
        };
    },

    computed: {

        /**
         * List of classes for button
         *
         * @returns {Object}
         * */
        classes() {
            return {
                [`fe-button--${ this.theme.color }`]: this.theme.color,
                [`fe-button--${ this.theme.size }`]: this.theme.size,
                [`fe-button--text-${ this.theme.textAlign }`]: this.theme.textAlign,
                [`fe-button--text-${ this.textAlign }`]: this.textAlign,
                [`fe-button--shadow-${ this.shadowSize }`]: this.shadowSize && this.shadow,
                "fe-button--uppercase": this.uppercase || this.theme.uppercase,
                "fe-button--waiting": this.waiting,
                "fe-button--icon": this.icon && !this.$slots.default,
                "fe-button--disabled": this.disabled,
                "fe-button--full-width": this.fullWidth,
                "fe-button--full-width-mobile": this.fullWidthMobile,
            };
        },

        buttonType() {
            return this.submit ? "submit" : "button";
        },
    },

    methods: {

        /**
         * Click event
         *
         * @param {Object} $event - Mouse click events
         * @event click
         * */
        clickHandler($event) {
            if (this.disabled) {
                return;
            }
            this.$emit("click", $event);
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
