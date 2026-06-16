<template>
    <div
        v-click-outside="handleClickOutside"
        :class="parentClasses"
    >
        <label
            v-if="label"
            :for="idEl"
            class="fe-inputV2__label"
        >
            {{ label }} <span v-if="infoLabel">{{ infoLabel }}</span>
        </label>
        <div
            :class="classes"
            class="fe-inputV2"
            @click="clickHandler"
        >
            <div class="fe-inputV2__left">
                <slot name="left" />
            </div>
            <input
                :id="idEl"
                ref="input"
                v-mask="mask"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :data-test="dataTest"
                :disabled="disabled"
                :max="max"
                :maxlength="maxlength"
                :min="min"
                :pattern="pattern"
                :placeholder="placeholder"
                :required="required"
                :step="step"
                :type="type"
                :value="value"
                :inputmode="inputmode"
                class="fe-inputV2__input"
                v-bind="$attrs"
                @blur="blurHandler"
                @change="changeHandler"
                @focus="focusHandler"
                @input="inputHandler"
            >
            <div v-if="recommendList.length && showRecommendList" class="fe-inputV2__recommend">
                <ul>
                    <li
                        v-for="recommendItem in recommendList"
                        :key="recommendItem"
                        @click.stop.capture="selectRecommendItem(recommendItem)"
                    >
                        <span class="text-color--body">{{ replaceRecommendDomain(value) }}</span>{{ recommendItem }}
                    </li>
                </ul>
            </div>

            <div class="fe-inputV2__right">
                <slot name="right" />
            </div>

            <transition name="slide">
                <div
                    v-if="errorMessages"
                    class="fe-inputV2__error-message"
                >
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
import { replaceRecommendDomain } from "@components/FormFieldsVee/helpers/recomendList";

export default {
    name: "FeInput",

    props: {
        value: {
            type: [ String, Number ],
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

        infoLabel: {
            type: String,
        },

        description: {
            type: String,
        },

        errorMessages: {
            type: String,
            default: "",
        },

        maxlength: {
            type: Number,
        },

        autocomplete: {
            type: String,
        },

        recommendList: {
            type: Array,
            default() {
                return [];
            },
        },
        inputmode: {
            type: String,
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
                [`fe-inputV2--text-${ this.textAlign }`]: this.textAlign,
                "fe-inputV2--focused": this.focused,
                "fe-inputV2--error": this.error,
                "fe-inputV2--font-big": this.fontBig,
                "fe-inputV2--has-recommend": this.recommendList.length && this.showRecommendList,
            };
        },

        idEl() {
            return this.label && `label-${ this._uid }`;
        },

        parentClasses() {
            return [
                { "fe-inputV2--disabled": this.disabled },
                this.rules || this.$parent.rules,
            ];
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
