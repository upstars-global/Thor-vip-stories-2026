<template>
    <div
        class="fe-toolbar"
        :class="classes"
    >
        <div class="fe-toolbar__left">
            <slot name="left" />
        </div>
        <div class="fe-toolbar__center">
            <slot>
                {{ title }}
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "FeToolbar",

    props: {
        theme: {
            type: Object,
            default: () => {
                return {};
            },
        },
        title: {
            type: String,
            default: "",
        },
        titleBig: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        classes() {
            return {
                "fe-toolbar--big-title": this.titleBig,
            };
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
