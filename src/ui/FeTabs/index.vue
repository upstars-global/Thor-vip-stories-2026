<template>
    <div class="fe-tabs">
        <div class="fe-tabs__header">
            <template v-for="(tab) in tabs.list">
                <slot
                    name="tab"
                    :tab="tab"
                    :active="tabs.active === tab"
                    :activate-tab-handler="() => setActiveTab(tab)"
                >
                    <FeTab
                        :name="tab.name"
                        :active="tabs.active === tab"
                        :data-test="getTabTestLocators(tab)"
                        @setActiveTab="options => setActiveTab(tab, options)"
                        @setTabOptions="options => setTabOptions(tab, options)"
                    >
                        {{ tab.title }}
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
import FeTab from "@ui/FeTab/index.vue";
import { TabsType } from "@controllers/TabType";

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

        showSlider: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            tabsSliderStyles: {
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

            /**
             * @param {TabType} tab - new active tab
             * */
            set(tab) {
                this.tabs.active = tab;
            },
        },
    },

    methods: {

        /**
         * @param {TabType} tab - tab
         * @param {Object} tabOptions - tab options
         * */
        setActiveTab(tab, tabOptions) {
            this.activeTab = tab;
            this.setNewPositionTab(tabOptions);

            this.$emit("setActiveTab", tab);
        },

        /**
         * @param {Object} tabOptions - tab options
         * */
        setNewPositionTab(tabOptions) {
            if (!this.showSlider) {
                return;
            }

            this.tabsSliderStyles = {
                width: `${ tabOptions.width }px`,
                transform: `translateX(${ tabOptions.offsetLeft }px)`,
            };
        },

        /**
         * @param {TabType} tab - tab name
         * @param {Object} tabOptions - tab options
         * */
        setTabOptions(tab, tabOptions) {
            if (this.activeTab === tab) {
                this.setNewPositionTab(tabOptions);
            }
        },

        getTabTestLocators(tab) {
            let locators = [];
            locators.push(`${ this.tabs.name }__tab-${ tab.name }`);
            if (this.activeTab === tab) {
                locators.push(`${ this.tabs.name }__tab-${ tab.name }--active`);
            }
            return locators.join(" ");
        },
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
