<template>
    <FieldValidator
        ref="validator"
        :name="label"
        :value="value"
        :rules="[ ...rules, birthdayMinRule, birthdayMaxRule ]"
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
                        v-model.trim="localValue"
                        type="tel"
                        :placeholder="dateController.getPlaceholder()"
                        :mask="dateController.getMask()"
                        :error="!valid"
                        :disabled="disabled"
                        :data-test="dataTest"
                        :max="maxDate"
                        :min="minDate"
                        :label="label"
                        required
                        @focus="onChanHandler"
                    >
                        <template #right>
                            <FeIcon
                                v-if="showCalendar"
                                class="fe-inputV2__calendar"
                                :icon="FeIconConfig.calendar"
                            />
                        </template>
                    </FeInput>
                </template>
                {{ message }}
            </FeTooltip>
        </template>
    </FieldValidator>
</template>

<script>
import { mapGetters } from "vuex";
import BaseField from "../BaseField";
import { birthdayMinRule, birthdayMaxRule } from "@mixins/ValidationRules";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";
import { DateController } from "./DateController";

export default {
    name: "BirthdayNew",

    components: {
        FeIcon,
    },

    extends: BaseField,

    props: {
        required: {
            type: Boolean,
            default: false,
        },
        showCalendar: {
            type: Boolean,
            default: true,
        },
        country: {
            type: String,
            default: "",
        },
    },

    data() {
        const dateController = new DateController({
            country: this.country,
        });
        return {
            dateController,
            localValue: dateController.formatFromDefault(this.input.value),
            FeIconConfig,
            birthdayMinRule,
            birthdayMaxRule,
        };
    },

    computed: {
        ...mapGetters({
            isMobile: "isMobile",
        }),
        maxDate() {
            let today = new Date();
            today.setFullYear(today.getFullYear() - 18);

            return today.toISOString().substring(0, 10);
        },
        minDate() {
            let today = new Date();
            today.setFullYear(today.getFullYear() - 118);

            return today.toISOString().substring(0, 10);
        },
    },

    watch: {
        localValue(value) {
            this.$refs.validator.validate();
            this.value = this.dateController.formatToDefault(value);
        },
        value: {
            handler(value) {
                const formatted = this.dateController.formatFromDefault(value);
                if (formatted && formatted !== this.localValue) {
                    this.localValue = formatted;
                }
            },
            deep: true,
        },
    },
    methods: {
        onChanHandler(event) {
            this.$emit("focus", event);
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
