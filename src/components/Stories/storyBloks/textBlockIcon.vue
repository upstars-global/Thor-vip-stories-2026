<template>
    <div class="block-wrapper">
        <img :src="iconSrc" class="advantage-icon" alt="">
        <div class="block-text">
            {{ blockText }}
        </div>
    </div>
</template>


<script>
export default {
    name: "TextBlockIcon",
    props: {
        blockText: {
            type: String,
            required: true,
        },
        iconSrc: {
            type: String,
        },
    },
};
</script>

<style scoped lang="scss">
@import "~@theme/styles";

.block-wrapper {
    position: relative;
    height: auto;
    border-radius: 0.75rem;
    background: var(--color-tertiary-2);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1.5rem;
    width: 47%;
}

.block-text {
    position: relative;
    top: 0;
    left: 0;
    color: var(--color-tertiary-1);
    font-family: Rubik, system-ui, sans-serif;
    font-size: 0.85rem;
    font-style: normal;
    font-weight: $font-weight--bold;
    width: 100%;
    text-align: left;
    line-height: 150%;
    margin-top: 0.5rem;
}

.advantage-icon {
    position: relative;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
}
</style>
