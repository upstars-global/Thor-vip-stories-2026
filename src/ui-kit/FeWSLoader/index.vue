<template>
    <div
        class="fe-ws-loader"
        :style="{ fontSize: size + 'rem' }"
    >
        <FeImage :src="loaderSvg" class="fe-ws-loader__image" />
    </div>
</template>

<script lang="ts" setup>
import FeImage from "../FeImage/index.vue";
import loaderSvg from "./loader.svg";

interface IProps {
    size?: number;
}
withDefaults(defineProps<IProps>(), {
    size: 8,
});
</script>

<style scoped lang="scss">
.fe-ws-loader {
    &__image {
        width: 1em;
        height: 1em;
    }
}
</style>
