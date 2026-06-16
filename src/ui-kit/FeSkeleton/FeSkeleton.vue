<template>
    <div class="fe-skeleton" :class="`fe-skeleton__alt-${alt}`" />
</template>

<script lang="ts" setup>
interface IProps {
    alt?: 1 | 2 | 3;
}

withDefaults(defineProps<IProps>(), {
    alt: 1,
});
</script>

<style scoped lang="scss">
@import "~@theme/styles";

$trans: rgba(255, 255, 255, 0);
$white-trans-1: rgba(255, 255, 255, 0.05);
$white-trans-2: rgba(255, 255, 255, 0.06);

.fe-skeleton {
    position: relative;
    overflow: hidden;

    &__alt-1 {
        background: $color-layer-alt-1;
    }
    &__alt-2 {
        background: $color-layer-alt-2;
    }
    &__alt-3 {
        background: $color-layer-alt-3;
    }

    &:after {
        width: 100%;
        height: 100%;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        animation: 1s linear infinite fe-skeleton-animation;
        background: linear-gradient(
                to left,
                $trans 0%,
                $white-trans-1 35%,
                $white-trans-2 50%,
                $white-trans-1 65%,
                $trans 100%
        );
    }
}
</style>

<style>
@keyframes fe-skeleton-animation {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}
</style>
