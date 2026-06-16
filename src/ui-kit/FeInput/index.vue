<template>
    <div
        v-click-outside="handleClickOutside"
        :class="{'fe-inputV2--disabled':disabled}"
    >
        <label
            v-if="label"
            :for="idEl"
            class="fe-inputV2__label"
        >
            {{ label }}
            <span v-if="required" class="fe-inputV2__label-required">*</span>
            <span v-if="infoLabel">{{ infoLabel }}</span>
        </label>
        <div
            class="fe-inputV2"
            :class="classes"
            @click="clickHandler"
        >
            <div class="fe-inputV2__left">
                <slot name="left" />
            </div>
            <input
                v-bind="$attrs"
                :id="idEl"
                ref="input"
                v-mask="mask"
                :value="value"
                class="fe-inputV2__input"
                :placeholder="placeholder"
                :type="type"
                :autofocus="autofocus"
                :disabled="disabled"
                :min="min"
                :max="max"
                :required="required"
                :data-test="dataTest"
                :pattern="pattern"
                :step="step"
                :maxlength="maxlength"
                :autocomplete="autocomplete"
                @focus="focusHandler"
                @blur="blurHandler"
                @input="inputHandler"
                @change="changeHandler"
            >
            <div
                v-if="recommendList.length && showRecommendList"
                class="fe-inputV2__recommend"
            >
                <ul>
                    <li
                        v-for="recommendItem in recommendList"
                        :key="recommendItem"
                        class="caption-1"
                        @click.stop.capture="selectRecommendItem(recommendItem)"
                    >
                        {{ replaceRecommendDomain(value).trim() }}
                        <span>{{ recommendItem.trim() }}</span>
                    </li>
                </ul>
            </div>
            <div class="fe-inputV2__right">
                <slot name="right" />
            </div>

            <transition name="slide">
                <div
                    v-if="errorMessages"
                    class="fe-inputV2__error-message">
                    {{ errorMessages }}
                </div>
            </transition>
        </div>

        <div
            v-if="description && !errorMessages"
            class="fe-inputV2__description"
        >
            {{ description }}
        </div>
    </div>
</template>

<script>
import { replaceRecommendDomain } from "@helpers/replaceRecommendDomain";
export default {
    name: "FeInput",

    props: {
        value: {
            type: [ String, Number, Boolean, Object ],
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        mask: {
            type: [ String, Object ],
            default: "",
        },
        textAlign: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        error: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        min: {
            type: [ Number, String ],
        },
        max: {
            type: [ Number, String ],
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
        autofocus: {
            type: Boolean,
            default: false,
        },
        step: {
            type: Number,
        },
        label: {
            type: String,
        },

        infoLabel:{
            type: String,
        },

        description: {
            type: String,
        },

        errorMessages: {
            type: String,
            default: "",
        },

        maxlength:{
            type: Number,
        },

        autocomplete:{
            type: String,
        },

        recommendList: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            focused: false,
            showRecommendList: false,
        };
    },

    computed: {
        classes() {
            return {
                "has-left-content": this.hasLeftContent || this.$slots.left,
                "has-right-content": this.$slots.right,
                [`fe-inputV2--text-${this.textAlign}`]: this.textAlign,
                "fe-inputV2--focused": this.focused,
                "fe-inputV2--error": this.error,
                "fe-inputV2--font-big": this.fontBig,
                "fe-inputV2--has-recommend": this.recommendList.length && this.showRecommendList,
            };
        },

        idEl() {
            return this.label && `label-${this._uid}`;
        },
    },
    mounted() {
        if (this.autofocus) {
            this.$refs.input.focus();
        }
    },

    methods: {
        replaceRecommendDomain,
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
            this.showRecommendList = true;
            this.$emit("focus", $event);
        },
        blurHandler($event) {
            this.focused = false;
            this.$emit("blur", $event);
        },
        selectRecommendItem(selectItem) {
            const selectRec = replaceRecommendDomain(this.value, selectItem);
            this.$emit("change", selectRec);
            this.$emit("input", selectRec);
            this.showRecommendList = false;
        },
        handleClickOutside() {
            this.showRecommendList = false;
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
