<script>
import Navigation from "./Navigation.vue";
import Pagination from "./Pagination.vue";
import { observeContentChanged } from "@helpers/observeContentChanged";

const FADE_DISTANCE = 64;

export default {
    name: "CarouselScroll",

    components: {
        Navigation,
        Pagination,
    },

    props: {
        transparentBorder: {
            type: Boolean,
            default: false,
        },
        autoFill: {
            type: Boolean,
            default: false,
        },
        autoplay: {
            type: Number,
            default: null,
        },
        activeIndex: {
            type: Number,
            default: 0,
        },
        pagination: {
            type: Boolean,
            default: false,
        },
        showNavigation: {
            type: Boolean,
            default: true,
        },
        disableFadeEffect: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            localActiveIndex: this.activeIndex,
            isScrolling: null,
            autoPlayId: null,
            backward: false,
            forward: false,
        };
    },

    watch: {
        activeIndex(value) {
            this.localActiveIndex = value;
            this.setPosition();
        },
        localActiveIndex(value) {
            this.$emit("pageChange", value);
        },
    },

    updated() {
        this.calculateCarousel(this.$refs.carouselList);
    },

    mounted() {
        this.$nextTick(() => {
            this.setPosition();
            this.calculateCarousel(this.$refs.carouselList);
            this.handleFadeEffect();
        });
        if (!this.disableFadeEffect) {
            observeContentChanged({
                target: this.$refs.carouselList,
                callback: () => {
                    this.handleFadeEffect();
                },
            });
        }

        this.setAutoPlay();
    },

    destroyed() {
        this.stopTimer();
    },

    methods: {
        children() {
            return this.$slots.default || [];
        },
        getItemWidth() {
            const style = getComputedStyle(this.$refs.carouselList);
            const gap = parseFloat(style.columnGap);
            const { firstChild } = this.$refs.carouselList;
            if (!firstChild) {
                return 0;
            }

            return firstChild.offsetWidth + gap;
        },

        updateScrollPosition(index) {
            const { offsetWidth } = this.$refs.carouselList;
            const itemWidth = this.getItemWidth();

            const perPage = Math.floor(offsetWidth / itemWidth);
            const slideWidth = perPage * itemWidth;

            this.$refs.carouselList.scrollTo({
                left: slideWidth * index,
                behavior: "smooth",
            });
        },

        setPosition() {
            if (this.activeIndex === 0) {
                return;
            }

            const offsetToActivePosition = this.activeIndex * this.getItemWidth();
            this.$refs.carouselList.scrollTo({
                left: offsetToActivePosition,
            });
        },

        getCurrentPage() {
            const { scrollLeft, offsetWidth } = this.$refs.carouselList;
            const itemWidth = this.getItemWidth();
            const perPage = Math.floor(offsetWidth / itemWidth);
            const slideWidth = perPage * itemWidth;

            return Math.round(scrollLeft / slideWidth);
        },

        calculateCarousel(element) {
            const { scrollLeft, offsetWidth, scrollWidth } = element;
            const currentScrollWidth = scrollLeft + offsetWidth;

            this.backward = scrollLeft > 0;
            this.forward = currentScrollWidth < scrollWidth;
            this.localActiveIndex = this.getCurrentPage();
        },

        handleFadeEffect() {
            if (this.disableFadeEffect) {
                return;
            }
            const carouselListElem = this.$refs.carouselList;

            const carouselListElemRect = carouselListElem.getBoundingClientRect();
            const scrollLeft = carouselListElem.scrollLeft;
            const scrollWidth = carouselListElem.scrollWidth;

            const leftBorderDistance = Math.min(scrollLeft, FADE_DISTANCE);
            const rightBorderDistance = Math.min((scrollWidth - carouselListElemRect.width) - scrollLeft, FADE_DISTANCE);

            const parts = [];
            if (rightBorderDistance > 0) {
                parts.push(
                    `rgba(0,0,0,${1 - (rightBorderDistance / FADE_DISTANCE)})`,
                    `rgba(0,0,0,1) ${FADE_DISTANCE}px`,
                );
            }
            if (leftBorderDistance > 0) {
                parts.push(
                    `rgba(0,0,0,1) calc(100% - ${FADE_DISTANCE}px)`,
                    `rgba(0,0,0,${1 - (leftBorderDistance / FADE_DISTANCE)})`,
                );
            }
            if (parts.length) {
                carouselListElem.style.webkitMaskImage = `-webkit-linear-gradient(right, ${parts.join(", ")})`;
            }
        },

        handleScroll({ target }) {
            this.calculateCarousel(target);
            this.handleFadeEffect();
        },

        setAutoPlay() {
            if (this.autoplay && this.autoPlayId === null) {
                this.autoPlayId = setInterval(() => {
                    this.localActiveIndex = this.getCurrentPage() + 1;
                    if (this.localActiveIndex >= this.children().length) {
                        this.localActiveIndex = 0;
                    }

                    this.updateScrollPosition(this.localActiveIndex);
                }, this.autoplay);
            }
        },

        stopTimer() {
            if (this.autoPlayId !== null) {
                clearInterval(this.autoPlayId);
                this.autoPlayId = null;
            }
        },
    },

    render(createElement) {
        const slots = this.children()
            .filter(({ tag }) => {
                return Boolean(tag);
            })
            .map((element) => {
                return createElement(
                    "div",
                    {
                        class: {
                            "carousel-scroll__item": true,
                            "carousel-scroll__item--large": element.componentOptions?.propsData?.isLarge,
                        },
                    },
                    [ element ],
                );
            });

        return createElement("div",
            {
                class: {
                    "carousel-scroll": true,
                    "carousel-scroll--transparent-border": this.transparentBorder,
                    "carousel-scroll--auto-fill": this.autoFill,
                },
                on: {
                    mouseover: this.stopTimer,
                    mouseleave: this.setAutoPlay,
                },
            },
            [
                ...(this.showNavigation ? [ createElement("navigation", {
                    props: {
                        backward: this.backward,
                        forward: this.forward,
                    },
                    on: {
                        change: (direction) => {
                            this.updateScrollPosition(this.localActiveIndex + direction);
                        },
                    },
                }) ] : []),
                createElement("div", {
                    class: {
                        "carousel-scroll__list": true,
                    },
                    ref: "carouselList",
                    on: {
                        "&scroll": this.handleScroll,
                    },
                }, [ slots ]),
                this.pagination ? createElement("pagination", {
                    props: {
                        length: slots.length,
                        activeIndex: this.localActiveIndex,
                    },
                    on: {
                        change: (index) => {
                            this.updateScrollPosition(index);
                        },
                    },
                }) : null,
            ],
        );
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

/**
    * Global default properties
*/
:root {
    --carousel-item-width: 12rem;
    --carousel-gap: 1rem;

    @include media(M) {
        --carousel-gap: 1.5rem;
    }
}
</style>

<style lang="scss" src="./style.scss"></style>
