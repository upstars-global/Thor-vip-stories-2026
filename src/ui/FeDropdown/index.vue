<template>
    <div
        :class="classList"
        class="fe-dropdown"
        gap-row-s
    >
        <div
            :class="statusClass"
            class="fe-dropdown__btn"
            @click="toggleContent"
        >
            {{ btnName }}
            <FeIcon
                :icon="FeIconConfig.icons.fill.dropdownDown"
                class="fe-dropdown__btn-icon"
            />
        </div>

        <transition class="fe-dropdown__content" name="slide">
            <div v-show="isOpen" gap-row-s>
                <slot />
                <div
                    v-if="$slots.action"
                    class="fe-dropdown__actions">
                    <slot name="action" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import FeIcon, * as FeIconConfig from "@ui/FeIcon/index.vue";
import { colorsList } from "@ui/lib.js";

/**
 * @static
 * @typedef {Object} Theme
 * @property {Color} color
 * */

/**
 * @static
 * @typedef {Object} Theme
 * @property {Color} color
 * */

export const themes = {
    Dark: {
        color: colorsList.dark,
    },
    SecondaryDark: {
        color: colorsList.secondaryDark,
    },

    Tertiary: {
        color: colorsList.tertiary,
    },
};

export const sizeList = {
    small: "small",
    medium: "medium",
};


export default {
    name: "FeDropdown",

    components: {
        FeIcon,
    },

    props: {
        btnName: {
            type: String,
            default: "Dropdown",
        },
        theme: {
            type: Object,
            default() {
                return themes.SecondaryDark;
            },
        },

        size: {
            type: String,
            default: sizeList.medium,
        },

        isOpenOnMount: {
            type: Boolean,
        },
    },

    data() {
        return {
            FeIconConfig,
            isOpen: false,
        };
    },

    computed: {
        statusClass() {
            return this.isOpen && "open";
        },

        classList() {
            return {
                [`fe-dropdown--${ this.theme.color }`]: this.theme.color,
                [`fe-dropdown--${ this.size }`]: this.size,
            };
        },
    },

    mounted() {
        this.isOpen = this.isOpenOnMount;
    },


    methods: {
        toggleContent() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@theme/styles";

.fe-dropdown {
    border-radius: var(--border-radius-s);

    &__btn {
        @include font-size--Body($font-weight--bold);
        text-align: center;
        position: relative;


        &-icon {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            transition: all .2s;
        }

        &.open {
            .fe-dropdown__btn-icon {
                transform: rotate(180deg);
            }
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
    }

    &--small {
        //padding: .25rem 1rem;
        //@include media(M) {
        padding: .5rem 1rem;
        //}
    }

    &--medium {
        padding: .5rem 1rem;

        @include media(M) {
            padding: 1rem 1.5rem;
        }
    }


    &--dark {
        @include background-dark;
    }

    &--secondary-dark {
        @include background-secondary-dark;
    }

    &--tertiary {
        @include background-tertiary;
    }
}

</style>
