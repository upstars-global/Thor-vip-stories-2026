<template>
  <div class="close-button">
    <img class="icon-itself full_size" :src="close_btn" alt="Close button" />
  </div>
</template>

<script>
import close_btn from "@components/Stories/img/icons/close.svg";

export default {
  name: "CloseButton",
  data() {
    return {
      close_btn
    };
  }
};
</script>

<style scoped lang="scss">

@import "/src/components/Stories/_mixins.scss";

.close-button {
  position: absolute;
  display: flex;
  top: 0.5vh;
  left: 0;
  width: 4vh;
  height: 4vh;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
    @include media(M) {
        top: 0;
        left: 0;
        height: 4vh;
        width: 4vh;
    }
}

.full_size {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.icon-itself {
    fill: var(--color-text-alt);
    transition: fill .3s linear;
}

.close-button:hover .icon-itself{
    fill: var(--color-primary-1);
    filter: hue-rotate(252deg) brightness(1.5);
}

</style>
