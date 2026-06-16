<template>
    <div class="accordion-menu">
        <div class="accordion-menu__activator">
            <slot
                name="activator"
                :toggle-handler="toggleHandler"
                :show-handler="showHandler"
                :hide-handler="hideHandler"
                :show-content="showContent"
            />
        </div>
        <transition-group tag="div" class="accordion-menu__content" name="accordion">
            <template v-if="showContent">
                <slot :hide-handler="hideHandler" />
            </template>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "FeAccordion",
    props: {
        hasContent: {
            type: Boolean,
            default: true,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showContent: false,
        };
    },
    watch: {
        hasContent() {
            if (!this.hasContent) {
                this.hideHandler();
            }
        },
    },
    created() {
        this.showContent = this.isOpen;
    },
    methods: {
        showHandler() {
            if (this.hasContent) {
                this.showContent = true;
            }
        },
        hideHandler() {
            this.showContent = false;
        },
        toggleHandler() {
            if (this.showContent) {
                this.hideHandler();
            } else {
                this.showHandler();
            }
        },
    },
};
</script>

<style lang="scss">
    .accordion-menu__content {
        overflow: hidden;
    }

    .accordion-enter-active, .accordion-leave-active {
        transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    }

    .accordion-enter, .accordion-leave-to {
        transform: translateY(-100%);
        opacity: 0;
    }
</style>
