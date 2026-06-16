<template>
    <FeImage
        class="fe-badge fe-badge-image"
        :src="badge"
        :alt="`badge-${ alt }`"
        :data-test="`game-item__badge--${ alt }`"
    />
</template>

<script lang="ts" setup>
import FeImage from "../FeImage/index.vue";

interface IProps {
    badge: any;
    alt: string;
}
defineProps<IProps>();

</script>

<style lang="scss" src="./style.scss"></style>
