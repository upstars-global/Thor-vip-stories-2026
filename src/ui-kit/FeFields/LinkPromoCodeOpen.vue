<template>
    <div class="link-promo-code">
        <FeLink
            :theme="FeLinkConfig.themes.Secondary"
            @click="$emit('open')"
        >
            {{ $t("REGISTRATION.PROMO_CODE_LINK") }}
        </FeLink>

        <div class="link-promo-code__tooltip">
            <Tooltip left>
                <template #activator>
                    <FeIcon
                        class="promo-code__icon-display"
                        :icon="FeIconConfig.info1"
                    />
                </template>
                {{ $t("REGISTRATION.PROMO_CODE_TOOLTIP") }}
            </Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from "@components/Tooltip/index.vue";

import FeLink, * as FeLinkConfig from "../FeLink/index.vue";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";

export default {
    name: "LinkPromoCodeOpen",

    components: {
        FeIcon,
        FeLink,
        Tooltip,
    },

    data() {
        return {
            FeIconConfig,
            FeLinkConfig,
        };
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.link-promo-code {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    @include font-size--Caption1;

    &__tooltip {
        width: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
