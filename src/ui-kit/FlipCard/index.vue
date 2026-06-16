<template>
    <div class="flip-card" :class="classes">
        <div class="flip-card__side flip-card__side--front">
            <slot :rotate-handler="rotate" :is-rotate="isRotate" :active-side="!isRotate" />
        </div>
        <div class="flip-card__side flip-card__side--back">
            <slot name="back" :rotate-handler="rotate" :active-side="isRotate" />
        </div>
    </div>
</template>

<script>
export default {
    name: "FlipCard",

    components: {},

    props: {
        direction: {
            type: String,
            default: "right",
        },
        canRotate: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            isRotate: false,
        };
    },

    computed: {
        classes() {
            return {
                "flip-card--rotatable": this.canRotate,
                "flip-card--rotated": this.isRotate,
                [`flip-card--direction-${this.direction}`]: this.direction,
            };
        },
    },

    methods: {
        rotate() {
            if (this.canRotate) {
                this.isRotate = !this.isRotate;
                this.$emit("rotated", this.isRotate);
            }
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
