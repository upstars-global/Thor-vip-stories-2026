<template>
  <svg width="315" height="125" viewBox="0 0 315 125" fill="none">
    <rect x="0.416016" width="313.974" height="124.726" rx="16.7453" fill="url(#paint0_linear_10743_15788)"/>
    <rect x="17.6844" y="17.2684" width="52.6987" height="23.3261" rx="11.663" stroke="url(#paint1_linear_10743_15788)"
          stroke-width="1.04658"/>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12"
          font-weight="bold" letter-spacing="0em"><tspan x="25.5337" y="33.2017">{{sport}}</tspan></text>
    <rect x="135.34" y="16.7451" width="162.304" height="24.3726" rx="12.1863" fill="#44386C" fill-opacity="0.6"/>
    <circle cx="147.899" cy="28.9314" r="4.18632" fill="#F65757"/>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12.559"
          letter-spacing="0em"><tspan x="156.272" y="33.2017">{{expires}}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12.559"
          font-weight="bold" letter-spacing="0em"><tspan x="206.272" y="33.2017"> {{expires_time}}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="14.6521"
          letter-spacing="0em"><tspan x="17.1611" y="75.345">{{sport_bonus}}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="14.6521"
          font-weight="bold" letter-spacing="0em"><tspan x="243.357" y="75.345">30 {{ currency }}</tspan></text>
    <g clip-path="url(#clip0_10743_15788)">
      <rect x="17.1611" y="91.2358" width="280.483" height="16.7453" rx="8.37264" fill="#44386C" fill-opacity="0.6"/>
      <rect x="17.1611" y="91.2358" width="70.1209" height="16.7453" fill="#FFE114"/>
      <path
          d="M87.2822 91.2358H149.03C153.655 91.2358 157.403 94.9844 157.403 99.6085V99.6085C157.403 104.233 153.655 107.981 149.03 107.981H87.2822V91.2358Z"
          fill="#FFE114"/>
      <g style="mix-blend-mode:exclusion">
        <text fill="#F7F7F7" text-anchor="end" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9.5"
              letter-spacing="0.04em"><tspan x="140" y="102">{{wagering}} </tspan></text>
        <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9.5"
              font-weight="bold" letter-spacing="0.04em"><tspan x="144.909" y="102.438">200 / 400 {{ currency }}</tspan></text>
      </g>
    </g>
    <defs>
      <linearGradient id="paint0_linear_10743_15788" x1="0.416016" y1="61.5738" x2="314.39" y2="61.5738"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#221C36"/>
        <stop offset="1" stop-color="#3F1C60"/>
      </linearGradient>
      <linearGradient id="paint1_linear_10743_15788" x1="17.1611" y1="30.4402" x2="70.9145" y2="29.9712"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF3858"/>
        <stop offset="1" stop-color="#D200E1"/>
      </linearGradient>
      <clipPath id="clip0_10743_15788">
        <rect x="17.1611" y="91.2358" width="280.483" height="16.7453" rx="8.37264" fill="white"/>
      </clipPath>
    </defs>
  </svg>

</template>


<script setup>

const props = defineProps({
  sport_bonus: String,
  expires: String,
  expires_time: String,
  sport: String,
  wagering: String,
  currency: {
    type: String,
  },
});

</script>


<style scoped lang="scss">

.sora_font {
  font-family: "Sora", sans-serif;
}

</style>
