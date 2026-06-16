<template>
    <div class="badge-container" :class="`badge-container--${theme}`">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { CustomBadgeThemes } from "@ui-kit/CustomBadge/config";

interface IProps {
    theme?: CustomBadgeThemes;
}
withDefaults(defineProps<IProps>(), {
    theme: CustomBadgeThemes.primary,
});
</script>

<style scoped lang="scss">
@import "~@theme/styles";
$themesBackground: (
    primary: $color-additional-1,
    secondary: $color-tertiary-1
);
.badge-container {
    border-radius: $border-radius-XS;
    padding: 0 0.5rem;
    @include font-size--SmallCaption($font-weight--bold);
    text-transform: uppercase;
    text-align: center;
    color: $color-on-light-back;

    @each $name, $color in $themesBackground {
        &--#{$name} {
            background: $color;
        }
    }
}
</style>
