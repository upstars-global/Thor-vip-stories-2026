<template>
    <div class="carousel-scroll__navigation">
        <FeButton
            :icon="FeIconConfig.dropdownLeft"
            :theme="navigationTheme"
            aria-label="Previous page"
            :tabindex="backward ? 0 : -1"
            class="carousel-scroll__navigation-button carousel-scroll__navigation-prev"
            :class="{ 'carousel-scroll__navigation--hidden': !backward }"
            @click="pagination(-1)" />
        <FeButton
            :icon="FeIconConfig.dropdownRight"
            :theme="navigationTheme"
            aria-label="Next page"
            :tabindex="forward ? 0 : -1"
            class="carousel-scroll__navigation-button carousel-scroll__navigation-next"
            :class="{ 'carousel-scroll__navigation--hidden': !forward }"
            @click="pagination(1)" />
    </div>
</template>

<script>
import FeButton, * as FeButtonConfig from "@ui-kit/FeButton/index.vue";
import { FeIconConfig } from "@theme/configs/icons";
import config from "@theme/configs/config";

export default {
    name: "Navigation",
    components: {
        FeButton,
    },
    props: {
        backward: {
            type: Boolean,
            default: false,
        },
        forward: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            FeButtonConfig,
            FeIconConfig,
            navigationTheme: config.buttons.GameRow.rowNavigtion,
        };
    },
    methods: {
        pagination(index) {
            this.$emit("change", index);
        },
    },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
