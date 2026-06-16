<template>
  <svg width="216" height="32" viewBox="0 0 216 32" fill="none">
    <path d="M13.4 7.7H6.1L9.3 4.6C9.5 4.3 9.5 3.9 9.3 3.6C9.0 3.4 8.6 3.4 8.4 3.6L4.1 7.9C3.8 8.2 3.8 8.6 4.1 8.8L8.4 13.1C8.6 13.4 9.0 13.4 9.3 13.1C9.5 12.9 9.5 12.5 9.3 12.2L6.1 9.0H13.4C13.7 9.0 14.0 8.7 14.0 8.4C14.0 8.0 13.7 7.7 13.4 7.7Z"
          fill="#F7F7F7"/>
    <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora-bold"><tspan x="21.9" y="12.1">{{ depositAmount }}</tspan></text>
    <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora-normal"><tspan x="21.9" y="24.2">{{ nextStep }}</tspan></text>
    <rect x="21.8" y="29.1" width="55.7" height="2.6" rx="1.3" fill="#00EDA6"/>
    <rect x="80.2" y="29.2" width="55.7" height="2.6" rx="1.3" fill="#00EDA6"/>
    <rect x="138.5" y="29.2" width="55.7" height="2.6" rx="1.3" fill="#362F4C"/>
    <path d="M212.2 3.4C211.9 3.1 211.4 3.1 211.1 3.4L207.2 7.3L203.3 3.4C203.0 3.1 202.5 3.1 202.2 3.4C201.9 3.7 201.9 4.2 202.2 4.5L206.1 8.4L202.2 12.3C201.9 12.6 201.9 13.1 202.2 13.4C202.5 13.7 203.0 13.7 203.3 13.4L207.2 9.5L211.1 13.4C211.4 13.7 211.9 13.7 212.2 13.4C212.5 13.1 212.5 12.6 212.2 12.3L208.3 8.4L212.2 4.5C212.5 4.2 212.5 3.7 212.2 3.4V3.4Z"
          fill="#F7F7F7"/>
  </svg>
</template>

<script>
export default {
  props: {
    depositAmount: {
      type: String,
      required: false
    },
    nextStep: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.sora-bold {
  font-family: 'Sora', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0;
}

.sora-normal {
  font-family: 'Sora', sans-serif;
  font-size: 8px;
  letter-spacing: 0;
  font-weight: 400;
}
</style>
