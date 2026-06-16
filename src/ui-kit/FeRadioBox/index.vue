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
        modelValue: { type: [ Boolean, String ], default: "" },
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
        color: unset;

        input {
            & + span {
                &:before {
                    border-color: 2px solid var(--color-tertiary-3);
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
            padding-left: 1.75rem;
            height: 1.25rem;
            position: relative;

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
                width: 1.25rem;
                height: 100%;
                border: 2px solid var(--color-tertiary-3);
                background-color: transparent;
                box-sizing: border-box;
            }

            &:after {
                content: '';
                box-sizing: border-box;
                display: block;
                width: 1.25rem;
                height: 1.25rem;
                background-color: var(--color-primary-1);
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
            color: unset;

            &:before {
                border: 2px solid var(--color-primary-1);
            }
        }

        &:checked + span:after {
            opacity: 1;
            transform: scale(.4);
        }
    }

    &#{&}--error input + span {
        &:before{
            border-color: unset;
        }
    }
}
</style>
