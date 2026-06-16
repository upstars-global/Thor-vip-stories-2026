<script setup lang="ts">
import FeChip from "./FeChip.vue";
import { IChip } from "./types";

interface IProps {
    value: string;
    values: IChip[];
}
defineProps<IProps>();

interface Emits {
    (e: "input", v: string): void;
}
const emit = defineEmits<Emits>();
</script>

<template>
    <div class="fe-chip-group">
        <FeChip
            v-for="chip in values"
            :key="chip.name"
            class="fe-chip-group__item"
            :data="chip"
            :active="chip.name === value"
            @click="emit('input', chip.name)"
        />
    </div>
</template>

<style scoped lang="scss">
.fe-chip-group {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.5rem;

    &__item {
        margin-left: 0.5rem;
    }
}
</style>
