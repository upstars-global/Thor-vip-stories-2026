<template>
    <PerfectScrollbar
        class="fe-menu-round"
        :class="{ 'menu-round--sticky': isMobile, 'is-sticky': stickyEnable && isSticky }"
    >
        <template v-if="routerMenu">
            <slot
                v-for="item in menu"
                :item="item"
                :go-to="goTo"
                :active-router-name="activeRouterName">
                <router-link
                    :key="item.itemRouterName"
                    :to="{ name : item.itemRouterName }"
                >
                    <template #default="{ href, navigate, isExactActive }">
                        <a
                            class="fe-menu-round__item"
                            :class="{'active': isExactActive}"
                            :href="href"
                            :data-test="item.dataTest"
                            @click="navigate"
                        >
                            {{ item.itemName }}
                        </a>
                    </template>
                </router-link>
            </slot>
        </template>
        <template v-else>
            <a
                v-for="item in menu"
                :key="item.itemName"
                class="fe-menu-round__item"
                :class="{'active':item.active}"
                @click="$emit('click', item)"
            >
                {{ item.itemName }}
            </a>
        </template>
    </PerfectScrollbar>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import StickyMenuMixin from "@mixins/StickyMenuMixin.js";

export default {
    name: "FeMenuRound",

    components: {
        PerfectScrollbar,
    },

    mixins: [
        StickyMenuMixin,
    ],

    props: {
        menu: {
            type: Array,
            required: true,
        },
        currentRefs: {
            type: Object,
            default: () => {
                return {};
            },
        },
        stickyEnable: {
            type: Boolean,
            default: true,
        },
        routerMenu: {
            type: Boolean,
            default: true,
            required: true,
        },
    },

    data() {
        return {
            activeRouterName: this.menu[0] ? this.menu[0].itemRouterName : "",
        };
    },

    methods: {
        goTo(refName) {
            this.activeRouterName = refName;

            // if "ref" was added for component - get element in "$el" field, else get default element node
            let element = "";
            if (this.currentRefs[refName]) {
                element = (this.currentRefs[refName].$el) ? this.currentRefs[refName].$el : this.currentRefs[refName];
            }
            let top = (element) ? element.offsetTop : 60;
            window.scrollTo({
                top: top - 60,
                behavior: "smooth",
            });
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.fe-menu-round {
    display: flex;
    max-width: 100%;


    &#{&}.is-sticky {
        top: 60px;
        transform: translate3d(0, 0, 0);
        z-index: 200;
    }

    &#{&}--sticky {
        position: sticky;
        top: -56px;
        transition: top .4s ease-out;
    }

    &__item {
        //@include link("link--dark", true);
        height: 100%;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: $font-weight--bold;
        text-transform: uppercase;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: all .2s ease;
        margin: 0 .25rem;
        padding: .5rem 1rem;
        border: 2px solid var(--color-text-body);
        border-radius: $container--border-radius;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
            background: var(--color-text-body);
            color: var(--color-text-alt);
        }

        &.active {
            background: var(--color-text-body);
            color: var(--color-text-alt);
            border-color: transparent;
        }

    }

    .ps__rail-x {
        height: .5rem;
    }

    .ps__thumb-x,
    .ps__rail-x.ps--clicking .ps__thumb-x,
    .ps__rail-x:focus > .ps__thumb-x,
    .ps__rail-x:hover > .ps__thumb-x {
        height: .25rem;
    }
}


</style>
