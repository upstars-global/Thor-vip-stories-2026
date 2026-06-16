<template>
  <svg width="248" height="269" viewBox="0 0 248 269" fill="none">
    <g>
      <path style="transform: scaleY(0.95);" d="M6 4H242V245.294C242 253.968 234.968 261 226.294 261H21.706C13.0318 261 6 253.968 6 245.294V4Z"
            fill="#30284C"/>
      <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
            letter-spacing="0em"><tspan x="16.4707" y="24.9054">{{overralBallanse}}</tspan></text>
      <path d="M88.9414 18.1079C86.5331 18.1079 84.5786 20.0624 84.5786 22.4707C84.5786 24.8789 86.5331 26.8334 88.9414 26.8334C91.3496 26.8334 93.3042 24.8789 93.3042 22.4707C93.3042 20.0624 91.3496 18.1079 88.9414 18.1079ZM88.9414 24.6521C88.7014 24.6521 88.5051 24.4557 88.5051 24.2158V22.4707C88.5051 22.2307 88.7014 22.0344 88.9414 22.0344C89.1813 22.0344 89.3777 22.2307 89.3777 22.4707V24.2158C89.3777 24.4557 89.1813 24.6521 88.9414 24.6521ZM89.3777 20.7256C89.3777 20.9665 89.1823 21.1618 88.9414 21.1618V21.1618C88.7004 21.1618 88.5051 20.9665 88.5051 20.7256V20.7256C88.5051 20.4846 88.7004 20.2893 88.9414 20.2893V20.2893C89.1823 20.2893 89.3777 20.4846 89.3777 20.7256V20.7256Z"
            fill="#00EDA6"/>
      <text fill="#FFE114" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="13"
            font-weight="bold" letter-spacing="0em"><tspan x="129.235" y="26.9207">2 053 {{currency}}</tspan></text>
      <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
            letter-spacing="0em"><tspan x="16.4707" y="48.6114"> {{realBallanse}}</tspan></text>
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
            font-weight="bold" letter-spacing="0em"><tspan x="16.9149" y="62.0564">10.00 {{currency}}</tspan></text>
      <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
            letter-spacing="0em"><tspan x="129.235" y="48.6114">{{bonusBallanse}}</tspan></text>
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
            font-weight="bold" letter-spacing="0em"><tspan x="129.576" y="62.0564">10.36 {{currency}}</tspan></text>
      <rect x="16.4707" y="78.2432" width="215.059" height="21.4706" rx="10.7353" fill="#00EDA6"/>
      <text fill="#110E1B" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
            font-weight="bold" letter-spacing="0em"><tspan x="106.047" y="91.6485">{{cashbox}}</tspan></text>
      <line x1="16.4707" y1="109.857" x2="231.529" y2="109.857" stroke="#44386C" stroke-opacity="0.6"
            stroke-width="0.654415"/>
    </g>
  </svg>
</template>



<script setup>

const props = defineProps({
  overralBallanse: String,
  realBallanse: String,
  bonusBallanse: String,
  cashbox: String,
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
