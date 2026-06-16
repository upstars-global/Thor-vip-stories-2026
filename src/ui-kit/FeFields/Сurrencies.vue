<template>
    <FieldValidator
        v-if="currencies.length > 1"
        ref="validator"
        :value="value"
        :rules="[ ...rules ]"
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
                        :class="{ 'select-data--with-label': label }"
                    >
                        <label
                            v-if="label"
                            class="fe-inputV2__label"
                        >
                            {{ label }}
                        </label>
                        <select v-model="value" @change="selected($event)">
                            <option
                                v-for="item in currencies"
                                :key="item"
                                :value="item"
                            >
                                {{ item }}
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
import { mapActions as piniaActions } from "pinia";
import { mapGetters } from "vuex";
import BaseField from "./BaseField.vue";
import { useUserBalance } from "@store/userBalance";

export default {
    name: "CurrenciesField",

    extends: BaseField,

    computed: {
        ...mapGetters("server", {
            currencies: "GET_CURRENCIES",
        }),
    },

    methods: {
        ...piniaActions(useUserBalance, {
            setUserCurrency: "setUserCurrency",
        }),
        selected(event) {
            this.value = event.target.value;
            this.setUserCurrency(this.value);
        },
    },
};
</script>
