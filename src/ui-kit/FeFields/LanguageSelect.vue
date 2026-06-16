<template>
    <div class="select-data select-lang">
        <Flag v-if="value" :code="countryByLocale" class="select-lang__flag" />
        <select
            v-model.trim="value"
            class="select-data-field"
            @change="change"
        >
            <option
                v-for="item in languageForSelect"
                :key="item.code"
                :value="item.code"
                style="text-transform: uppercase"
            >
                {{ $t(`PROFILE.LANGUAGE_${ item.name.toUpperCase() }`) }}
            </option>
        </select>
    </div>
</template>

<script>
import BaseField from "./BaseField.vue";
import { mapGetters, mapActions } from "vuex";
import Flag from "@components/CountryFlag/index.vue";

export default {
    name: "LanguageSelect",

    components: {
        Flag,
    },

    extends: BaseField,

    computed: {
        ...mapGetters("multilang", {
            locales: "GET_LOCALES",
            userLocale: "GET_USER_LOCALE",
        }),

        languageForSelect() {
            return this.locales.filter((locale) => {
                return locale.code;
            });
        },

        countryByLocale() {
            const exceptions = [ "en", "uk" ];

            if (exceptions.includes(this.value)) {
                return "gb";
            } else if (this.value.includes("-")) {
                return this.value.split("-")[1].toLowerCase();
            }

            return this.value;
        },
    },

    methods: {
        ...mapActions("multilang", {
            updateUserLocale: "UPDATE_USER_LOCALE",
        }),
        change() {
            this.updateUserLocale({ lang: this.value });
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.select-lang {
    position: relative;

    &__flag {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
    }

    .select-data-field {
        @include font-size--Caption2($font-weight--bold);
        padding-left: 3rem;
        padding-right: 2rem;
        background: $color-tertiary-3;
        color: $color-text-body;

        option {
            text-transform: uppercase;
        }
    }
}
</style>
