<template>
    <div class="block-wrapper">
        <ul class="block-text">
            <li v-for="(text, index) in blockTexts" :key="index">
                {{ text }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "RequirementBlock",
    props: {
        blockTexts: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
};
</script>

<style scoped lang="scss">
@import "~@theme/styles";

.block-wrapper {
    position: absolute;
    height: auto;
    border-radius: 5rem;
    background: #29A6DC;
    display: flex;
    flex-direction: column;
    margin-top: 0.75rem;
    width: fit-content;
    text-align: center;
    border: 4px solid;
    border-color: var(--color-tertiary-1);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    left: 50%;
    transform: translate(-8%) rotate(9deg);
    top: 20%;
    z-index: 10;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
}

.block-text {
    list-style-type: disc;
    position: relative;
    color: var(--color-tertiary-1);
    font-family: Rubik, system-ui, sans-serif;
    font-size: 0.85rem;
    font-style: normal;
    font-weight: $font-weight--bold;
    width: 100%;
    text-align: left;
    line-height: 150%;
    left: -2rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    margin-right: -1rem;
}

li {
    font-size: 0.75rem;
    font-family: Rubik, system-ui, sans-serif;
    font-weight: $font-weight--bold;
    white-space: nowrap;
}

</style>
