<template>
    <div class="fe-toggle-button" @click="toggleBtn">
        <FeButton
            v-bind="$attrs"
            :class="{'fe-toggle-button--transparent':isTransparent}"
            v-on="$listeners"
        >
            <slot />
            <div :class="carretClases">
                <FeIcon
                    v-if="!$attrs.disabled"
                    :icon="FeIconConfig.icons.fill.dropdownDown"
                />
            </div>
        </FeButton>
    </div>
</template>

<script>
import FeButton, { themes, sizeShadowList } from "@ui/FeButton/index.vue";
import FeIcon, * as FeIconConfig from "@ui/FeIcon/index.vue";

// Proxy params FeButton.
export {
    themes,
    sizeShadowList,
};

export default {
    name: "FeToggleButton",

    components: {
        FeIcon,
        FeButton,
    },

    props: {
        value: {
            type: Boolean,
            default: false,
        },

        isTransparent: {
            type: Boolean,
        },
    },

    data() {
        return {
            FeIconConfig,
        };
    },

    computed: {
        carretClases() {
            return {
                "fe-toggle-button__icon": true,
                "fe-toggle-button__icon--up": this.value,
            };
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
.fe-toggle-button {
    position: relative;
    text-align: center;

    &__icon {
        top: 50%;
        margin-right: 1.5rem;
        right: 0;
        position: absolute;
        width: 2rem;
        height: 2rem;
        transform: translateY(-50%);

        &--up {
            transform: translateY(-50%) rotate(-180deg);
        }
    }

    :deep(.fe-toggle-button--transparent) {
        background: transparent;
    }
}
</style>
