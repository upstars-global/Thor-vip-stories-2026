<template>
    <div class="fe-tabs">
        <div class="fe-tabs__header">
            <template v-for="tab in tabs.list">
                <slot
                    name="tab"
                    :tab="tab"
                    :active="isActive(tab)"
                    :activate-tab-handler="() => setActiveTab(tab)"
                >
                    <FeTab
                        :name="tab.name"
                        :active="isActive(tab)"
                        :data-test="getTabTestLocators(tab)"
                        @setActiveTab="options => setActiveTab(tab, options)"
                        @setTabOptions="options => setTabOptions(tab, options)"
                    >
                        {{ keyTitle ? $t(tab.title) : tab.title }}
                    </FeTab>
                </slot>
            </template>
            <div
                v-if="showSlider"
                ref="tabsSlider"
                class="fe-tabs__slider"
                :style="tabsSliderStyles"
            />
        </div>
        <div ref="tabsContent" class="fe-tabs__content">
            <slot :name="`tab-item-${activeTab.name}`" />
        </div>
    </div>
</template>

<script>
import FeTab from "@ui-kit/FeTab/index.vue";
import { TabsType } from "@types/TabType";

export default {
    name: "FeTabs",

    components: {
        FeTab,
    },

    props: {

        /**
         * Tabs data
         * @type {TabsType}
         * */
        tabs: {
            type: TabsType,
            required: true,
        },
        keyTitle: {
            type: Boolean,
            default: true,
        },
        showSlider: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            tabsSliderStyles: {
                display: "none",
                width: 0,
                transform: "translateX(0)",
            },
        };
    },

    computed: {
        activeTab: {
            get() {
                return this.tabs.active;
            },

            set(tab) {
                this.tabs.active = tab;
            },
        },
    },

    methods: {

        setActiveTab(tab, tabOptions) {
            this.activeTab = tab;
            this.setNewPositionTab(tabOptions);

            this.$emit("setActiveTab", tab);
        },

        setNewPositionTab(tabOptions) {
            if (!this.showSlider) {
                return;
            }

            this.tabsSliderStyles = {
                width: `${ tabOptions.width }px`,
                transform: `translateX(${ tabOptions.offsetLeft }px)`,
            };
        },

        isActive(tab) {
            return tab === this.activeTab;
        },

        setTabOptions(tab, tabOptions) {
            if (this.activeTab === tab) {
                this.setNewPositionTab(tabOptions);
            }
        },

        getTabTestLocators(tab) {
            let locators = [];
            locators.push(`${ this.tabs.name }__tab-${ tab.name }`);
            if (this.isActive(tab)) {
                locators.push(`${ this.tabs.name }__tab-${ tab.name }--active`);
            }
            return locators.join(" ");
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
