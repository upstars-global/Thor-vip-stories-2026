<template>
    <span
        class="fe-nav-badge"
        :class="classes"
    >
        {{ badge.text }}
    </span>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
interface IBadge {
    background: string;
    color: string;
    text: string;
}
interface Props {
    badge: IBadge;
}
const props = defineProps<Props>();
const classes = computed<string[]>(() => {
    return [
        `fe-nav-badge--${props.badge.background}`,
        `fe-nav-badge--${props.badge.color}`,
    ];
});
</script>

<style lang="scss" src="./style.scss"></style>
