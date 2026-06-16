<template>
    <FieldValidator
        ref="validator"
        :value="value"
        :rules="rules"
        :name="label"
        manual-validate
    >
        <template #default="{ valid, message, showError }">
            <FeTooltip
                :position="positionTooltip"
                :show-on-hover="false"
                :show="showError"
            >
                <template #activator>
                    <FeInput
                        v-bind="$attrs"
                        v-model.trim="value"
                        :error="!valid"
                        :type="inputType"
                        :placeholder="placeholder || $t('REGISTRATION.PLACEHOLDER_PASSWORD')"
                        :disabled="disabled"
                        :data-test="dataTest"
                        :label="label"
                        @focus="onFocusHandler"
                    >
                        <template #right>
                            <div class="password-icon" @click="toggleInputType">
                                <FeIcon :icon="iconPassword" />
                            </div>
                        </template>
                    </FeInput>
                </template>

                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>

<script>
import BaseField from "./BaseField.vue";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";

export default {
    name: "PasswordField",

    components: {
        FeIcon,
    },

    extends: BaseField,

    data() {
        return {
            inputType: "password",
        };
    },

    computed: {
        rules() {
            return this.input.rules;
        },
        iconPassword() {
            return this.inputType === "text" ? FeIconConfig.visibilityOn : FeIconConfig.visibilityOff;
        },
    },

    methods: {
        toggleInputType() {
            this.inputType = this.inputType === "password" ? "text" : "password";
        },

        onFocusHandler(event) {
            this.$emit("focus", event);
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.password-icon {
    position: relative;
    cursor: pointer;
    color: $color-text-body;

    &:hover {
        color: $color-text-alt;
    }
}
</style>
