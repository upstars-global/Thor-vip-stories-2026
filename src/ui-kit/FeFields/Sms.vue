<template>
    <FieldValidator
        ref="validator"
        :value="value"
        :rules="[ smsRule, smsCharsRule, ...rules ]"
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
                        v-model.trim="value"
                        :error="!valid"
                        :placeholder="placeholder || $t('REGISTRATION.PLACEHOLDER_SMS')"
                        :disabled="disabled"
                        :mask="mask"
                        :data-test="dataTest"
                        autocomplete="one-time-code"
                        text-align="center"
                    />
                </template>
                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>
<script>

import { smsRule, smsCharsRule } from "@mixins/ValidationRules";
import BaseField from "./BaseField.vue";

export default {
    name: "SmsField",

    extends: BaseField,

    data() {
        return {
            smsRule,
            smsCharsRule,
            mask: "## ##",
        };
    },
};
</script>
