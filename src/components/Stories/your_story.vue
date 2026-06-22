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
            preload="auto"
            muted=""
            playsinline=""
            @timeupdate="updateTime"
        >
          <source :src="videoWebm" type="video/webm">
          <source :src="videoMp4" type="video/mp4">
        </video>
      </div>

      <!-- Tap to start overlay -->
      <div id="stories-segment-0" v-if="showPlayButton" class="stories-segment" style="display: flex; z-index: 1000; background-color: black;">
        <div class="h3 max_with_bigger">{{ texts.press }}</div>
        <img :src="playButton" @click="playVideo" class="play_button" alt="">
      </div>

      <!-- 1: intro (logo lives in the video) -->
      <div id="stories-segment-1" class="stories-segment" :style="animationPauseStyle"></div>

      <!-- 2: greeting -->
      <div id="stories-segment-2" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-hi">{{ texts.hello }}</div>
        <div class="h2 scene-name">{{ name }}!</div>
      </div>

      <!-- 3: slots / days -->
      <div id="stories-segment-3" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 max_with scene-top-text">
          <span
              v-for="line in seasonRhythmLines"
              :key="line"
          >{{ line }}</span>
        </div>
        <div class="slot-cards">
          <div v-for="(d, i) in daysDigits" :key="i" class="slot-card">
            <div class="slot-window">
              <div class="slot-reel">
                <span
                    v-for="(n, j) in slotStrip"
                    :key="j"
                    class="slot-digit"
                >{{ n }}</span>
              </div>
            </div>
          </div>
          <img
              v-if="daysDigits.length === 3"
              :src="slotFrame"
              class="slot-neon-frame"
              alt=""
              aria-hidden="true">
        </div>
        <div class="h5 max_with scene-bottom-text">{{ dayOfItText }}</div>
      </div>

      <!-- 4: fall — journey -->
      <div id="stories-segment-4" class="stories-segment" :style="animationPauseStyle">
        <div class="chips chips--journey">
          <div class="chip chip--a journey-card journey-card--top">{{ texts.every_journey }}</div>
          <div class="chip chip--b journey-card journey-card--bottom">{{ texts.leaves_mark }}</div>
        </div>
      </div>

      <!-- 5: level cube -->
      <div id="stories-segment-5" class="stories-segment" :style="animationPauseStyle">
        <img v-if="cubeSrc" :src="cubeSrc" class="cube-img" loading="lazy" alt="level"/>
        <div class="scene-cube-top">{{ texts.this_season_reached }}</div>
        <div class="scene-cube-level">{{ levelName }} {{ texts.level_suffix }}</div>
        <div class="scene-cube-bottom">{{ texts.in_vip_club }}</div>
      </div>

      <!-- 6: gifts — moments cards -->
      <div id="stories-segment-6" class="stories-segment" :style="animationPauseStyle">
        <div class="gift-cards">
          <div class="gift-card gift-card--top">{{ texts.some_moments }}</div>
          <div class="gift-card gift-card--bottom">{{ texts.impossible_forget }}</div>
        </div>
      </div>

      <!-- 7: number — top winnings -->
      <div id="stories-segment-7" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-num-label">{{ texts.top_winnings_label }}</div>
        <div class="big-number">{{ topWinnings }}</div>
      </div>

      <!-- 8: fall — live tables (Figma node 31550:220760) -->
      <div id="stories-segment-8" class="stories-segment" :style="animationPauseStyle">
        <div class="fall-cards">
          <div class="fall-card fall-card--a" style="--cx:449.67;--cy:1215.17;--tilt:2.15deg">{{ texts.live_tables }}</div>
          <div class="fall-card fall-card--b" style="--cx:578.15;--cy:1347.59;--tilt:-2.66deg">{{ texts.had_their_own }}</div>
          <div class="fall-card fall-card--a" style="--cx:713.18;--cy:1481.34;--tilt:2.15deg">{{ texts.chemistry }}</div>
        </div>
      </div>

      <!-- 9: number — live wins (Figma node 31550:220858) -->
      <div id="stories-segment-9" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-num-label">{{ texts.live_wins_label }}</div>
        <div class="big-number">{{ liveWins }}</div>
      </div>

      <!-- 10: netball — trusted (Figma node 31550:220779) -->
      <div id="stories-segment-10" class="stories-segment" :style="animationPauseStyle">
        <div class="fall-cards">
          <div class="fall-card fall-card--a" style="--cx:539.62;--cy:1296.87;--tilt:2.15deg">{{ texts.you_trusted }}</div>
          <div class="fall-card fall-card--b" style="--cx:647.77;--cy:1466.97;--tilt:-2.66deg">{{ texts.paid_off }}</div>
        </div>
      </div>

      <!-- 11: number — betting wins (Figma node 31550:220871) -->
      <div id="stories-segment-11" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-num-label">{{ texts.betting_wins_label }}</div>
        <div class="big-number">{{ bettingWins }}</div>
      </div>

      <!-- 12: fall — experiments (Figma node 31550:220897) -->
      <div id="stories-segment-12" class="stories-segment" :style="animationPauseStyle">
        <div class="fall-cards">
          <div class="fall-card fall-card--a" style="--cx:539.71;--cy:1318.74;--tilt:2.15deg">{{ texts.even_experiments }}</div>
          <div class="fall-card fall-card--b" style="--cx:539.66;--cy:1456.78;--tilt:-2.66deg">{{ texts.second_spark }}</div>
        </div>
      </div>

      <!-- 13: number — cashback (Figma node 31550:220884) -->
      <div id="stories-segment-13" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-num-label">{{ texts.cashback_label }}</div>
        <div class="big-number">{{ cashbackValue }}</div>
      </div>

      <!-- 14: fall — what game (Figma node 31550:220994) -->
      <div id="stories-segment-14" class="stories-segment" :style="animationPauseStyle">
        <div class="fall-cards">
          <div class="fall-card fall-card--a" style="--cx:540.12;--cy:823.44;--tilt:2.15deg">{{ texts.what_game }}</div>
          <div class="fall-card fall-card--b" style="--cx:466.32;--cy:966.48;--tilt:-2.66deg">{{ texts.that_kept_you }}</div>
          <div class="fall-card fall-card--a" style="--cx:590.93;--cy:1114.71;--tilt:0deg">{{ texts.coming_back }}</div>
        </div>
      </div>

      <!-- 15: game of the season (Figma node 31550:220973) -->
      <div id="stories-segment-15" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-game-label">{{ texts.game_of_season }}</div>
        <div class="h2 scene-game-name">{{ favorite_game_name }}</div>
        <div class="game-frame" v-if="favorite_game_thunbnail">
          <img :src="favorite_game_thunbnail" class="game-thumb" loading="lazy" alt=""/>
        </div>
        <img
            v-if="favorite_game_thunbnail"
            :src="gameFireFrame"
            class="game-fire-frame"
            alt=""
            aria-hidden="true"/>
      </div>

      <!-- 16: lock — more rewards (Figma node 31550:220909; lock lives in the video) -->
      <div id="stories-segment-16" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-lock-text">{{ texts.more_rewards }}</div>
      </div>

      <!-- 17: number — gifts collection (Figma node 31550:220920) -->
      <div id="stories-segment-17" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-num-label scene-num-label--gifts">{{ texts.gifts_collection }}</div>
        <div class="big-number big-number--gifts">{{ giftsCount }}</div>
      </div>

      <!-- 18: flame out (Figma node 31550:220935) -->
      <div id="stories-segment-18" class="stories-segment" :style="animationPauseStyle">
        <div class="h2 scene-flame-title">{{ texts.season_ends }}</div>
        <div class="h5 scene-flame-sub">{{ texts.vip_momentum }}</div>
      </div>

      <!-- 19: final (Figma node 31550:220942) -->
      <div id="stories-segment-19" class="stories-segment" :style="animationPauseStyle">
        <div class="h5 scene-final-top">{{ texts.see_you_next }}</div>
        <div class="h2 scene-final-name">{{ name }}!</div>
        <a v-if="showGiftBtn" @click="getGift">
          <div class="end_button cta-primary">{{ texts.end_btn_gift }}</div>
        </a>
        <div class="end_button cta-replay" @click="watchAgain()">
          <img :src="watchAgainIcon" class="watch_again_icon" loading="lazy" alt="">
          {{ texts.end_btn_replay }}
        </div>
      </div>

    </div>

    <a @click="closeStory">
      <div class="close_button">
        <CloseButton/>
      </div>
    </a>
    <div class="pause_button" @click="togglePlayState">
      <desktopPausePlayButton :play-state="isPlaying"/>
    </div>
    <div id="story_controls" class="story_controls">
      <div
          @mousedown="handleEvent('backward', $event)"
          @mouseup="handleEventEnd('backward', $event)"
          @touchstart="handleEvent('backward', $event)"
          @touchend="handleEventEnd('backward', $event)">
        <mobileControlArea position="left"/>
      </div>
      <div
          @mousedown="handleEvent('forward', $event)"
          @mouseup="handleEventEnd('forward', $event)"
          @touchstart="handleEvent('forward', $event)"
          @touchend="handleEventEnd('forward', $event)">
        <mobileControlArea position="right"/>
      </div>
      <div @click="jumpToSegment('backward')">
        <desktopControlButton position="left"/>
      </div>
      <div @click="jumpToSegment('forward')">
        <desktopControlButton position="right"/>
      </div>
    </div>

  </div>
</template>

<script src="./scripts.js"></script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
@import "styles/styles";
</style>
