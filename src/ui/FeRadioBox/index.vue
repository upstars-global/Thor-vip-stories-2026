<template>
    <label
        class="radio"
        :class="{
            'radio--disabled':disabled,
            'radio--error': hasError
        }">
        <input
            :name="name"
            class="checkbox"
            type="radio"
            :checked="isChecked"
            :value="value"
            :disabled="disabled"
            @change="$emit('change', $event.target.value)">
        <span>{{ label }}</span>
    </label>
</template>

<script>
export default {
    name: "FeRadioBox",

    model: {
        prop: "modelValue",
        event: "change",
    },

    props: {
        name: { type: String, default: "" },
        label: { type: String, default: "", required: true },
        modelValue: { type: String, default: "" },
        value: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        hasError: { type: Boolean, default: false },
    },

    computed: {
        isChecked() {
            return this.modelValue === this.value;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@theme/styles";

$property_86_px--border: 2px solid var(--color-text-alt);
$property_109_px--border: 2px solid var(--color-primary-1);
$radio__after--background-color: var(--color-primary-1);
$radio__hover--background-color: var(--color-tertiary-3);
$radio-text-color--hover: var(--color-text-body);
$radio-border-color--hover: var(--color-text-body);

$radio-border-color--error: var(--color-error);
$color-radio: var(--color-button-text-secondary);
$property_109_px--border: 2px solid $color-radio;
$color-text--checked: var(--color-button-text-secondary);
$radio-size: 1.25rem;
$radio-input-padding-left: 1.75rem;

.radio {
    input + span {
        @include font-size--Body($font-weight--normal);
    }
}

.radio {
    display: block;
    cursor: pointer;
    user-select: none;
    text-align: left;
    padding: .5rem 1rem;
    border-radius: 2rem;
    background-color: transparent;
    transition: background-color .2s ease;

    &:hover {
        color: $radio-text-color--hover;

        input {
            & + span {
                &:before {
                    border-color: $radio-border-color--hover;
                }
            }
        }
    }

    &--disabled {
        @include font-color--disabled;

        &:hover {
            background: none;
        }
    }

    input {
        display: none;

        & + span {
            display: flex;
            align-items: center;
            padding-left: $radio-input-padding-left;
            height: $radio-size;
            position: relative;

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
                width: $radio-size;
                height: 100%;
                border: $property_86_px--border;
                background-color: transparent;
                box-sizing: border-box;
            }

            &:after {
                content: '';
                box-sizing: border-box;
                display: block;
                width: $radio-size;
                height: $radio-size;
                background-color: $color-radio;
                position: absolute;
                border-radius: 50%;
                top: 0;
                left: 0;
                opacity: 0;
                transform: scale(0);
                transition: transform .2s ease;
            }
        }

        &:checked + span {
            color: $color-text--checked;

            &:before {
                border: $property_109_px--border;
            }
        }

        &:checked + span:after {
            opacity: 1;
            transform: scale(.4);
        }
    }

    &#{&}--error input + span {
        &:before {
            border-color: $radio-border-color--error;
        }
    }
}
</style>
