<template>
    <div class="header-text">
        {{ headerText }}
    </div>
</template>


<script>
export default {
    name: "HeaderText",
    props: {
        headerText: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
@import "~@theme/styles";
.header-text {
    position: relative;
    top: 0;
    left: 0;
    color: var(--color-primary-1);
    font-family: Rubik, system-ui, sans-serif;
    font-size: 2rem;
    font-style: normal;
    font-weight: $font-weight--black;
    width: 100%;
    text-align: left;
    z-index: 1;
}
</style>
