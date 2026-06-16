<template>
    <div
        class="fe-toolbar"
        :class="classes"
    >
        <div v-if="isLeft" class="fe-toolbar__left">
            <slot name="left" />
        </div>
        <div class="fe-toolbar__center">
            <slot>
                <p class="fe-toolbar__title text--align-center">
                    {{ title }}
                </p>
            </slot>
        </div>
        <div class="fe-toolbar__right">
            <slot name="right" />
        </div>
    </div>
</template>

<script>
export default {
    name: "FeToolbar",

    props: {
        isLeft: {
            type: Boolean,
            default: true,
        },
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
                "fe-toolbar--hide-left": !this.isLeft,
            };
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
