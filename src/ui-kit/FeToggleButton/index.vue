<template>
    <div class="fe-toggle-button" @click="toggleBtn">
        <FeButton v-bind="$attrs" v-on="$listeners">
            <slot />
            <div v-if="!$attrs.disabled" :class="carretClases">
                <FeIcon :icon="FeIconConfig.dropdownDown" />
            </div>
        </FeButton>
    </div>
</template>

<script>
import FeButton, { themes, sizeShadowList } from "@ui-kit/FeButton/index.vue";
import iconArrowDown from "@theme/images/icon-arrow-down.inline.svg";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";

// Proxy params FeButton.
export {
    themes,
    sizeShadowList,
};

export default {
    name: "FeToggleButton",

    components: {
        FeButton,
        FeIcon,
    },

    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            iconArrowDown,
            FeIconConfig,
        };
    },

    computed: {
        carretClases() {
            return `fe-toggle-button__icon ${ this.value ? "fe-toggle-button__icon--up" : "" }`;
        },
    },

    methods: {
        toggleBtn() {
            this.$emit("input", !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@theme/styles";

.fe-toggle-button {
    position: relative;
    text-align: center;

    &__icon {
        top: 50%;
        margin-right: 1rem;
        right: 0;
        position: absolute;
        transform: translateY(-50%);

        &--up {
            transform: translateY(-50%) rotate(-180deg);
        }
    }
}
</style>
