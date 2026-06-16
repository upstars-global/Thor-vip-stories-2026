<template>
    <div
        v-touch:swipe.stop
        class="fe-menu"
        :class="menuClasses"
    >
        <template v-for="(item, index) in menu">
            <slot
                v-if="!item.hide"
                :item="item"
                :go-to="goTo"
                :active-router-name="activeRouterName"
            >
                <div
                    :key="index"
                    class="fe-menu__item"
                    :class="{'active': isActive(item)}"
                    @click="goTo($event, item)"
                >
                    <FeIcon
                        v-if="!tagStyle && item.itemIcon"
                        :icon="item.itemIcon"
                        class="fe-menu__item-icon"
                    />
                    {{ item.itemName || item.name }}
                </div>
            </slot>
        </template>
    </div>
</template>

<script>
import FeIcon from "@ui-kit/FeIcon";

export default {
    name: "FeMenu",

    components: {
        FeIcon,
    },

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
        tagStyle: {
            type: Boolean,
            default: true,
        },
        clickHandler: {
            type: Function,
            default: () => {},
        },
    },

    data() {
        return {
            activeRouterName: "",
        };
    },

    computed: {
        menuClasses() {
            return {
                "fe-menu--tags": this.tagStyle,
            };
        },
    },

    methods: {
        isActive(item) {
            if (Object.keys(this.currentRefs).length > 0) {
                return this.activeRouterName === item.itemRouterName;
            } else if (item.itemRouterName) {
                return this.$route.name === item.itemRouterName;
            }
            return this.$route.path === this.getPath(item.path);
        },

        getPath(path) {
            if (typeof path === "object") {
                return this.$router.resolve(path).resolved.path;
            }
            return path[0] === "/" ? path : `/${path}`;
        },

        goTo(event, item) {
            if (Object.keys(this.currentRefs).length > 0) {
                const refName = item.itemRouterName;
                this.activeRouterName = refName;

                // if "ref" was added for component - get element in "$el" field, else get default element node
                let element = "";
                if (this.currentRefs[refName]) {
                    element = (this.currentRefs[refName].$el) ? this.currentRefs[refName].$el : this.currentRefs[refName];
                }
                let top = (element) ? element.offsetTop : 64;
                window.scrollTo({
                    top: top - 64,
                    behavior: "smooth",
                });
            } else {
                const route = item.path ? this.getPath(item.path) : { name : item.itemRouterName };
                this.$router.push(route);
            }
        },
    },
};
</script>
<style src="./style.scss" lang="scss" scoped></style>
