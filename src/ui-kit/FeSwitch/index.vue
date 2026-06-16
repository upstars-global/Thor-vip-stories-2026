<template>
    <label class="fe-switch" :class="{ 'disabled': disabled }">
        <input v-model="inputValue" class="fe-switch__input" type="checkbox" :disabled="disabled">
        <span class="fe-switch__checkmark" />
    </label>
</template>

<script>
export default {
    name: "FeSwitch",

    props: {
        value: {
            type: Boolean,
            required: true,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            inputValue: this.value,
        };
    },

    watch: {
        inputValue(value) {
            this.$emit("checked", value);
        },

        value(val) {
            this.inputValue = val;
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";


.fe-switch {
    display: block;
    position: relative;
    width: 3rem;
    height: 1.5rem;
    cursor: pointer;
    user-select: none;

    &.disabled {
        opacity: 0.5;
    }

    &__input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ .fe-switch__checkmark {
        border-color: $color-text-link-default;
            &:after {
                transform: translate(calc(100% - -0.5rem), -50%);
                background: $color-text-link-default;
            }
        }
    }

    &__checkmark {
        position: absolute;
        top: 0;
        right: 0;
        height: 1.5rem;
        width: 100%;
        background-color: transparent;
        border-radius: $border-radius-M;
        border: 2px solid $color-tertiary-1;

        &:after {
            left: 0.25rem;
            top: 50%;
            height: 1rem;
            width: 1rem;
            border: none;
            background: $color-tertiary-1;
            border-radius: $border-radius-M;
            content: "";
            position: absolute;
            transition: all 0.2s;
            transform: translate(0, -50%);
        }
    }
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: #ccc;
}

</style>
