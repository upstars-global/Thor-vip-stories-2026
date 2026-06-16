<template>
  <svg width="216" height="223" viewBox="0 0 216 223" fill="none">
    <rect width="215.1" height="222.4" rx="10" fill="#221C36"/>
    <text fill="#F7F7F7" text-anchor="middle" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="50%" y="21.6">{{ myBalanceText }}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
          letter-spacing="0em"><tspan x="10.5" y="48.2">{{ overallBalanceText }}</tspan></text>
    <path d="M88.0 41.1C85.6 41.1 83.6 43.1 83.6 45.5C83.6 47.9 85.6 49.9 88.0 49.9C90.4 49.9 92.4 47.9 92.4 45.5C92.4 43.1 90.4 41.1 88.0 41.1ZM88.0 47.7C87.8 47.7 87.6 47.5 87.6 47.2V45.5C87.6 45.2 87.8 45.1 88.0 45.1C88.2 45.1 88.4 45.2 88.4 45.5V47.2C88.4 47.5 88.2 47.7 88.0 47.7ZM88.4 43.7C88.4 44.0 88.2 44.2 88.0 44.2V44.2C87.8 44.2 87.6 44.0 87.6 43.7V43.7C87.6 43.5 87.8 43.3 88.0 43.3V43.3C88.2 43.3 88.4 43.5 88.4 43.7V43.7Z"
          fill="#00EDA6"/>
    <text fill="#FFE114" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="13"
          font-weight="bold" letter-spacing="0em"><tspan x="136.6" y="50.0">{{ balanceCurrency }}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
          letter-spacing="0em"><tspan x="10.5" y="72.2">{{ realBalanceText }}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="10.5" y="85.6">{{ realBalanceCurrency }}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8"
          letter-spacing="0em"><tspan x="107.6" y="72.2">{{ bonusBalanceText }}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="107.6" y="85.6">{{ bonusBalanceCurrency }}</tspan></text>
    <line x1="10.5" y1="100.7" x2="204.6" y2="100.7" stroke="#44386C" stroke-opacity="0.6"
          stroke-width="0.7"/>
    <text fill="#F7F7F7" text-anchor="middle" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="50%" y="122.6">{{ activeBonusesText }}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          letter-spacing="0em"><tspan x="10.5" y="149.1">{{ cashbackText }}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="171.8" y="149.1">{{ cashbackCurrency }}</tspan></text>
    <rect x="10.5" y="159.2" width="194.1" height="10.5" rx="5.2" fill="#44386C" fill-opacity="0.6"/>
    <rect x="10.5" y="159.2" width="48.5" height="10.5" rx="5.2" fill="#FFE114"/>
    <g style="mix-blend-mode:exclusion">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="6"
            letter-spacing="0.04em"><tspan x="69.8" y="166.2">Wagering:</tspan></text>
    </g>
    <g style="mix-blend-mode:exclusion">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="6"
            font-weight="bold" letter-spacing="0.02em"><tspan x="105.4" y="166.2">60 / 250 EUR</tspan></text>
    </g>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          letter-spacing="0em"><tspan x="10.5" y="191.3">{{ sportBonusText }}</tspan></text>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="9"
          font-weight="bold" letter-spacing="0em"><tspan x="170.6" y="191.3">{{ sportBonusCurrency }}</tspan></text>
    <rect x="10.5" y="201.5" width="194.1" height="10.5" rx="5.2" fill="#44386C" fill-opacity="0.6"/>
    <rect x="10.5" y="201.4" width="96.4" height="10.5" rx="5.2" fill="#FFE114"/>
    <g style="mix-blend-mode:exclusion">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="6"
            letter-spacing="0.04em"><tspan x="67.3" y="208.7">Wagering:</tspan></text>
    </g>
    <g style="mix-blend-mode:exclusion">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="6"
            font-weight="bold" letter-spacing="0.02em"><tspan x="102.9" y="208.7">200 / 400 EUR</tspan></text>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    myBalanceText: String,
    overallBalanceText: String,
    balanceCurrency: String,
    realBalanceText: String,
    realBalanceCurrency: String,
    bonusBalanceText: String,
    bonusBalanceCurrency: String,
    activeBonusesText: String,
    cashbackText: String,
    cashbackCurrency: String,
    sportBonusText: String,
    sportBonusCurrency: String,
    operationsHistoryText: String
  }
}
</script>

<style scoped>
.sora_font {
  font-family: "Sora", sans-serif;
}
</style>
