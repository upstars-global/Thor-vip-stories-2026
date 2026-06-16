<script setup lang="ts">
import { IChip } from "./types";

interface IProps {
    data: IChip;
    active?: boolean;
}

defineProps<IProps>();
</script>

<template>
    <div
        class="fe-chip"
        :class="{
            'fe-chip-active': active,
        }"
        :data-test="data.dataTest"
        @click="$emit('click', $event)"
    >
        {{ data.label }}
    </div>
</template>

<style scoped lang="scss">
@import "~@theme/styles";

.fe-chip {
    border-radius: $border-radius-M;
    border: 1px solid $color-tertiary-3;
    @include font-size--Caption2;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &-active {
        background: $color-tertiary-3;
        border-color: transparent;
    }

    &:hover {
        background: $color-tertiary-2;
        border-color: transparent;
    }
}
</style>
