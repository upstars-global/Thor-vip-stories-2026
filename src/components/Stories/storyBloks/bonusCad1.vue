<template>
  <svg width="294" height="125" viewBox="0 0 294 125" fill="none">
    <rect width="293.042" height="124.726" rx="16.7453" fill="url(#paint0_linear_10743_15779)"/>
    <rect x="17.2684" y="17.2684" width="61.6987" height="23.3261" rx="11.663" stroke="url(#paint1_linear_10743_15779)"
          stroke-width="1.04658"/>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12"
          font-weight="bold" letter-spacing="0em"><tspan x="25.1177" y="33.2017">{{casino}}</tspan></text>
    <rect x="113.993" y="16.7451" width="162.304" height="24.3726" rx="12.1863" fill="#44386C" fill-opacity="0.6"/>
    <circle cx="126.552" cy="28.9314" r="4.18632" fill="#F65757"/>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12.559"
          letter-spacing="0em"><tspan x="134.924" y="33.2017">{{ expires }}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="12.559"
          font-weight="bold" letter-spacing="0em"><tspan x="184.924" y="33.2017"> {{expires_time}}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="14"
          letter-spacing="0em"><tspan x="16.7451" y="75.345">{{cashback}}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="14"
          font-weight="bold" letter-spacing="0em"><tspan x="226.258" y="74.6233">23 {{currency}}</tspan></text>
    <g clip-path="url(#clip0_10743_15779)">
      <rect x="16.7451" y="91.2358" width="259.552" height="16.7453" rx="8.37264" fill="#44386C" fill-opacity="0.6"/>
      <rect x="16.7451" y="91.2358" width="64.888" height="16.7453" rx="8.37264" fill="#FFE114"/>
      <g style="mix-blend-mode:exclusion">
        <text fill="#F7F7F7" text-anchor="end" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9.41922"
              letter-spacing="0.04em"><tspan x="140" y="102">{{wagering}} </tspan></text>
        <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9.41922"
              font-weight="bold" letter-spacing="0.04em"><tspan x="141.381" y="102.438">60 / 250 {{currency}}</tspan></text>
      </g>
    </g>
    <defs>
      <linearGradient id="paint0_linear_10743_15779" x1="0" y1="61.5738" x2="293.042" y2="61.5738"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#221C36"/>
        <stop offset="1" stop-color="#3F1C60"/>
      </linearGradient>
      <linearGradient id="paint1_linear_10743_15779" x1="16.7451" y1="28.9314" x2="79.4904" y2="28.9314"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#EB02E2"/>
        <stop offset="1" stop-color="#2797FF"/>
      </linearGradient>
      <clipPath id="clip0_10743_15779">
        <rect x="16.7451" y="91.2358" width="259.552" height="16.7453" rx="8.37264" fill="white"/>
      </clipPath>
    </defs>
  </svg>

</template>



<script setup>

const props = defineProps({
  cashback: String,
  expires: String,
  expires_time: String,
  casino: String,
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
