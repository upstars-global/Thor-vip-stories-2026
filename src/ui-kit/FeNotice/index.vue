<template>
    <transition name="fe-notice">
        <div :class="noticeClass">
            <div class="fe-notice__body">
                <div class="fe-notice__text" v-html="noticeText" />
            </div>
            <a
                v-if="showButton"
                class="fe-notice__link"
                :href="notice.button.link"
                :target="blank ? '_blank' : null"
            >
                <FeButton :theme="ButtonConfig">
                    {{ buttonName }}
                </FeButton>
            </a>
            <FeIcon
                :icon="FeIconConfig.close"
                data-test="notice-cancel"
                class="fe-notice__cancel"
                @click="deleteUserNotice(notice.id)"
            />
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions as piniaActions } from "pinia";

import config from "@theme/configs/config";

import FeButton, * as FeButtonConfig from "../FeButton";
import FeIcon from "@ui-kit/FeIcon/index.vue";
import { FeIconConfig } from "@theme/configs/icons";
import { parseContent } from "@helpers/ParserContent";
import noticeParserContent from "@helpers/noticeParserContent";

import { useUserNotice } from "@store/userNotice";

export default {
    name: "FeNotice",
    components: {
        FeButton,
        FeIcon,
    },


    props: {
        notice: {
            type: Object,
            required: true,
        },
        newStyle: {
            type: Boolean,
            default: false,
        },
        blank: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            FeButtonConfig,
            FeIconConfig,
            ButtonConfig: config.buttons.Notice.button,
        };
    },
    computed: {
        ...mapGetters("multilang", {
            userLocale: "GET_USER_LOCALE",
        }),
        showButton() {
            return this.notice.button?.link && this.notice.button?.name;
        },
        localisationVars() {
            return this.notice?.localisation?.variables || {};
        },
        noticeClass() {
            return {
                "fe-notice": true,
                "fe-notice--text-only": !this.showButton,
                "fe-notice--new": this.newStyle,
            };
        },
        noticeText() {
            return parseContent(this.noticeParserContent(this.notice, this.userLocale), this.localisationVars);
        },
        buttonName() {
            switch (this.notice.code) {
                case "USER_LEVEL_CHANGED":
                    return this.$t("NOTIFICATION_BACK.USER_LEVEL_CHANGED_BUTTON");
                case "TOURNAMENT_PHASE_STARTED":
                    return this.$t("NOTIFICATION_BACK.TOURNAMENT_PHASE_STARTED_BUTTON");
                case "TOURNAMENT_USER_PRIZE_DISTRIBUTE":
                    return this.$t("NOTIFICATION_BACK.TOURNAMENT_USER_PRIZE_DISTRIBUTE_BUTTON");
                default:
                    return this.notice.button.name;
            }
        },
    },
    methods: {
        noticeParserContent,
        ...piniaActions(useUserNotice, {
            deleteUserNotice: "deleteUserNotification",
        }),
    },
};
</script>

<style lang="scss" src="./style.scss"></style>
