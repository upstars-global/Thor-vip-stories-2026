<template>
    <div id="mobile_control_area" :class="[ 'control-area', positionClass ]" />
</template>

<script>
export default {
    name: "MobileControlArea",
    props: {
        position: {
            type: String,
            default: "left",
            validator: (value) => [ "left", "right" ].includes(value),
        },
    },
    computed: {
        positionClass() {
            return this.position === "left" ? "left" : "right";
        },
    },
};
</script>

<style scoped lang="scss">

@import "/src/components/Stories/_mixins.scss";

.control-area {
  position: absolute;
  height: 100%;
  width: 50%;
  cursor: pointer;
  top: 0;
  z-index: 1000;
  user-select: none;
  @include media(M) {
    display: none;
  }
}

.left {
  left: 0;
}
.right {
  left: 50%;
}

</style>
