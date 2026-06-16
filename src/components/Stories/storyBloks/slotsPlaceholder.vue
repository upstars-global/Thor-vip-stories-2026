<template>
  <svg width="262" height="90" viewBox="0 0 262 90" fill="none">
    <g opacity="0.6">
      <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="13"
            font-weight="bold" letter-spacing="0em"><tspan x="19.0" y="53.4">{{ providerText }}</tspan></text>

      <rect x="19.0" y="63.2" width="71.0" height="25.4" rx="10.1" fill="#30284C"/>
      <rect x="95.2" y="63.2" width="71.0" height="25.4" rx="10.1" fill="#30284C"/>
      <rect x="171.4" y="63.2" width="71.0" height="25.4" rx="10.1" fill="#30284C"/>
    </g>
    <text fill="#F7F7F7" text-anchor="middle" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="19"
          font-weight="bold" letter-spacing="0em"><tspan id="slot_text_placeholder" x="50%" y="18.5">{{ slotText }}</tspan></text>
  </svg>
</template>

<script>
export default {
  name: "slotsPlaceholder",
  props: {
    providerText: {
      type: String,
      default: 'All providers'
    },
    slotText: {
      type: String,
      default: 'All slots'
    }
  }
}
</script>

<style scoped lang="scss">
.sora_font {
  font-family: "Sora", sans-serif;
}
</style>
