<template>
    <label
        class="fe-switch"
        :class="classFeSwitch"
    >
        <span class="fe-switch__label">{{ label }}</span>

        <input
            v-model="inputValue"
            class="fe-switch__input" type="checkbox"
            @click="$emit('click', $event.target.checked)"
        >
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
        },
        label: {
            type: String,
        },
    },

    data() {
        return {
            inputValue: this.value,
        };
    },

    computed: {
        classFeSwitch() {
            return {
                "fe-switch--with-label": Boolean(this.label),
            };
        },
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    user-select: none;
    @include font-size--Caption1($font-weight--normal);
    margin: 0;
    padding: 0;

    &, * {
        box-sizing: border-box;
    }

    &__input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ .fe-switch__checkmark {
            background-color: var(--color-layer-alt-3);

            &:after {
                transform: translateX(1rem);
                background: var(--color-primary-gradient);
                border: none;
            }
        }
    }

    &__checkmark {
        position: relative;
        display: inline-block;
        height: 0.875rem;
        width: 2rem;
        background-color: var(--color-layer-alt-3);
        border-radius: 3rem;
        transition: background-color 0.2s;

        &:after {
            content: "";
            position: absolute;
            left: 0;
            top: -3px;
            height: 1.25rem;
            width: 1.25rem;
            background-color: var(--color-layer-alt-2);
            border-radius: 50%;
            border: 1px solid var(--color-tertiary-3);
            transition: all 0.2s;
            box-sizing: border-box;
        }
    }

    &--with-label{
        width: 100%;
        padding: .5rem 1rem;
        border-radius: var(--border-radius-s);
        background: var(--color-layer-alt-1);
    }
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: #ccc;
}

.modal {
    .fe-switch{
        &--with-label{
            background: var(--color-layer-alt-2);
        }
    }
}

</style>
