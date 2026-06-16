<template>
    <div class="fe-tooltip" :class="classes">
        <div class="fe-tooltip__activator">
            <slot name="activator" />
        </div>
        <div class="fe-tooltip__body">
            <div class="fe-tooltip__content">
                <FeText
                    :theme="FeTextConfig.themes.White"
                    :size="FeTextConfig.size.SmallRegular"
                >
                    <slot />
                </FeText>
            </div>
        </div>
    </div>
</template>

<script>
import { colorsList } from "@ui/lib.js";
import FeText, * as FeTextConfig from "@ui/FeText/index.vue";

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
    Success: {
        color: colorsList.success,
    },
    Alert: {
        color: colorsList.alert,
    },
    Danger: {
        color: colorsList.danger,
    },
    Tertiary: {
        color: colorsList.tertiary,
    },
};

/**
 * @typedef {String} Position
 * */

/**
 * @typedef {Object} PositionList
 * @enum {Position}
 * */
export const position = {
    Top: "top",
    Left: "left",
    Right: "right",
    Bottom: "bottom",
};

export default {
    name: "FeTooltip",

    components: {
        FeText,
    },

    props: {

        /**
         * @type {Theme}
         * */
        theme: {
            type: Object,
            default: () => {
                return themes.Danger;
            },
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },

        /**
         * @type {Position}
         * */
        position: {
            type: String,
            default: position.Top,
        },
        showOnHover: {
            type: Boolean,
            default: true,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            FeTextConfig,
        };
    },

    computed: {
        classes() {
            return {
                [`fe-tooltip--${ this.theme.color }`]: this.theme.color,
                [`fe-tooltip--position-${ this.position }`]: this.position,
                "fe-tooltip--hover": this.showOnHover,
                "fe-tooltip--show": this.show,
                "fe-tooltip--full-width": this.fullWidth,
            };
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
