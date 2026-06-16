<template>
    <div
        :class="{'dial-code-mode': dialCodeMode}"
    >
        <CountriesField
            v-if="dialCodeMode"
            :input="country"
            :disabled="disabled"
            dial-code-mode
            :label="dialCode ? $t('REGISTRATION.LABEL_DIAL_CODE_COUNTRY') : $t('REGISTRATION.LABEL_COUNTRY')"
        />
        <FieldValidator
            ref="validator"
            :name="label"
            :value="currentValue"
            :rules="[ ...rules ]"
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
                            ref="input"
                            v-model="currentValue"
                            :error="!valid"
                            :mask="phoneMask"
                            :disabled="disabled"
                            :data-test="dataTest"
                            :has-left-content="hasFlag"
                            class="input__input"
                            type="tel"
                            name="phone"
                            :placeholder="placeholderExample"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                            :autofocus="autofocus"
                            inputmode="phone"
                            :label="label"
                            :required="required"
                            @input="inputChange"
                            @focus="onFocusHandler"
                        >
                            <template v-if="hasFlag" #left>
                                <Flag :code="guessCountryCode" :disabled="disabled" />
                            </template>
                            <template #right>
                                <FeImage v-if="isValidPhone" class="input__icon" :svg="iconDone" />
                            </template>
                        </FeInput>
                    </template>
                    {{ message }}
                </FeTooltip>
            </template>
        </FieldValidator>
    </div>
</template>
<script>
import BaseField from "./BaseField.vue";
import { mapActions, mapGetters } from "vuex";
import { mapState } from "pinia";

import Flag from "@components/CountryFlag/index.vue";
import FeImage from "@ui-kit/FeImage/index.vue";
import { getCountryByPhone } from "@mixins/PhoneMixin";
import CountriesField from "@ui-kit/FeFields/Countries.vue";
import iconDone from "@theme/images/icon-done-v3.inline.svg";
import { ServerInput } from "@mixins/ServerInput";
import { useUserInfo } from "@store/userInfo";

const codeListWithExtraNumber = { nz: 1, de: 1, at: 2 };

export default {
    name: "PhoneField",

    components: {
        Flag,
        FeImage,
        CountriesField,
    },

    extends: BaseField,

    props: {
        dialCodeMode: {
            type: Boolean,
            default: false,
        },
        phoneValue: {
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
        isValid: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },

    async serverPrefetch() {
        const res = await this.loadPhoneCodes();
        const country = this.value ? getCountryByPhone(this.value) : this.userCountryCode;
        const dialCode = res[country.toLowerCase()]?.dialCode || "";
        this.dialCode = dialCode;

        this.setPhoneMask(country);

        this.currentValue = "";

        if (this.value) {
            if (this.dialCodeMode) {
                this.currentValue = this.value.replace(dialCode, "");
            } else {
                this.currentValue = this.value;
            }
        } else {
            this.value = String(dialCode);

            if (!this.dialCodeMode) {
                this.currentValue = String(dialCode);
            }
        }
    },

    data() {
        const userInfoStore = useUserInfo();

        const chosenCountry = userInfoStore.userCountryCode;
        const userPhone = userInfoStore.userPhone;
        const country = getCountryByPhone(userPhone);

        return {
            iconDone,
            currentValue: "",
            phoneMask: null,
            dialCode: null,
            example: null,
            country:  new ServerInput(country && country.toUpperCase() || chosenCountry, []),
        };
    },

    computed: {
        ...mapGetters("server", {
            phonesData: "GET_PHONE_CODES",
        }),
        ...mapState(useUserInfo, {
            userCountryCode: "userCountryCode",
        }),

        classes() {
            return {
                "input__wrapper--has-prefix": this.hasFlag,
                "input__wrapper--has-state": this.isValidPhone,
            };
        },

        inputNotEmpty() {
            return this.currentValue.length > 0;
        },

        guessIsPhone() {
            return (/^[+() \-0-9]*$/).test(this.currentValue);
        },

        isLocalPhoneAU() {
            if (this.countryCode?.code === "au") {
                const index = this.dialCodeMode ? 0 : 3;
                return this.currentValue[index] === "0";
            }

            return false;
        },

        isValidPhone() {
            if (this.currentValue) {
                let phone = this.currentValue.replace(/[^0-9]/g, "");
                if (phone[0] === "+") {
                    phone = phone.slice(1);
                }

                const phoneLength = phone.length;
                const extendedMask = codeListWithExtraNumber[this.countryCode.code] &&
                    (phoneLength === this.countryCodeValidLength ||
                    phoneLength >= this.countryCodeValidLength - codeListWithExtraNumber[this.countryCode.code]);

                return phoneLength === this.countryCodeValidLength || extendedMask;
            }

            return false;
        },

        hasFlag() {
            return this.guessCountryCode !== null && !this.dialCodeMode;
        },

        guessCountryCode() {
            if (!this.guessIsPhone) {
                return null;
            }
            let phone = this.value.replace(/[^0-9]/g, "");
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
            const countryCodeExample = this.countryCode?.example.replace(/\D/g, "");
            const countryCodeDialCode = this.countryCode?.dialCode || this.dialCode;
            const phone = this.dialCodeMode ? countryCodeExample : countryCodeExample + countryCodeDialCode;

            if (this.isLocalPhoneAU) {
                return phone.length + 1;
            }

            return phone.length;
        },
        placeholderExample() {
            return this.dialCode ? this.example.replace(/\d/g, "X") : this.placeholder;
        },
    },

    watch: {
        isValidPhone() {
            this.$emit("update:isValid", this.isValidPhone);
        },
        guessCountryCode(newCountry, oldCountry) {
            if (newCountry && newCountry !== oldCountry) {
                this.setPhoneMask(newCountry);
            }
        },
        "country.value"(newCountry, oldCountry) {
            if (this.dialCodeMode && newCountry && newCountry !== oldCountry) {
                this.setPhoneMask(newCountry);
            }
        },
        isLocalPhoneAU() {
            this.setPhoneMask(this.countryCode.code);
        },
    },

    methods: {
        ...mapActions("server", {
            loadPhoneCodes: "LOAD_PHONE_CODES",
        }),
        setPhoneMask(arg) {
            const country = arg.toLowerCase();
            const countryExample = this.phonesData[country]?.example;

            this.example = this.isLocalPhoneAU ? `${countryExample}0` : (countryExample || "");
            this.dialCode = this.phonesData[country]?.dialCode || "";

            const phone = this.dialCodeMode ? this.example : `${this.dialCode} ${this.example}`;

            this.phoneMask = phone.replace(/[0-9]/g, "#");
        },
        inputChange(value) {
            let newValue = this.isLocalPhoneAU ? value.replace("0", "") : value;
            const number = this.dialCodeMode ? `${this.dialCode}${newValue}`.replace(/\D/g, "") : newValue;
            this.currentValue = value;

            this.$emit("input", {
                type: "phone",
                value: number,
            });

            this.value = number;

            this.$emit("update:isValid", this.isValidPhone);
        },
        onFocusHandler(event) {
            this.$emit("focus", event);
        },
    },
};
</script>
<style scoped lang="scss">
.dial-code-mode {
    display: grid;
    grid-template-columns: 8rem auto;
    grid-gap: 1rem;
}
</style>
