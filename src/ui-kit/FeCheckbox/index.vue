<template>
    <label :class="className" class="checkbox">
        <input v-model="proxyModel" type="checkbox" class="checkbox__input">
        <span class="checkbox__mask" />
        <slot />
    </label>
</template>

<script>
export default {
    props: {
        className: {
            type: String,
        },
        value: {
            type: Boolean,
        },
    },

    computed: {
        proxyModel: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
