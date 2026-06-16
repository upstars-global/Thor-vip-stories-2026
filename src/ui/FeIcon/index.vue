<template functional>
    <div class="fe-icon" :class="data.staticClass || ''" v-bind="data.attrs" v-on="listeners" v-html="props.icon" />
</template>

<script>
export { icons } from "@theme/configs/icons";

export default {
    name: "FeIcon",

    props: {
        icon: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.fe-icon {
    @include transition(
            transition--color(),
            transition--border-color(),
            transition--background-color()
    );

    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;

    svg path {
        fill: currentColor;
    }
}
</style>
