<template>
  <svg width="348" height="26" viewBox="0 0 348 26" fill="none">
    <g opacity="0.8">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="17"
            font-weight="bold" letter-spacing="0em"><tspan x="0.580872" y="18.553"> {{activeBonuses}}</tspan></text>
      <rect x="289.403" width="35.7453" height="25.3726" rx="12.6863" fill="#4DF2C1"/>
      <text fill="#110E1B" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9.5"
            font-weight="bold" letter-spacing="0.02em"><tspan id="order_1_1" x="298.013" y="15.8891">1 / 2</tspan></text>
    </g>
  </svg>
</template>



<script setup>

const props = defineProps({
  activeBonuses: String,

});

</script>


<style scoped lang="scss">

.sora_font {
  font-family: "Sora", sans-serif;
}

</style>
