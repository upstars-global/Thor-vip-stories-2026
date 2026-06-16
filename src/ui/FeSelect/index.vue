<template>
    <div :class="classes" class="fe-select">
        <label v-if="label"> {{ label }}</label>
        <div class="fe-select__container">
            <div v-if="$slots.left" class="fe-select__left-content">
                <slot name="left" />
            </div>
            <div v-if="$slots.customValue" class="fe-select__custom-value">
                <slot name="customValue" />
            </div>
            <select
                :disabled="disabled"
                :value="_value"
                class="fe-select__native"
                v-bind="$attrs"
                autocomplete="tel-country-code"
                @change="$emit('change', $event.target.value)"
                @click="$emit('click', _value)"
                @input="$emit('input', $event.target.value)"
            >
                <option
                    v-if="placeholder"
                    disabled
                    hidden
                    selected
                    value=""
                >
                    {{ placeholder }}
                </option>
                <template v-for="(item, index) in list">
                    <slot
                        :index="index"
                        :item="item"
                    >
                        {{ item }}
                    </slot>
                </template>
            </select>
            <FeIcon :icon="FeIconConfig.icons.fill.dropdownDown" class="fe-select__icon" />
            <transition name="slide">
                <span v-if="errorMessage" class="fe-select__error-message">{{ errorMessage }}</span>
            </transition>
        </div>
        <div
            v-if="description"
            class="fe-select__description"
        >
            {{ description }}
        </div>
    </div>
</template>

<script>
import FeIcon, * as FeIconConfig from "@ui/FeIcon/index.vue";

export const sizeList = {
    small: "small",
    medium: "medium",
};

export default {
    name: "FeSelect",

    components: {
        FeIcon,
    },

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },

        value: {
            type: [ String, Number ],
        },

        list: {
            type: Array,
            default: () => {
                return [];
            },
        },

        label: {
            type: String,
            default: "",
        },

        leftContent: {
            type: String,
            default: "",
        },

        fullWidth: {
            type: Boolean,
            default: false,
        },

        size: {
            type: String,
            default: sizeList.small,
        },
        errorMessage: {
            type: String,
            default: "",
        },

        placeholder: {
            type: String,
        },

        description: {
            type: String,
        },

        customValue: {
            type: String,
        },
    },

    data() {
        return {
            FeIconConfig,
        };
    },

    computed: {
        _value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },

        classes() {
            return [
                {
                    "fe-select--disabled": this.disabled,
                    "fe-select--full-width": this.fullWidth,
                    [`fe-select--${ this.size }`]: true,
                    ["fe-select--error"]: this.errorMessage,
                },
                this.rules || this.$parent.rules ];
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@theme/styles";

.fe-select {
    width: max-content;
    max-width: 100%;

    &__container {
        position: relative;
    }

    &__icon {
        pointer-events: none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: .5rem;
        margin: auto 0;
        color: var(--color-button-text-secondary);
    }

    &__native {
        @include font-size--Caption1;
        text-transform: initial;
        border: 0;
        border-radius: var(--border-radius-m);
        box-sizing: border-box;
        padding: 0 2rem 0 1rem;
        border: none;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        color: var(--color-button-text-secondary);
        background: var(--color-tertiary-3);
        width: 100%;

        &:hover {
            background: var(--color-tertiary-2);
        }

        &:active {
            background: var(--color-tertiary-3);
        }
    }

    &__left-content {
        position: absolute;
        font-size: 1.5rem;
        top: 0;
        bottom: 0;
        left: 1rem;
        pointer-events: none;
        display: flex;
        align-items: center;

        svg {
            width: 1em;
        }
    }

    &__left-content ~ &__native {
        padding: 0 2rem 0 3rem;
    }

    &--disabled {
        pointer-events: none;
        cursor: default;
    }

    &--disabled {
        @include font-color--disabled;
    }

    &#{&}--full-width {
        width: 100%;
    }

    &#{&}--small &__native {
        height: 2.5rem
    }

    &#{&}--medium &__native {
        height: 3rem
    }

    label {
        @include label;
    }

    &__error-message {
        position: absolute;
        top: 100%;
        width: 100%;
        left: 0;
        @include font-size--Caption2($font-weight--normal);
        color: var(--color-error);
        padding-left: 1rem;
    }

    &--error &__native {
        border: 2px solid var(--color-error);
    }

    &__description {
        @include font-size--Caption2($font-weight--normal);
        padding: .25rem 1rem;
    }

    &__custom-value {
        @include font-size--Caption1;
        color: var(--color-button-text-secondary);

        position: absolute;
        left: 1rem;
        bottom: 0;
        top: 0;
        margin: auto;
        display: flex;
        align-items: center;
        pointer-events: none;

        & + select {
            text-indent: -10000rem;
        }
    }
}
</style>
