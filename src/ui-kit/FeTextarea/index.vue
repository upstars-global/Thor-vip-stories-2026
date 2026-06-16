<template>
    <div :class="{'fe-textarea--disabled': disabled}">
        <label
            v-if="label"
            class="fe-inputV2__label"
        > {{ label }}
        </label>
        <div
            :class="classes"
            class="fe-textarea"
            @click="clickHandler"
        >
            <div class="fe-textarea__left">
                <slot name="left" />
            </div>
            <textarea
                ref="input"
                :cols="cols"
                :data-test="dataTest"
                :disabled="disabled"
                :maxlength="maxlength"
                :pattern="pattern"
                :placeholder="placeholder"
                :required="required"
                :rows="rows"
                :style="style"
                :value="value"
                class="fe-textarea__input"
                v-bind="$attrs"
                @blur="blurHandler"
                @change="changeHandler"
                @focus="focusHandler"
                @input="inputHandler"
            />
            <div
                v-if="errorMessages"
                class="fe-textarea__error-message">
                {{ errorMessages }}
            </div>
            <div class="fe-textarea__right">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FeTextarea",

    props: {
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        textAlign: {
            type: String,
            default: "",
        },
        error: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        fontBig: {
            type: Boolean,
            default: false,
        },
        dataTest: {
            type: String,
            default: null,
        },
        hasLeftContent: {
            type: Boolean,
            default: false,
        },
        pattern: {
            type: String,
        },
        rows: {
            type: Number,
            default: 6,
        },
        cols: {
            type: Number,
        },
        resize: {
            type: String,
            default: "none",
        },
        maxlength: {
            type: Number,
            default: 1000,
        },
        label: {
            type: String,
            default: "",
        },
        errorMessages: {
            type: String,
        },
    },

    data() {
        return {
            focused: false,
        };
    },

    computed: {
        classes() {
            return {
                "has-left-content": this.hasLeftContent,
                "has-right-content": this.$slots.right,
                [`fe-textarea--text-${ this.textAlign }`]: this.textAlign,
                "fe-textarea--focused": this.focused,
                "fe-textarea--error": this.error,
                "fe-textarea--font-big": this.fontBig,
            };
        },
        style() {
            return {
                resize: this.resize,
            };
        },
    },

    methods: {
        clickHandler() {
            this.$refs.input.focus();
        },
        inputHandler($event) {
            this.$emit("input", $event.target.value);
        },
        changeHandler($event) {
            this.$emit("change", $event.target.value);
        },
        focusHandler($event) {
            this.focused = true;
            this.$emit("focus", $event);
        },
        blurHandler($event) {
            this.focused = false;
            this.$emit("blur", $event);
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
