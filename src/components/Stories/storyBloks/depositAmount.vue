<template>

  <svg width="215" height="80" fill="none" viewBox="0 0 215 80">
    <g>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="9.1" font-weight="bold" letter-spacing="0em" style="white-space:pre"><tspan x="45.6" y="11.3">{{ depositText }}</tspan></text>
      <rect width="26.1" height="26.1" x=".9" y="24.2" :fill="rectColor" rx="13.1"/>
      <path :fill="pathColor" d="M17.9 38H10a.7.7 0 0 1-.6-.7c0-.4.3-.7.6-.7h8c.3 0 .6.3.6.7 0 .3-.3.6-.6.6Z"/>
      <rect width="151.4" height="31.7" x="32.2" y="21.4" :fill="rectColor" rx="15.8"/>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="10.4" font-weight="bold"
            letter-spacing="0em" style="white-space:pre"><tspan id="summ_amount" x="42.7" y="40.8">50</tspan></text><text
        xml:space="preserve" :fill="secondaryTextColor" font-family="Sora" font-size="10.4" font-weight="bold"
        letter-spacing="0em" style="white-space:pre"><tspan x="151.2" y="40.8">{{ currency }}</tspan></text>
      <g id="pluse">
      <rect width="26.1" height="26.1" x="188.8" y="24.2" :fill="rectColor" rx="13.1"/>
      <path :fill="pathColor"
            d="M205.8 38h-3.3v3.2a.7.7 0 0 1-1.3 0v-3.3H198a.7.7 0 0 1-.6-.6c0-.4.3-.7.6-.7h3.3v-3.2c0-.4.3-.7.7-.7.3 0 .6.3.6.7v3.2h3.3a.7.7 0 0 1 0 1.3Z"/>
      </g>
      <rect width="49.6" height="21.4" x=".9" y="58" :fill="rectColor" rx="10.7"/>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="7.8" font-weight="bold"
            letter-spacing="0em" style="white-space:pre"><tspan x="20.2" y="71.4">{{ lowerAmount }}</tspan></text>
      <rect width="48.9" height="20.8" x="56" y="58.4" :stroke="strokeColor" stroke-width=".7" rx="10.4"/>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="7.8" font-weight="bold"
            letter-spacing="0em" style="white-space:pre"><tspan x="75.1" y="71.4">{{ middleAmount }}</tspan></text>
      <rect width="48.9" height="20.8" x="110.8" y="58.4" :stroke="strokeColor" stroke-width=".7" rx="10.4"/>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="7.8" font-weight="bold"
            letter-spacing="0em" style="white-space:pre"><tspan x="129.6" y="71.4">{{ upperAmount }}</tspan></text>
      <rect width="48.9" height="20.8" x="165.7" y="58.4" :stroke="strokeColor" stroke-width=".7" rx="10.4"/>
      <text xml:space="preserve" :fill="textColor" font-family="Sora" font-size="7.8" font-weight="bold"
            letter-spacing="0em" style="white-space:pre"><tspan x="183" y="71.4">{{ highestAmount }}</tspan></text>
    </g>
  </svg>



</template>

<script>
export default {
  props: {
    depositText: String,
    rectColor: {
      type: String,
      default: '#4C426B'
    },
    pathColor: {
      type: String,
      default: '#FCFCFC'
    },
    currency: String,
    textColor: {
      type: String,
      default: '#F7F7F7'
    },
    secondaryTextColor: {
      type: String,
      default: '#B6BDCC'
    },
    lowerAmount: Number,
    middleAmount: Number,
    upperAmount: Number,
    highestAmount: Number,
    strokeColor: {
      type: String,
      default: '#4C426B'
    }
  }
}
</script>

<style scoped>
text {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  letter-spacing: 0;
}
#pluse {
  transform-origin: 1vh 1vh;
}


</style>
