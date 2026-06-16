<template>
  <div class="story-container">
    <StoriesTopBar
        :progress="progress"
        :number-of-segments="numberOfSegments"/>
    <div class="info_row">
      <img :src="story_icon" class="story_icon" alt="">
    </div>
    <div id="text_container_stories" class="text_container">
      <div class="video-player">
        <video
            ref="videoPlayer"
            id="videoPlayer"
            class="video-container"
            preload="metadata"
            muted=""
            playsinline=""
            @timeupdate="updateTime"
        >
          <source :src="videoSrc" type="video/mp4">
        </video>
      </div>

      <div id="stories-segment-0" v-if="showPlayButton" class="stories-segment" style="display: flex; z-index: 1000; background-color: black;">
        <div class="h3 max_with_bigger">
          {{ texts.press }}
        </div>
        <img :src="playButton" @click="playVideo" class="play_button" alt="">
      </div>

      <div id="stories-segment-1" class="stories-segment" :style="animationPauseStyle">

        <div class="h5">
          {{ texts.hello }}
        </div>
        <div class="h2">
          {{ name }}
        </div>

      </div>


      <div id="stories-segment-2" class="stories-segment" :style="animationPauseStyle">
        <div class="h5" style="max-width: 43vh; text-align: center">
          {{ this.texts.we_burning }}
        </div>
        <div class="h1">
          <div v-if="days && days > 1">
            {{ this.days }}
          </div>
        </div>
        <div v-if="days && days > 1" class="h4">
          {{ this.texts.days }}
        </div>
        <div v-if="days < 1 || !days" class="h4">
          {{ this.texts.many_days }}
        </div>
      </div>

      <div id="stories-segment-3" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 max_with">
          {{ this.texts.what_power }}
        </div>
      </div>
      <div id="stories-segment-4" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 max_with">
          {{ this.texts.find_out }}
        </div>
      </div>
      <div id="stories-segment-5" class="stories-segment" :style="animationPauseStyle">
        <img
            :src="vip_level_src" class="player_status"
            loading="lazy"
            alt="level"
        />
        <div class="h5">
          {{ this.texts.you_reached }}
        </div>
        <div class="h3">
          <div v-if="this.level == 'REGULAR'">
            {{ this.texts.vip_level_1 + this.texts.level }}
          </div>
          <div v-if="this.level == 'BRONZE'">
            {{ this.texts.vip_level_2 + this.texts.level  }}
          </div>
          <div v-if="this.level == 'SILVER'">
            {{ this.texts.vip_level_3 + this.texts.level }}
          </div>
          <div v-if="this.level == 'GOLD'">
            {{ this.texts.vip_level_4 + this.texts.level  }}
          </div>
          <div v-if="this.level == 'PLATINUM'">
            {{ this.texts.vip_level_5 + this.texts.level  }}
          </div>
          <div v-if="this.level == 'DIAMOND'">
            {{ this.texts.vip_level_6 + this.texts.level  }}
          </div>
        </div>
        <div class="h5">
          {{ this.texts.in_vip }}
        </div>
      </div>
      <div id="stories-segment-6" class="stories-segment" :style="animationPauseStyle">
        <div v-if="!scip_top_wining">
          <div class="h5 max_with">
            {{ this.texts.top_winnings }}
          </div>
          <div class="h1" :style="{ fontSize: topWinFontSize }">
            {{ this.top_winnings }}
          </div>
          <div class="h4">
            {{ this.currency }}
          </div>
        </div>
      </div>


      <div id="stories-segment-8" class="stories-segment" :style="animationPauseStyle">
        <div class="h5">
          {{ this.texts.you_received }}
        </div>
        <div class="h1" :style="{ fontSize: cashbackFontSize }">
          {{ this.cashback}}
        </div>
        <div class="h3">
          {{ this.currency }}
        </div>
        <div class="h5">
          {{ this.texts.of_cashback }}
        </div>
      </div>

      <div id="stories-segment-9" class="stories-segment" :style="animationPauseStyle">
        <div class="decor_clip">
          <img :src="dec_1" class="dec_1" alt="">
          <img :src="dec_2" class="dec_2" alt="">
          <img :src="dec_3" class="dec_3" alt="">
        </div>
        <div class="h5 max_with" v-if="change_thumbnail_text_position">
          {{ this.texts.slot }}
        </div>
        <div class="game_thumbnail_border" v-if="!hide_thumbnail">
          <img
              :src="this.favorite_game_thunbnail"
              class="game_thumbnail"
              loading="lazy"
              alt=""/>
        </div>
        <div class="h5 max_with" v-if="!change_thumbnail_text_position">
          {{ this.texts.slot }}
        </div>
        <div class="h3">
          {{ this.favorite_game_name}}
        </div>
      </div>
      <div id="stories-segment-10" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 max_with">
          {{ this.texts.determined }}
        </div>
      </div>
      <div id="stories-segment-11" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 max_with_small">
          {{ this.texts.ready }}
        </div>
      </div>
      <div id="stories-segment-12" class="stories-segment margin_top_bigger" :style="animationPauseStyle">
        <div class="h3">
          <div v-if="this.fire_type == 1">
            {{ this.texts.sparkling_ray }}
          </div>
          <div v-if="this.fire_type == 2">
            {{ this.texts.bright_flash }}
          </div>
          <div v-if="this.fire_type == 3">
            {{ this.texts.real_fire }}
          </div>
          <div v-if="this.fire_type == 4">
            {{ this.texts.fire_element }}
          </div>
        </div>
        <div class="h5 max_with_bigger">
          <div v-if="this.fire_type == 1">
            {{ this.texts.sparkling_ray_d }}
          </div>
          <div v-if="this.fire_type == 2">
            {{ this.texts.bright_flash_d }}
          </div>
          <div v-if="this.fire_type == 3">
            {{ this.texts.real_fire_d }}
          </div>
          <div v-if="this.fire_type == 4">
            {{ this.texts.fire_element_d }}
          </div>
        </div>
      </div>
      <div id="stories-segment-13" class="stories-segment margin_top_small" :style="animationPauseStyle">
        <div class="h3 end_text_title">
          {{ this.texts.end_text_gift }}
        </div>
        <div class="present_placeholder"></div>
        <a @click='getGift'>
          <div class="end_button get_gift">{{ this.texts.end_btn_1 }}</div>
        </a>
        <div class="end_button watch_again" @click="watchAgain()">
          <img :src="watchAgainIcon" class="watch_again_icon" loading="lazy" alt="">
          {{ this.texts.end_btn_2 }}</div>
      </div>

    </div>
    <a @click='closeStory'>
      <div class="close_button">
        <CloseButton/>
      </div>
    </a>
    <div class="pause_button" @click="togglePlayState">
      <desktopPausePlayButton
          :play-state="isPlaying"/>
    </div>
    <div id="story_controls" class="story_controls">
      <div
          @mousedown="handleEvent('backward', $event)"
          @mouseup="handleEventEnd('backward', $event)"
          @touchstart="handleEvent('backward', $event)"
          @touchend="handleEventEnd('backward', $event)">
        <mobileControlArea
            position="left"/>
      </div>
      <div
          @mousedown="handleEvent('forward', $event)"
          @mouseup="handleEventEnd('forward', $event)"
          @touchstart="handleEvent('forward', $event)"
          @touchend="handleEventEnd('forward', $event)">
        <mobileControlArea
            position="right"/>
      </div>
      <div @click="jumpToSegment('backward')">
        <desktopControlButton
            position="left"/>
      </div>
      <div @click="jumpToSegment('forward')">
        <desktopControlButton
            position="right"/>
      </div>
    </div>

  </div>
</template>

<script src="./scripts.js"></script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
@import "styles";

</style>
