<template>
    <FieldValidator
        ref="validator"
        :value="value"
        :rules="rules"
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
                        type="text"
                        :placeholder="placeholder || $t('REGISTRATION.PROMO_CODE_PLACEHOLDER')"
                        :disabled="disabled"
                        :data-test="dataTest"
                        :label="label"
                    >
                        <template #left>
                            <div class="promo-code__container-left">
                                <FeIcon
                                    v-if="valid"
                                    :icon="FeIconConfig.promoCode"
                                    class="promo-code__icon-ticket" />
                                <FeIcon
                                    v-if="!valid"
                                    :icon="FeIconConfig.attention2"
                                    class="promo-code__icon-error" />
                            </div>
                        </template>
                        <template #right>
                            <div class="promo-code__container-right">
                                <Tooltip top-left>
                                    <template #activator>
                                        <FeIcon
                                            v-if="!hideInformer"
                                            class="promo-code__icon-display"
                                            :icon="FeIconConfig.info1"
                                        />
                                    </template>
                                    {{ $t("REGISTRATION.PROMO_CODE_HINT") }}
                                </Tooltip>
                            </div>
                        </template>
                    </FeInput>
                </template>
                <span>{{ message }}</span>
            </FeTooltip>
        </template>
    </FieldValidator>
</template>

<script>
import BaseField from "./BaseField.vue";

import Tooltip from "@components/Tooltip/index.vue";

import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";

export default {
    name: "PromoCodeField",

    components: {
        FeIcon,
        Tooltip,
    },

    extends: BaseField,

    props: {
        hideInformer: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            FeIconConfig,
        };
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
