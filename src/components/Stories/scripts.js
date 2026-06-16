

import { ref, computed, onMounted } from "vue";
import StoriesTopBar from "@components/Stories/UI/storiesTopBar.vue";
import mobileControlArea from "@components/Stories/UI/mobileControlArea.vue";
import desktopControlButton from "@components/Stories/UI/desktopControlButton.vue";
import desktopPausePlayButton from "@components/Stories/UI/desktopPausePlayButton.vue";
import CloseButton from "@components/Stories/UI/closeButton.vue";
import gsap from "gsap";
import availableLanguages from "/src/components/Stories/localization/available-languages.json";
import en from '@components/Stories/localization/en.json';
import it from '@components/Stories/localization/it.json';
import de from '@components/Stories/localization/de.json';
import fr from '@components/Stories/localization/fr.json';
import story_icon from "@components/Stories/img/avatar.webp";
import icon_replay from "@components/Stories/img/icons/icon_replay.svg";
import clip1 from '@components/Stories/img/video/1.mp4';
import clip2 from '@components/Stories/img/video/2.mp4';
import clip3 from '@components/Stories/img/video/3.mp4';
import clip4 from '@components/Stories/img/video/4.mp4';
import regular from '@components/Stories/img/statuses/regular_512.webp';
import bronze from '@components/Stories/img/statuses/bronze_512.webp';
import silver from '@components/Stories/img/statuses/silver_512.webp';
import gold from '@components/Stories/img/statuses/gold_512.webp';
import platinum from '@components/Stories/img/statuses/platinum_512.webp';
import diamond from '@components/Stories/img/statuses/diamond_512.webp';
import dec_1 from '@components/Stories/img/dec_1.webp';
import dec_2 from '@components/Stories/img/dec_2.webp';
import dec_3 from '@components/Stories/img/dec_3.webp';
import top_logo from '@components/Stories/img/top_logo.webp';
import watchAgainIcon from "@components/Stories/img/icons/icon_replay.svg";
import playButton from "@components/Stories/img/icons/play_button.svg";





