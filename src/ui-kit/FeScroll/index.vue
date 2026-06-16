<template>
    <vuescroll class="fe-scroll" :ops="vuescrollOps">
        <slot />
    </vuescroll>
</template>

<script>
import Vue from "vue";
import config from "@theme/configs/config";
import vuescroll from "vuescroll/dist/vuescroll-native";
import { useStore } from "@store/useStore";

Vue.use(vuescroll);

export default {
    name: "FeScroll",

    components: {
        vuescroll,
    },

    data() {
        const store = useStore();

        return {
            vuescrollOps: {
                bar: {
                    background: config.colors.scrollBar,
                    disable: store.getters.isMockerMode,
                },
            },
        };
    },
};
</script>
