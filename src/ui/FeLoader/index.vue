<template>
    <div
        class="fe-loader"
    >
        <FeImg :src="preLoaderImg" class="fe-loader_svg" />
    </div>
</template>

<script>
import FeImg from "@ui/FeImage/index.vue";
import preLoaderImg from "@ui/FeLoader/img/Preloader_rocket.svg";

export default {
    name: "FeLoader",

    components: {
        FeImg,
    },

    data() {
        return {
            preLoaderImg,
        };
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
