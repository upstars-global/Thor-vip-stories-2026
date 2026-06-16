<template>
    <FieldValidator
        v-if="countries.length > 1"
        ref="validator"
        :name="label"
        :value="value"
        :rules="countryRules"
        manual-validate
    >
        <template #default="{ message, showError }">
            <FeTooltip
                :position="positionTooltip"
                :show-on-hover="false"
                :show="showError"
            >
                <template #activator>
                    <div
                        class="select-data"
                        :class="classes"
                    >
                        <label
                            v-if="label"
                            class="fe-inputV2__label"
                        >
                            {{ label }}
                            <span v-if="required" class="fe-inputV2__label-required">*</span>
                        </label>
                        <Flag
                            v-if="isAvailableCountry"
                            :code="value.toLowerCase()"
                            :disabled="disabled"
                            class="select-data__flag"
                        />
                        <div
                            v-if="dialCodeMode"
                            class="select-data__dial-code"
                        >
                            {{ "+" + isAvailableCountry.dialCode }}
                        </div>
                        <select v-model="value" :disabled="disabled" @change="selected($event)">
                            <option :value="(isAvailableCountry) ? '' : value" disabled>
                                {{ $t("REGISTRATION.COUNTRY") }}
                            </option>
                            <option
                                v-for="item in countriesPrepared"
                                :key="item.code"
                                :value="item.code"
                            >
                                {{ dialCodeMode ? `${item.name} (+${item.dialCode})` : item.name }}
                            </option>
                        </select>
                    </div>
                </template>
                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>
<script>
import { mapGetters } from "vuex";
import BaseField from "./BaseField.vue";
import { countryRule } from "@mixins/ValidationRules";
import Flag from "@components/CountryFlag/index.vue";

export default {
    name: "CountriesField",

    components: {
        Flag,
    },
    extends: BaseField,

    props: {
        required: {
            type: Boolean,
            default: false,
        },
        dialCodeMode: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapGetters("server", {
            countries: "GET_COUNTRIES",
        }),
        classes() {
            return {
                "select-data--with-label": this.label,
                "disabled": this.disabled,
            };
        },
        countriesPrepared() {
            return this.countries.map((country) => {
                let name = country.name.replace(/\(.*?\)/g, "");
                let code = country.code.toUpperCase();
                return {
                    ...country,
                    name,
                    code,
                };
            });
        },
        countryRules() {
            return [
                ...this.rules,
                countryRule,
            ];
        },
        isAvailableCountry() {
            return this.value && this.countriesPrepared.find((country) => {
                return country.code === this.value;
            });
        },
    },

    methods: {
        selected(event) {
            this.value = event.target.value;
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.select-data {
    &__flag {
        position: absolute;
        left: 1rem;
        top: calc(50% + 0.25rem);
        z-index: 1;
        overflow: hidden;
        pointer-events: none;

        & + select {
            padding-left: 3rem;
            padding-right: 1.5rem;
        }
    }

    &__dial-code {
        position: absolute;
        left: 3rem;
        top: 50%;
        z-index: 1;
        pointer-events: none;
        @include font-size--Caption1($font-weight--normal);
        color: $color-text-alt;


        & + select {
            text-indent: -10000rem;
        }
    }

    &.disabled {
        @include font-color--disabled;
    }
}
</style>
