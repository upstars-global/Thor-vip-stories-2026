<template>
    <div class="fe-progressbar" :class="classes">
        <slot name="top" />
        <div class="fe-progressbar__main">
            <div v-if="big" class="fe-progressbar__inner">
                <slot name="inside" />
            </div>
            <div
                class="fe-progressbar__active"
                :style="progressWidth"
            />
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IProps {
    big?: boolean;
    progress: number;
    from?: number;
    to?: number;
}
const props = withDefaults(defineProps<IProps>(), {
    from: 0,
    to: 100,
});

const classes = computed(() => {
    return props.big ? "fe-progressbar--big" : "";
});
const progressWidth = computed(() => {
    const { progress, from, to } = props;
    const percent = (progress - from) / (to - from) * 100;
    return `width: ${percent}%`;
});
</script>

<style lang="scss" src="./style.scss"></style>
