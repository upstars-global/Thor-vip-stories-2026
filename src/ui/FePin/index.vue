<template>
    <div class="fe-pin-v2">
        <slot name="activator" />
        <div class="fe-pin-v2__counter">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "FePin",
};
</script>

<style lang="scss" src="./style.scss"></style>
