<template>
    <div class="top-bar">
        <div class="bar-container">
            <svg class="stories-progress-bar" :viewBox="`0 0 ${progressBarWidth} 4`">
                <g mask="url(#progress-alpha-mask)">
                    <rect class="progress-line-bg" :width="progressBarWidth" height="4" />
                    <rect class="progress-line" :width="computedWidth" height="4" rx="2" ry="2" />
                    <mask id="progress-alpha-mask" mask-type="alpha">
                        <rect
                            v-for="(segment, index) in numberOfSegments"
                            :key="index"
                            :width="segmentWidth"
                            height="4"
                            rx="2"
                            ry="2"
                            :transform="`translate(${segmentTransform(index)})`"
                        />
                    </mask>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    name: "StoriesTopBar",
    props: {
        progress: {
            type: Number,
            required: true,
        },
        numberOfSegments: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const progressBarWidth = ref(300);

        const computedWidth = computed(() => progressBarWidth.value / 100 * props.progress);

        const segmentWidth = computed(() => (progressBarWidth.value - (props.numberOfSegments - 1) * 4) / props.numberOfSegments);

        const segmentTransform = (index) => index * (segmentWidth.value + 4);

        return { progressBarWidth, computedWidth, segmentWidth, segmentTransform };
    },
};
</script>


<style scoped lang="scss">
@import "/src/components/Stories/_mixins.scss";

.top-bar {
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
  @include media(M) {
    top: 6%;
  }
}
.bar-container {
  top: 0;
  position: relative;
  width: 90%;
  @include media(M) {
      width: 52vh;
  }
}

.stories-progress-bar {
  margin-top: 2.5vh;
  position: relative;
  top: 0;
  width: 100%;
  transform-origin: center;
  z-index: 10;
  @include media(M) {
    width: 52vh;
  }
}

.profile-row {
  position: relative;
  width: 100%;
  margin-top: 0.75rem;
  @include media(M) {
    width: 52vh;
  }
}


.profile-stroke {
  position: relative;
  display: flex;
  width: 3.25rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  background: var(--color-primary-gradient);
  border-radius: 4rem;
  z-index: 5;
}

.profile-icon {
  position: relative;
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  background: var(--color-layer-alt-2);
  border-radius: 4rem;
  z-index: 5;
}

.story-name {
  font-family: Rubik, system-ui, sans-serif;
  letter-spacing: 0.01rem;
  position: absolute;
  font-weight: $font-weight--bold;
  font-size: 1.25rem;
  left: 4rem;
  top: 0.25rem;
  z-index: 1;
}

.story-step {
    font-family: Rubik, system-ui, sans-serif;
    position: absolute;
    font-weight: $font-weight--normal;
    font-size: 0.75rem;
    left: 4rem;
    top: 1.75rem;
    z-index: 1;
}


.progress-line {
  //transition: width 0.25s linear;
  fill: var(--color-text-menu-default);
}

.progress-line-bg {
  fill: var(--color-text-menu-default);
  opacity: 0.3;
}

</style>