export default {
    name: "Bonuses",
    components: {
        StoriesTopBar,
        mobileControlArea,
        desktopControlButton,
        desktopPausePlayButton,
        CloseButton,
    },
    setup() {
        const defaultDuration = 0.3;
        const tl = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                currentTime.value = tl.time();
            }
        });
        const reach_end = ref(false);
        const segment1_time = ref(0);
        const segment2_time = ref(0);
        const segment3_time = ref(0);
        const segment4_time = ref(0);
        const segment5_time = ref(0);
        const segment6_time = ref(0);
        const segment7_time = ref(0);
        const segment8_time = ref(0);
        const segment9_time = ref(0);
        const segment1_duration = ref(0);
        const segment2_duration = ref(0);
        const segment3_duration = ref(0);
        const segment4_duration = ref(0);
        const segment5_duration = ref(0);
        const segment6_duration = ref(0);
        const segment7_duration = ref(0);
        const segment8_duration = ref(0);
        const segment9_duration = ref(0);
        const videoSrc = ref('');
        const days = ref(false);
        const level = ref('');
        const top_winnings = ref(0);
        const freespins = ref(0);
        const cashback = ref(0);
        const favorite_game_thunbnail = ref('');
        const favorite_game_name = ref('');
        const fire_type = ref(1);
        const end_link = ref('');
        const vip_level_src = ref('');
        const scip_vip_level = ref(true);
        const scip_top_wining = ref(true);
        const scip_cashback = ref(true);
        const scip_thumbnail = ref(true);
        const hide_thumbnail = ref(true);
        const change_thumbnail_text_position = ref(false);
        const videoPlayer = ref(null);
        const isRewinding = ref(false);
        const segment1StartTime = 0; // Начало сегмента 1
        const segment2StartTime = 7.4; // Начало сегмента 2
        const segment3StartTime = 12.7; // Начало сегмента 3
        const segment4StartTime = 20.7; // Начало сегмента 4 (scip_vip_level)
        const segment5StartTime = 25.8; // Начало сегмента 5 (scip_top_wining)
        const segment6StartTime = 30.9; // Начало сегмента 6 (scip_cashback)
        const segment7StartTime = 36; // Начало сегмента 7 (scip_thumbnail)
        const segment8StartTime = 41.1; // Начало сегмента 8
        const segment9StartTime = 64; // Начало сегмента 9
        const isVideoPlaying = ref(false);
        const showPlayButton = ref(false);
        const checkVideoPlayback = () => {
            if (videoPlayer.value.paused) {
            isVideoPlaying.value = false;
            showPlayButton.value = true;
            tl.pause();
            } else {
            isVideoPlaying.value = true;
            showPlayButton.value = false;
            }
        };
        
        const playVideo = () => {
            videoPlayer.value.play();
            tl.play();
            showPlayButton.value = false;
        };

        
       
        const segment1 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment1_time.value = segment1.time();
            }
        });
        const segment2 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment2_time.value = segment2.time();
            }
        });
        const segment3 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment3_time.value = segment3.time();
            }
        });
        const segment4 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment4_time.value = segment4.time();
            }
        });
        const segment5 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment5_time.value = segment5.time();
            }
        });
        const segment6 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment6_time.value = segment6.time();
            }
        });
        const segment7 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment7_time.value = segment7.time();
            }
        });
        const segment8 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment8_time.value = segment8.time();
            }
        });
        const segment9 = gsap.timeline({
            defaults: { duration: defaultDuration, ease: "power1.inOut" },
            onUpdate: () => {
                segment9_time.value = segment9.time();
            }
        });
        const texts = ref('en');
        const currency = ref('EUR');
        const name = ref('');
        const player_name = ref('');
        const players = ref(1150);
        const prizes = ref(965);
        const top_prize = ref(5000);
        const pressTimer = ref(null);
        const pressDuration = 250;
        const longPress = ref(false);
        const currentTime = ref(0);
        const duration = ref(0);
        const shouldSeek = ref(0);
        const isPlaying = ref(true);
        const isPaused = ref(false);
        const thumbs_part = ref(0);
        const numberOfSegments = ref(6);
        const isPlayingHasBeenSet = ref(false);
        const animationPauseStyle = computed(() => ({
            "animation-play-state": isPaused.value ? "paused" : "running",
        }));
        const languageMap = {
            en,
            it,
            de,
            fr
        };

        const updateTime = () => {
            currentTime.value = tl.time;
            duration.value = tl.duration;
        };
        const progress = computed(() => {
            let result = 0;
            let totalSegments = 0;

            let segment1Progress = 0;
            if (segment1_duration.value > 0) {
                segment1Progress = segment1_time.value / segment1_duration.value;
                totalSegments++;
            }

            let segment2Progress = 0;
            if (segment2_duration.value > 0) {
                segment2Progress = segment2_time.value / segment2_duration.value;
                totalSegments++;
            }

            let segment3Progress = 0;
            if (segment3_duration.value > 0) {
                segment3Progress = segment3_time.value / segment3_duration.value;
                totalSegments++;
            }

            let segment4Progress = 0;
            if (segment4_duration.value > 0) {
                segment4Progress = segment4_time.value / segment4_duration.value;
                totalSegments++;
            }

            let segment5Progress = 0;
            if (segment5_duration.value > 0) {
                segment5Progress = segment5_time.value / segment5_duration.value;
                totalSegments++;
            }

            let segment6Progress = 0;
            if (segment6_duration.value > 0) {
                segment6Progress = segment6_time.value / segment6_duration.value;
                totalSegments++;
            }

            let segment7Progress = 0;
            if (segment7_duration.value > 0) {
                segment7Progress = segment7_time.value / segment7_duration.value;
                totalSegments++;
            }

            let segment8Progress = 0;
            if (segment8_duration.value > 0) {
                segment8Progress = segment8_time.value / segment8_duration.value;
                totalSegments++;
            }


            let segment9Progress = 0;
            if (segment9_duration.value > 0) {
                segment9Progress = segment9_time.value / segment9_duration.value;
                totalSegments++;
            }

            if (totalSegments > 0) {
                const computedValue = (segment1Progress + segment2Progress +
                    segment3Progress + segment4Progress + segment5Progress + segment6Progress +
                    segment7Progress + segment8Progress + segment9Progress)
                    / totalSegments * 100;
                numberOfSegments.value = totalSegments;
                if (!isNaN(computedValue)) {
                    result = computedValue;
                }
            }

            if (segment9_time.value > 0 && !reach_end.value) {
                window.parent.postMessage("reach_end", "*");
                reach_end.value = true;
            }

            return result;
        });

        const topWinFontSize = computed(() => {
            if (top_winnings.value && top_winnings.value.toString().length) {
                const length = top_winnings.value.toString().length;
                if (length < 6) return '15vh';
                if (length < 8) return '10vh';
                if (length < 14) return '7vh';
                if (length < 20) return '4vh';
            }
            return '6vh';
        });

        const cashbackFontSize = computed(() => {
            if (cashback.value && cashback.value.toString().length) {
                const length = cashback.value.toString().length;
                if (length < 6) return '15vh';
                if (length < 8) return '10vh';
                if (length < 14) return '7vh';
                if (length < 20) return '4vh';
            }
            return '6vh';
        });

        const spinsFontSize = computed(() => {
            if (freespins.value && freespins.value.toString().length) {
                const length = freespins.value.toString().length;
                if (length < 6) return '15vh';
                if (length < 8) return '10vh';
                if (length < 14) return '7vh';
                if (length < 20) return '4vh';
            }
            return '6vh';
        });

        const getGift = () => {
            window.parent.postMessage("bonuses_btn", "*");
            setTimeout(() => {
                window.parent.location.href = end_link.value;
            }, 300);
        };




        const segmentStartTimes = computed(() => {
            const startTimes = [0]; // Первый сегмент всегда начинается с 0
            let cumulativeDuration = 0;
          
            // Добавляем начальное время каждого сегмента, только если его длительность больше 0
            if (segment1_duration.value > 0) {
              cumulativeDuration += segment1_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment2_duration.value > 0) {
              cumulativeDuration += segment2_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment3_duration.value > 0) {
              cumulativeDuration += segment3_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment4_duration.value > 0) {
              cumulativeDuration += segment4_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment5_duration.value > 0) {
              cumulativeDuration += segment5_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment6_duration.value > 0) {
              cumulativeDuration += segment6_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment7_duration.value > 0) {
              cumulativeDuration += segment7_duration.value;
              startTimes.push(cumulativeDuration);
            }
            if (segment8_duration.value > 0) {
              cumulativeDuration += segment8_duration.value;
              startTimes.push(cumulativeDuration);
            }
          
            return startTimes;
          });

        const jumpToSegment = (direction) => {
             // Calculate the current segment based on the start times
             let currentSegment = segmentStartTimes.value.findIndex((startTime, i) => {
                return currentTime.value >= startTime && currentTime.value < segmentStartTimes.value[i + 1];
            });

            if (direction === "backward") {
                // If it's the first segment, do not jump to the last one
                if (currentSegment === -1) {
                    let newTime = segmentStartTimes.value[numberOfSegments.value - 2];
                    tl.time(newTime);

                } else {
                    let newTime = segmentStartTimes.value[currentSegment - 1];
                    if (newTime < 0) {
                        newTime = 0;
                    }
                    tl.time(newTime);

                }
                window.parent.postMessage("click_backward", "*");
            } else if (direction === "forward") {
                // If it's the last segment or beyond, do not jump to the first one
                if (currentSegment === -1) {
                    return;
                }
                let newTime = segmentStartTimes.value[currentSegment + 1];
                tl.time(newTime);
                window.parent.postMessage("click_forward", "*");
            }
        };



        const closeStory = () => {
            window.parent.postMessage("close", "*");
            setTimeout(() => {
                window.parent.location.href = end_link.value;
            }, 150);
        };
        
        
        
        const watchAgain = () => {
        
            setTimeout(() => {
                window.location.reload();
            }, 150);
        };
        

        const playerPause = () => {
            setTimeout(() => {
                if (longPress.value) {
                isPlaying.value = false;
                isPaused.value = true;
                tl.pause();
                videoPlayer.value.pause();
                window.parent.postMessage("click_pause", "*");
        }
            }, pressDuration + 10);
            
        };
        const playerPlay = () => {
            isPlaying.value = true;
            isPaused.value = false;
            tl.play();
            videoPlayer.value.play();
            if (longPress.value) {
                if (currentTime.value > 0.4) {
                    window.parent.postMessage("click_start", "*");
                
                }
            }
        };

        const togglePlayState = () => {
            if (isPlaying.value) {
                isPlaying.value = false;
                isPaused.value = true;
                tl.pause();
                videoPlayer.value.pause();
                window.parent.postMessage("click_pause", "*");
            
            } else {
                isPlaying.value = true;
                isPaused.value = false;
                tl.play();
                videoPlayer.value.play();
                window.parent.postMessage("click_start", "*");
            
            }
        };

        const press = () => {
            playerPause();
            pressTimer.value = setTimeout(() => {
                longPress.value = true;
            }, pressDuration);
        };

        const release = (direction) => {
            clearTimeout(pressTimer.value);

            if (longPress.value) {
                playerPlay();
            } else {
                playerPlay();
                jumpToSegment(direction);
            }
            longPress.value = false;
        };

        const handleEvent = (direction, event) => {
            if (event.type === "touchstart") {
                event.preventDefault();
                press(direction);
            } else if (event.type === "mousedown") {
                press(direction);
            }
        };


        const handleEventEnd = (direction, event) => {
            if (event.type === "touchend") {
                event.preventDefault();
                release(direction);
            } else if (event.type === "mouseup") {
                release(direction);
            }
        };

        const checkVideoProgress = () => {
            if (videoPlayer.value && !isRewinding.value) {
              const currentTime = videoPlayer.value.currentTime;
              const duration = videoPlayer.value.duration;
          
              if (duration - currentTime < 0.2) {
                isRewinding.value = true;
                videoPlayer.value.currentTime = Math.max(0, duration - 3);
                videoPlayer.value.play();
                setTimeout(() => {
                  isRewinding.value = false;
                }, 100);
              }
            }
          };

        onMounted(async () => {
            window.addEventListener("resize", () => {
                let vh = Math.round(window.innerHeight / 100);
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            });


            const fullURL = window.location.href;
            const queryStartIndex = fullURL.indexOf('?');
            videoPlayer.value.addEventListener('timeupdate', checkVideoProgress);

            if (queryStartIndex !== -1) {
                const queryPart = fullURL.slice(queryStartIndex + 1);
                const params = queryPart.split('&').reduce((acc, pair) => {
                    const [key, value] = pair.split('=');
                    acc[key] = decodeURIComponent(value);
                    return acc;
                }, {});


                if (params.language) {
                    texts.value = params.language;
                }

                if (params.user_language) {
                    texts.value = params.user_language;
                }

                if (params.currency) {
                    currency.value = params.currency;
                }
                if (params.user_currency) {
                    currency.value = params.user_currency;
                }

                if (params.name) {
                    name.value = params.name;
                }
                if (params.days) {
                    days.value = params.days;
                }
                if (params.level) {
                    level.value = params.level;
                }
                if (params.cashback) {
                    cashback.value = params.cashback;
                }
                if (params.top_winnings) {
                    let winnings = decodeURIComponent(params.top_winnings || '');
                    winnings = winnings.replace(',', '.').replace(/\s/g, '');
                    top_winnings.value = Number(Math.round(+winnings));
                    if (isNaN(top_winnings.value)) {
                        top_winnings.value = "";
                    }
                }
                scip_top_wining.value = top_winnings.value <= 50;
                if (params.freespins) {
                    freespins.value = Math.round(+(params.freespins || '').replace(',', '.'));
                }
                
                scip_cashback.value = cashback.value < 1;

                if (params.favorite_game_thunbnail) {
                    favorite_game_thunbnail.value = params.favorite_game_thunbnail;
                }
                if (params.favorite_game_name) {
                    favorite_game_name.value = params.favorite_game_name.replace(/\+/g, ' ');
                }
                if (favorite_game_thunbnail.value || favorite_game_name.value) {
                    scip_thumbnail.value = false;
                }
                hide_thumbnail.value = params.favorite_game_thunbnail === ''
                    || params.favorite_game_thunbnail == null
                    || false;
                change_thumbnail_text_position.value = params.favorite_game_thunbnail !== '' && !favorite_game_name.value
                    || params.favorite_game_thunbnail !== null && !favorite_game_name.value
                    || !favorite_game_name.value;

                if (params.final_link) {
                    end_link.value = params.final_link;
                }



                if (params.level === 'REGULAR') {
                    vip_level_src.value = regular;
                    scip_vip_level.value = true
                    fire_type.value = 1;
                } else if (params.level === 'BRONZE') {
                    vip_level_src.value = bronze;
                    scip_vip_level.value = false;
                    fire_type.value = 1;
                } else if (params.level === 'SILVER') {
                    vip_level_src.value = silver;
                    scip_vip_level.value = false;
                    fire_type.value = 1;
                } else if (params.level === 'GOLD') {
                    vip_level_src.value = gold;
                    scip_vip_level.value = false;
                    fire_type.value = 2;
                } else if (params.level === 'PLATINUM') {
                    vip_level_src.value = platinum;
                    scip_vip_level.value = false;
                    fire_type.value = 3;
                } else if (params.level === 'DIAMOND') {
                    vip_level_src.value = diamond;
                    scip_vip_level.value = false;
                    fire_type.value = 4;
                } else {
                    scip_vip_level.value = true;
                }
                if (params.fire_type !== '' && params.fire_type !== null && params.fire_type !== undefined) {
                    fire_type.value = params.fire_type;
                }
            } else {

                const defaultLanguage = navigator.language.split('-')[0];
                if (availableLanguages.languages.includes(defaultLanguage)) {
                    texts.value = defaultLanguage;
                }

            }

            const locale = texts.value;

            if (availableLanguages.languages.includes(locale)) {
                texts.value = languageMap[locale];
            } else {
                texts.value = en;
            }

            if (top_winnings.value > 500 && fire_type.value < 2 || top_winnings.value > 500 && fire_type.value === undefined) {
                fire_type.value = 2
            }
            if (top_winnings.value > 1000 && fire_type.value < 3 || top_winnings.value > 1000 && fire_type.value === undefined) {
                fire_type.value = 3
            }
            if (top_winnings.value > 10000 && fire_type.value < 4 || top_winnings.value > 10000 && fire_type.value === undefined) {
                fire_type.value = 4
            }



            if (fire_type.value === undefined) {
                fire_type.value = 1;
            }




            const videoMap = {
                '1': clip1,
                '2': clip2,
                '3': clip3,
                '4': clip4
            };


            videoSrc.value = videoMap[fire_type.value] || clip1;

            console.log("scip_vip_level.value " + scip_vip_level.value);

            console.log("scip_top_wining.value " + scip_top_wining.value);

            console.log("scip_cashback.value " + scip_cashback.value);

            console.log("scip_thumbnail.value " + scip_thumbnail.value);


            


           

            // SEGMENT 1 HELLO
            segment1.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment1StartTime) > 0.1) {
                  videoPlayer.value.currentTime = segment1StartTime;
                }
                videoPlayer.value.play().then(() => {
                  setTimeout(checkVideoPlayback, 200);
                }).catch(() => {
                  showPlayButton.value = true;
                  tl.pause();
                });
              });
            segment1.set("#stories-segment-1", { display: "flex" }); // Показать сегмент
            segment1.from("#stories-segment-1", { rotationY: -90, duration: 0.5, delay: 4.3, ease: "power1.inOut" });
            segment1.to("#stories-segment-1", { duration: 2.6, className: "stories-segment scale_down_animation" });
            segment1.set("#stories-segment-1", { display: "none" }); // Скрыть сегмент после анимации

            segment1_duration.value = segment1.duration();

            // SEGMENT 2 DAYS
            segment2.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment2StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment2StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment2.set("#stories-segment-2", { display: "flex" }); // Показать сегмент
            segment2.to("#stories-segment-1", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment2.from("#stories-segment-2", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment2.to("#stories-segment-2", { duration: 4.7, className: "stories-segment scale_down_animation" });
            segment2.set("#stories-segment-2", { display: "none" }); // Скрыть сегмент после анимации

            segment2_duration.value = segment2.duration();

            // SEGMENT 3 WHAT
            segment3.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment3StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment3StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment3.set("#stories-segment-3", { display: "flex" }); // Показать сегмент 3
            segment3.set("#stories-segment-4", { display: "flex" }); // Подготовить сегмент 4
            segment3.to("#stories-segment-2", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment3.from("#stories-segment-3", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment3.to("#stories-segment-3", { duration: 3.5, className: "stories-segment scale_down_animation" });
            segment3.to("#stories-segment-3", { rotationY: -90, className: "stories-segment", duration: 0.2, ease: "power1.inOut" });
            segment3.from("#stories-segment-4", { rotationY: 90, duration: 0.2, ease: "power1.out" });
            segment3.to("#stories-segment-4", { duration: 3.5, className: "stories-segment scale_down_animation" });
            segment3.set(["#stories-segment-3", "#stories-segment-4"], { display: "none" }); // Скрыть сегменты после анимации

            segment3_duration.value = segment3.duration();

            // SEGMENT 4 LEVEL
            if (!scip_vip_level.value) {
            segment4.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment4StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment4StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment4.set("#stories-segment-5", { display: "flex" }); // Показать сегмент 5
            segment4.to("#stories-segment-4", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment4.from("#stories-segment-5", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment4.to("#stories-segment-5", { duration: 4.5, className: "stories-segment scale_down_animation" });
            segment4.set("#stories-segment-5", { display: "none" }); // Скрыть сегмент после анимации
            }

            segment4_duration.value = segment4.duration();

            // SEGMENT 5 WININGS
            if (!scip_top_wining.value) {
            segment5.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment5StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment5StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment5.set("#stories-segment-6", { display: "flex" }); // Показать сегмент 6
            segment5.to("#stories-segment-5", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment5.from("#stories-segment-6", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment5.to("#stories-segment-6", { duration: 4.5, className: "stories-segment scale_down_animation" });
            segment5.set("#stories-segment-6", { display: "none" }); // Скрыть сегмент после анимации
            }

            segment5_duration.value = segment5.duration();

            // SEGMENT 6 CASHBACK
            if (!scip_cashback.value) {
            segment6.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment6StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment6StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment6.set("#stories-segment-8", { display: "flex" }); // Показать сегмент 8
            segment6.to("#stories-segment-6", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment6.from("#stories-segment-8", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment6.to("#stories-segment-8", { duration: 4.5, className: "stories-segment scale_down_animation" });
            segment6.set("#stories-segment-8", { display: "none" }); // Скрыть сегмент после анимации
            }

            segment6_duration.value = segment6.duration();

            // SEGMENT 7 GAME
            if (!scip_thumbnail.value) {
            segment7.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - 36) > 0.2) {
                    videoPlayer.value.currentTime = 36;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment7.set("#story_controls", { className: "story_controls" });
            segment7.set("#stories-segment-9", { display: "flex" }); // Показать сегмент 9
            segment7.to("#stories-segment-8", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment7.from("#stories-segment-9", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment7.to("#stories-segment-9", { duration: 4.5, className: "stories-segment scale_down_animation" });
            segment7.set("#stories-segment-9", { display: "none" }); // Скрыть сегмент после анимации
            }

            segment7_duration.value = segment7.duration();

            // SEGMENT 8 FIRE TYPE
            segment8.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment8StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment8StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment8.set("#story_controls", { className: "story_controls" });
            segment8.set("#stories-segment-10", { display: "flex" }); // Показать сегмент 10
            segment8.set("#stories-segment-11", { display: "flex" }); // Подготовить сегмент 11
            segment8.set("#stories-segment-12", { display: "flex" }); // Подготовить сегмент 12
            segment8.to("#stories-segment-9", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment8.from("#stories-segment-10", { scale: 3, opacity: 0, duration: 0.5, delay: -0.4, ease: "power1.out" });
            segment8.to("#stories-segment-10", { duration: 3.5, className: "stories-segment scale_down_animation" });
            segment8.to("#stories-segment-10", { rotationY: -90, className: "stories-segment", duration: 0.2, ease: "power1.inOut" });
            segment8.from("#stories-segment-11", { rotationY: 90, duration: 0.2, ease: "power1.out" });
            segment8.to("#stories-segment-11", { duration: 3.3, className: "stories-segment scale_down_animation" });
            segment8.to("#stories-segment-11", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                className: "stories-segment"
            });
            segment8.from("#stories-segment-12", { scale: 0, opacity: 0, duration: 0.5, delay: 7.5, ease: "power1.out" });
            segment8.to("#stories-segment-12", { delay: 6.3 });
            segment8.set(["#stories-segment-10", "#stories-segment-11", "#stories-segment-12"], { display: "none" }); // Скрыть сегменты после анимации

            segment8_duration.value = segment8.duration();

            // SEGMENT 9 GIFT
            segment9.add(() => {
                if (Math.abs(videoPlayer.value.currentTime - segment9StartTime) > 0.2) {
                    videoPlayer.value.currentTime = segment9StartTime;
                }
                if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            }
            });
            segment9.set("#story_controls", { className: "story_controls height_not_full" });
            segment9.set("#stories-segment-13", { display: "flex" }); // Показать сегмент 13
        
            segment9.to("#stories-segment-12", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });
            segment9.from("#stories-segment-13", { scale: 3, opacity: 0, duration: 0.7, delay: -0.4, ease: "power1.out" });

            segment9_duration.value = segment9.duration();

            tl.add(segment1);
            tl.add(segment2);
            tl.add(segment3);
            tl.add(segment4);
            tl.add(segment5);
            tl.add(segment6);
            tl.add(segment7);
            tl.add(segment8);
            tl.add(segment9);

            duration.value = tl.duration();

        });

        return {
            isPlayingHasBeenSet,
            progress,
            updateTime,
            shouldSeek,
            playerPause,
            playerPlay,
            isPlaying,
            press,
            release,
            numberOfSegments,
            handleEvent,
            handleEventEnd,
            jumpToSegment,
            togglePlayState,
            animationPauseStyle,
            texts,
            currency,
            name,
            closeStory,
            watchAgain,
            thumbs_part,
            story_icon,
            icon_replay,
            players,
            prizes,
            top_prize,
            player_name,
            clip1,
            clip2,
            clip3,
            clip4,
            dec_1,
            dec_2,
            dec_3,
            top_logo,
            videoSrc,
            days,
            top_winnings,
            videoPlayer,
            watchAgainIcon,
            level,
            cashback,
            favorite_game_thunbnail,
            favorite_game_name,
            fire_type,
            end_link,
            vip_level_src,
            scip_vip_level,
            hide_thumbnail,
            change_thumbnail_text_position,
            topWinFontSize,
            cashbackFontSize,
            spinsFontSize,
            getGift,
            scip_top_wining,
            isVideoPlaying,
            showPlayButton,
            playVideo,
            playButton,
        };
    },
    methods: {

        reloadPage() {
            setTimeout(() => {
                window.location.reload();
            }, 150);
        }
    }

};
