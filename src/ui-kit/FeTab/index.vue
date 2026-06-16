<template>
    <div
        class="fe-tab"
        :class="classes"
        tabindex="0"
        @click="clickHandler"
    >
        <span ref="tabInfo">
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    name: "FeTab",

    props: {

        /**
         * @type {String}
         * @requires
         * */
        name: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {

        /**
         * List of classes for tab
         *
         * @returns {Object}
         * */
        classes() {
            return {
                "fe-tab--active": this.active,
                "fe-tab--disabled": this.disabled,
            };
        },
    },

    mounted() {
        this.emitTabOptions("setTabOptions");
    },

    methods: {
        emitTabOptions(event) {
            this.$emit(
                event,
                this.elTabOptions(),
            );
        },

        clickHandler() {
            if (this.disabled) {
                return;
            }
            this.emitTabOptions("setActiveTab");
        },


        /**
         * @returns {Object}
         * */
        elTabOptions() {
            const elTab = this.$refs.tabInfo;
            const parentEl = elTab.parentElement;
            const offsetLeft = parentEl.offsetLeft;
            const width = parentEl.offsetWidth;

            return {
                width,
                offsetLeft,
            };
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
