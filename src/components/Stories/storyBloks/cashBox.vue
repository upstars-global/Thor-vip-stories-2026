<template>
  <svg width="216" height="53" viewBox="0 0 216 53" fill="none">
    <text class="sora_font" text-anchor="middle" fill="#F7F7F7" xml:space="preserve" style="white-space: pre" font-size="10.5" font-weight="bold" letter-spacing="0em">
      <tspan x="50%" y="11.6">{{ cashboxText }}</tspan>
    </text>
    <path d="M202.21 2.81516C201.954 3.0713 201.954 3.4866 202.21 3.74274L206.337 7.8705L202.21 11.9983C201.954 12.2544 201.954 12.6697 202.21 12.9259C202.466 13.182 202.881 13.182 203.137 12.9259L207.265 8.79809L211.393 12.9258C211.649 13.182 212.064 13.182 212.32 12.9258C212.577 12.6697 212.577 12.2544 212.32 11.9983L208.193 7.8705L212.32 3.74276C212.577 3.48661 212.577 3.07132 212.32 2.81517C212.064 2.55903 211.649 2.55903 211.393 2.81517L207.265 6.94292L203.137 2.81516C202.881 2.55901 202.466 2.55901 202.21 2.81516Z" fill="#FCFCFC"/>
    <rect y="26.5" width="102.3" height="26.5" rx="13.2" fill="#4C426B"/>
    <text text-anchor="middle" class="sora_font" fill="#FCFCFC" xml:space="preserve" style="white-space: pre" font-size="9.2" font-weight="bold" letter-spacing="0em">
      <tspan x="51" y="42.9">{{ withdrawText }}</tspan>
    </text>
    <rect x="112.8" y="26.5" width="102.3" height="26.5" rx="13.2" fill="#00EDA6"/>
    <text text-anchor="middle" class="sora_font" fill="#110E1B" xml:space="preserve" style="white-space: pre" font-size="9.2" font-weight="bold" letter-spacing="0em">
      <tspan x="165" y="42.9">{{ depositText }}</tspan>
    </text>
    <defs>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    cashboxText: String,
    withdrawText: String,
    depositText: String,
    fontClass: String,
  },
};
</script>

<style scoped>
.sora_font {
  font-family: "Sora", sans-serif;
}
</style>
