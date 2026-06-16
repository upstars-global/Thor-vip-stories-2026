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
                :position="tooltipPosition"
                :show-on-hover="false"
                :show="showError || !!messageEmailValidation"
            >
                <template #activator>
                    <FeInput
                        v-model.trim="value"
                        :error="!valid || !!messageEmailValidation"
                        :placeholder="placeholder || $t('REGISTRATION.PLACEHOLDER_EMAIL')"
                        :disabled="disabled"
                        :data-test="dataTest"
                        :recommend-list="recommendList"
                        :autofocus="autofocus"
                        type="email"
                        :label="label"
                        autocomplete="username"
                        @input="handleInput"
                        @focus="onFocusHandler"
                        @change="handleChange"
                        @selectRecommends="handleSelectRecommend"
                    >
                        <template #right>
                            <FeIcon
                                v-if="waiting"
                                :icon="iconsOutline.loader"
                                class="color-text-alt rotating"
                            />
                            <FeIcon
                                v-else-if="messageEmailValidation || showError"
                                :icon="FeIconConfig.attention2"
                                class="color-text-falsy"
                                @click="handleClickErrorIcon"
                            />
                            <FeIcon
                                v-else-if="isValidEmail"
                                :icon="FeIconConfig.checkInput"
                                class="color-text-successfully"
                            />
                        </template>
                    </FeInput>
                </template>
                {{ message || messageEmailValidation }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>
<script>
import BaseField from "./BaseField.vue";
import { replaceRecommendDomain } from "@helpers/replaceRecommendDomain";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { iconsOutline } from "@theme/configs/iconsOutline";
import { FeIconConfig } from "@theme/configs/icons";
import { authAPI } from "@api";
import { IBIZA_KEYS_SUCCESSFULLY_RESPONSE } from "@theme/configs/emailVerify";
import * as FeTooltipConfig from "@ui-kit/FeTooltip/index.vue";
import { emailRule } from "@mixins/ValidationRules";

const listOhMainDomains = [
    // "gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "icloud.com",
    "gmail.com", "yahoo.com", "icloud.com",
    "yahoo.com.au", "gmx.com", "live.com", "live.com.au", "mail.com",
    "bigpond.com", "bigpond.com.au", "bigpond.net", "bigpond.net.au",
    "aol.com", "iinet.net.au", "me.com", "msn.com", "optus.com.au", "qq.com",
];
export default {
    name: "EmailField",

    components: {
        FeIcon,
    },

    extends: BaseField,

    props: {
        isValidEmail: {
            type: [ String, Boolean ],
            default: false,
        },
        recommendMailDomains: {
            type: Boolean,
            default: false,
        },
        enableEmailVerification: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            iconsOutline,
            FeIconConfig,
            waiting: false,
            validByService: false,
            messageEmailValidation: "",
        };
    },

    computed: {
        tooltipPosition() {
            if (this.enableEmailVerification && this.messageEmailValidation) {
                return FeTooltipConfig.position.Under;
            }
            return this.positionTooltip;
        },
        hasStartMailDomain() {
            return this.value?.includes("@");
        },

        filteredListOhMainDomains() {
            const match = this.value.match(/[^@]*$/g);
            return listOhMainDomains.filter((domainItem) => {
                return domainItem.startsWith(match[0]) && match[0] !== domainItem;
            }).slice(0, 5);
        },

        recommendList() {
            return (this.recommendMailDomains && this.hasStartMailDomain) ? this.filteredListOhMainDomains : [];
        },
    },

    methods: {
        onFocusHandler(event) {
            this.$emit("focus", event);
        },
        handleClickErrorIcon() {
            this.$emit("input", "");
            this.messageEmailValidation = "";
            this.$refs.validator.clearError();
        },

        handleSelectRecommend(val) {
            const selectRec = replaceRecommendDomain(this.value, val);
            this.$emit("input", selectRec);
            this.$emit("change", selectRec);
        },
        handleInput(val) {
            this.messageEmailValidation = "";
            this.$refs.validator.clearError();
            this.$emit("input", val);
        },

        handleChange(val) {
            this.$emit("change", val);
            this.checkEmailVerify(val);
        },

        async checkEmailVerify(email) {
            if (!this.enableEmailVerification) {
                return;
            }

            this.messageEmailValidation = "";
            const isValidEmail = emailRule(email);
            if (isValidEmail !== true) {
                return;
            }

            this.waiting = true;

            if (this.value) {
                const data = await authAPI.verifyEmail(email);
                const isValid = IBIZA_KEYS_SUCCESSFULLY_RESPONSE[data.result];

                this.validByService = isValid;

                if (!isValid) {
                    this.messageEmailValidation = this.$t(data.result.replaceAll("::", "."));
                }
            }

            this.waiting = false;
        },
    },
};
</script>
