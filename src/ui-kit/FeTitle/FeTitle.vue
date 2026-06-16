<script setup lang="ts">
import { computed } from "vue";
import { TitleSpacing } from "./config";

interface IProps {
    title: string;
    center?: boolean;
    tag?: string;
    spacing?: TitleSpacing;
    titleClasses?: string | Record<string, boolean> | Array<string | Record<string, boolean>>;
}
const props = withDefaults(defineProps<IProps>(), {
    tag: "p",
    spacing: TitleSpacing.SM,
});

const classes = computed(() => {
    return [
        `fe-title-spacing-${props.spacing}`,
        {
            "fe-title-center": props.center,
        },
    ];
});
</script>

<template>
    <div class="fe-title-wrapper">
        <div class="fe-title" :class="classes">
            <slot name="title">
                <component :is="tag" :class="titleClasses">
                    {{ title }}
                </component>
            </slot>
            <div class="fe-title__right">
                <slot name="right" />
            </div>
        </div>
        <slot />
    </div>
</template>

<style scoped lang="scss">
@import "~@theme/styles";

.fe-title-wrapper {
    .fe-title {
        position: relative;
        display: flex;

        &-center {
            justify-content: center;
        }
        &-spacing {
            &-sm {
                margin-bottom: 0.5rem;
                @include media(M) {
                    margin-bottom: 1rem;
                }
            }
            &-md {
                margin-bottom: 1rem;
                @include media(M) {
                    margin-bottom: 1.5rem;
                }
            }
            &-lg {
                margin-bottom: 1.5rem;
                @include media(M) {
                    margin-bottom: 2rem;
                }
            }
        }

        &__right {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }
    }
}
</style>
