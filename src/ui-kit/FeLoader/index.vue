<template>
    <div
        class="fe-loader"
        :class="{ 'fe-loader--centered': centered }"
        :style="{ fontSize: size + 'rem' }"
    >
        <div class="fe-loader__circle fe-loader__circle--1" />
        <div class="fe-loader__circle fe-loader__circle--2" />
        <div class="fe-loader__circle fe-loader__circle--3" />
    </div>
</template>

<script>
export default {
    name: "FeLoader",

    props: {

        /**
         * Loader size in rems
         * */
        size: {
            type: Number,
            default: 1,
        },

        centered: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
