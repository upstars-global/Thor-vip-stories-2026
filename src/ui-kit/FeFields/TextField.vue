<template>
    <FieldValidator
        ref="validator"
        :name="label"
        :value="value"
        :rules="[ ...rules ]"
        manual-validate
    >
        <template #default="{ valid, message, showError }">
            <FeTooltip
                :show-on-hover="false"
                :show="showError"
                :position="positionTooltip"
            >
                <template #activator>
                    <FeInput
                        ref="input"
                        v-model.trim="value"
                        class="input__input"
                        type="text"
                        :error="!valid"
                        :disabled="disabled"
                        :data-test="dataTest"
                        :autofocus="autofocus"
                        :placeholder="placeholder"
                        :label="label"
                        :required="required"
                        @input="inputChange"
                        @focus="onFocusHandler"
                    />
                </template>
                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>

<script>
import BaseField from "./BaseField.vue";
import FeTooltip, * as FeTooltipConfig from "../FeTooltip";

export default {
    name: "TextField",

    components: {
        FeTooltip,
    },

    extends: BaseField,

    props: {
        placeholder: {
            type: String,
        },
        dataTest: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            FeTooltipConfig,
        };
    },
    mounted() {
        this.inputChange(this.value);
    },
    methods: {
        onFocusHandler(event) {
            this.$emit("focus", event);
        },
        inputChange(value) {
            this.currentValue = value;

            this.$emit("input", value);
        },
    },
};
</script>
