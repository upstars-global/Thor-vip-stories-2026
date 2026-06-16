<template>
    <div
        class="carousel-scroll__pagination"
    >
        <div class="carousel-scroll__pagination-container" role="tablist">
            <button
                v-for="(_, index) in length"
                :key="index"
                class="carousel-scroll__pagination-dot"
                aria-hidden="false"
                role="tab"
                :value="index"
                :aria-label="index"
                :class="{ 'carousel-scroll__pagination-dot--active': index === activeIndex }"
                @click="changeActivePage(index)"
            />
        </div>
    </div>
</template>


<script>
export default {
    name: "Pagination",

    props: {
        length: {
            type: Number,
            required: true,
        },
        activeIndex: {
            type: Number,
            required: true,
        },
    },

    methods: {
        changeActivePage(index) {
            this.$emit("change", index);
        },
    },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
