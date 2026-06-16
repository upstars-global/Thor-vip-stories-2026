<template>
    <FeText
        :size="titleSize"
        :align="FeTextConfig.align.Center"
    >
        <slot />
    </FeText>
</template>

<script>
import FeText, * as FeTextConfig from "@ui/FeText/index.vue";

export default {
    name: "FeTitle",

    components: {
        FeText,
    },

    props: {
        big: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            FeTextConfig,
        };
    },

    computed: {
        titleSize() {
            if (this.big) {
                return FeTextConfig.size.H2;
            }
            return FeTextConfig.size.H3;
        },
    },
};
</script>
