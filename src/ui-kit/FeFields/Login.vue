<template>
    <FieldValidator
        ref="validator"
        :value="value"
        :rules="loginRules"
        manual-validate
    >
        <template #default="{ valid, message, showError }">
            <FeTooltip
                :show-on-hover="false"
                :show="showError"
            >
                <template #activator>
                    <FeInput
                        ref="input"
                        v-model.trim="value"
                        :error="!valid"
                        :disabled="disabled"
                        :data-test="dataTest"
                        autocomplete="username"
                        class="input__input"
                        type="text"
                        name="username"
                        :placeholder="placeholder"
                        autocorrect="off"
                        autocapitalize="none"
                        spellcheck="false"
                        autofocus
                        inputmode="email"
                        :has-left-content="hasPrefix && hasFlag"
                        :label="$t('LOGIN.LABEL_LOGIN')"
                        @input="inputChange"
                        @focus="onFocusHandler"
                    >
                        <template v-if="hasPrefix" #left>
                            <Flag v-if="hasFlag" :code="guessCountryCode" :disabled="disabled" />
                        </template>
                        <template #right>
                            <FeImage v-if="hasState" class="input__icon" :svg="iconDone" />
                        </template>
                    </FeInput>
                </template>
                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>
<script>
import { emailRule, phoneRule } from "@mixins/ValidationRules";
import BaseField from "./BaseField.vue";

import { mapActions, mapGetters } from "vuex";

import Flag from "@components/CountryFlag/index.vue";
import FeImage from "../FeImage/index.vue";
import { getCountryByPhone } from "@mixins/PhoneMixin";

import iconEmail from "@theme/images/icon-email.inline.svg";
import iconDone from "@theme/images/icon-done-v3.inline.svg";


export default {
    name: "LoginField",

    components: {
        Flag,
        FeImage,
    },

    extends: BaseField,

    props: {
        loginValue: {
            type: String,
            default: "",
        },
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
    },

    serverPrefetch() {
        return this.loadPhoneCodes();
    },

    data() {
        return {
            iconEmail,
            iconDone,
            currentValue: this.loginValue,
        };
    },

    computed: {
        ...mapGetters("server", {
            phonesData: "GET_PHONE_CODES",
        }),

        classes() {
            return {
                "input__wrapper--has-prefix": this.hasPrefix,
                "input__wrapper--has-state": this.hasState,
            };
        },

        inputNotEmpty() {
            return this.currentValue.length > 0;
        },

        inputType() {
            if (!this.inputNotEmpty) {
                return null;
            }
            if (this.guessIsPhone) {
                return "phone";
            }

            return "email";
        },

        hasState() {
            return this.isValid;
        },

        hasPrefix() {
            return this.isEmail || this.hasFlag;
        },

        isValid() {
            if (this.isPhone) {
                return this.isValidPhone;
            }
            if (this.isEmail) {
                return this.isValidEmail;
            }

            return false;
        },

        // Phone
        guessIsPhone() {
            return (/^[+() \-0-9]*$/).test(this.currentValue);
        },

        isPhone() {
            return this.inputType === "phone";
        },

        isValidPhone() {
            if (!this.isPhone) {
                return false;
            }
            let phone = this.currentValue.replace(/[^0-9]/g, "");
            if (phone[0] === "+") {
                phone = phone.slice(1);
            }

            return (phone.length === this.countryCodeValidLength && phone[0] !== "0") ||
                (this.guessCountryCode === "ua" && phone.length === this.countryCodeValidLength - 2);
        },

        hasFlag() {
            return this.isPhone && this.guessCountryCode !== null;
        },

        guessCountryCode() {
            if (!this.guessIsPhone) {
                return null;
            }
            let phone = this.currentValue.replace(/[^0-9]/g, "");
            if (phone[0] === "+") {
                phone = phone.slice(1);
            }
            return getCountryByPhone(phone);
        },

        countryCode() {
            if (!this.guessIsPhone) {
                return null;
            }
            let country = null;
            const iso2 = this.guessCountryCode;
            country = this.phonesData[iso2];
            if (country) {
                return country;
            }
            return null;
        },

        countryCodeValidLength() {
            if (!this.countryCode) {
                return null;
            }
            const countryCodeExample = this.countryCode.example.replace(/\D/g, "");
            const countryCodeDialCode = String(this.countryCode.dialCode);
            return (countryCodeExample + countryCodeDialCode).length;
        },

        // Email
        isEmail() {
            return this.inputType === "email";
        },

        isValidEmail() {
            if (!this.isEmail) {
                return false;
            }

            return typeof emailRule(this.currentValue) !== "string";
        },

        loginRules() {
            if (this.isEmail) {
                return [
                    ...this.rules,
                    emailRule,
                ];
            }
            return [
                ...this.rules,
                phoneRule,
            ];
        },
    },

    methods: {
        ...mapActions("server", {
            loadPhoneCodes: "LOAD_PHONE_CODES",
        }),
        inputChange(value) {
            this.currentValue = value;

            this.$emit("input", {
                type: this.inputType,
                value,
                isValid: this.isValid,
                countryCode: this.countryCode,
            });
        },

        onFocusHandler(event) {
            this.$emit("focus", event);
        },
    },
};
</script>
