<template>
  <div class="bonus_inf">
    <img :src="icon_deposit" v-if="icon_number === 1" class="icon_deposit" alt="">
    <img id="bonus_dark3" :src="bon3" v-if="icon_number === 3" class="icon_deposit" alt="">
    <img id="bonus_dark3" :src="bon4" v-if="icon_number === 4" class="icon_deposit" alt="">
    <svg class="bon_svg" width="214.0" height="444.0" viewBox="0.0 0.0 214.0 444.0" fill="none">
      <g id="bonus_dark1">

      <g>
        <text class="text-bold" xml:space="preserve" style="white-space: pre"><tspan x="73.8" y="19.7">{{
            bonusDetails
          }}</tspan></text>
        <path
            d="M192.8 12.1C192.5 12.3 192.5 12.7 192.8 12.9L196.5 16.6L192.8 20.4C192.5 20.6 192.5 21.0 192.8 21.2C193.0 21.5 193.4 21.5 193.6 21.2L197.4 17.5L201.1 21.2C201.3 21.5 201.7 21.5 201.9 21.2C202.2 21.0 202.2 20.6 201.9 20.4L198.2 16.6L201.9 12.9C202.2 12.7 202.2 12.3 201.9 12.1C201.7 11.8 201.3 11.8 201.1 12.1L197.4 15.8L193.6 12.1C193.4 11.8 193.0 11.8 192.8 12.1Z"
            fill="#FCFCFC"/>
      </g>
      <g>
        <rect x="59.7" y="33.3" width="94.6" height="13.8" rx="6.9" fill="#44386C" fill-opacity="0.6"/>
        <circle cx="66.8" cy="40.2" r="2.4" fill="#F65757"/>
        <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="7.1"
              letter-spacing="0.0em"><tspan x="71.6" y="42.6">{{ expires }}</tspan></text>
        <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="7.1"
              font-weight="bold" letter-spacing="0.0em"><tspan x="100.6" y="42.6"> {{ expiryTime }}</tspan></text>


        <text fill="#F7F7F7" text-anchor="middle" xml:space="preserve" style="white-space: pre" class="sora_font"
              font-size="11.9"
              font-weight="bold" letter-spacing="0.0em"><tspan x="50%" y="134.7">{{ depositBonus }}</tspan></text>



          <text fill="#B6BDCC" text-anchor="middle" xml:space="preserve" style="white-space: pre" class="sora_font"
                font-size="9.5"
                letter-spacing="0.0em"><tspan x="50%" y="157.9">{{ depositBonusDescription }}</tspan></text>

      </g>
      </g>
        <g id="bonus_info_line">
          <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
                letter-spacing="0.0em"><tspan x="9.5" y="181.0">{{ bonus }}</tspan></text>
          <text fill="#F7F7F7" text-anchor="end" xml:space="preserve" style="white-space: pre" class="sora_font"
                font-size="8.3"
                font-weight="bold" letter-spacing="0.0em"><tspan x="205" y="181.0">{{ bonus_summ }} {{ currency }}</tspan></text>
          <g>
            <rect x="9.5" y="189.9" width="195.0" height="9.5" rx="4.8" fill="#44386C" fill-opacity="0.6"/>
            <rect x="9.5" y="189.9" width="48.7" height="9.5" rx="4.8" fill="#FFE114"/>
          </g>
          <g style="mix-blend-mode:exclusion">
            <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="5.4"
                  font-weight="bold" letter-spacing="0.0em"><tspan x="104.4" y="196.7">{{ wagering_sum }} {{ currency }}</tspan></text>
          </g>
          <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="5.4"
                letter-spacing="0.0em"><tspan x="71.9" y="196.7">{{ wagering }}</tspan></text>
        </g>
      <g id="bonus_dark2">



          <g style="mix-blend-mode:exclusion">




          <path d="M9.5 204.2H204.5V220.6H9.5V204.2Z"/>

          <path d="M204.5 220.0H9.5V221.2H204.5V220.0Z" fill="#58488B" fill-opacity="0.4"/>
          <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
                letter-spacing="0.0em"><tspan x="9.5" y="214.0">{{ receivedBonus }}</tspan></text>
          <text fill="#F7F7F7" text-anchor="end" xml:space="preserve" style="white-space: pre" class="sora_font"
                font-size="8.3"
                font-weight="bold" letter-spacing="0.0em"><tspan x="205" y="214.0">{{ recived_bonus }} {{ currency }}</tspan></text>

          <path d="M9.5 225.3H204.5V241.7H9.5V225.3Z"/>

          <path d="M204.5 241.1H9.5V242.3H204.5V241.1Z" fill="#58488B" fill-opacity="0.4"/>
          <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
                letter-spacing="0.0em"><tspan x="9.5" y="235.1">{{ maxBonus }}</tspan></text>
          <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
                font-weight="bold" letter-spacing="0.0em"><tspan x="166.5" y="235.1">200 {{ currency }}</tspan></text>

          <path d="M9.5 246.4H204.5V262.8H9.5V246.4Z"/>

          <path d="M204.5 262.2H9.5V263.4H204.5V262.2Z" fill="#58488B" fill-opacity="0.4"/>
          <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
                letter-spacing="0.0em"><tspan x="9.5" y="256.3">{{ maxWin }}</tspan></text>
          <text fill="#F7F7F7" text-anchor="end" xml:space="preserve" style="white-space: pre" class="sora_font"
                font-size="8.3"
                font-weight="bold" letter-spacing="0.0em"><tspan x="205" y="256.3">{{ max_win_sum }} {{ currency }}</tspan></text>
        </g>
        <path d="M9.5 267.6H204.5V284.0H9.5V267.6Z"/>

        <path d="M204.5 283.4H9.5V284.6H204.5V283.4Z" fill="#58488B" fill-opacity="0.4"/>
        <text fill="#B6BDCC" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
              letter-spacing="0.0em"><tspan x="9.5" y="277.4">{{ wager }}</tspan></text>
        <text fill="#F7F7F7" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
              font-weight="bold" letter-spacing="0.0em"><tspan x="187.5" y="277.4">x40</tspan></text>
        <text fill="#00EDA6" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
              font-weight="bold" letter-spacing="0.0em" text-decoration="underline"><tspan x="47.9" y="298.5">{{ termsConditions }}</tspan></text>
        <text fill="#00EDA6" xml:space="preserve" style="white-space: pre" class="sora_font" font-size="8.3"
              font-weight="bold" letter-spacing="0.0em" text-decoration="underline"><tspan x="9.5" y="298.5">{{ bonuses }} </tspan></text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import icon_deposit from "@components/Stories/img/icons/icon_deposit.webp";
import bon3 from "@components/Stories/img/bon3.webp";
import bon4 from "@components/Stories/img/bon4.webp";

const props = defineProps({
  bonusDetails: String,
  expires: String,
  expiryTime: String,
  depositBonus: String,
  depositBonusDescription: String,
  bonus: String,
  bonusAmount: Number,
  wagering: String,
  wageringAmount: Number,
  receivedBonus: String,
  receivedBonusAmount: Number,
  maxBonus: String,
  maxBonusAmount: Number,
  maxWin: String,
  maxWinAmount: Number,
  wager: String,
  wagerMultiplier: String,
  termsConditions: String,
  bonuses: String,
  icon_number: {
    type: Number,
    default: 1
  },
  max_win_sum: {
    type: String,
    default: "2000"
  },
  wagering_sum: {
    type: String,
    default: "20 / 800"
  },
  recived_bonus: {
    type: String,
    default: "20"
  },
  bonus_summ: {
    type: String,
    default: "20"
  },
  currency: {
    type: String,
    default: 'EUR'
  },

  return: {
    icon_deposit,
    bon3,
    bon4,
  }


});

</script>

<style scoped>

.sora_font {
  font-family: "Sora", sans-serif;
}

.bonus_inf {
  position: absolute;
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
}


.text-bold {
  fill: #F7F7F7;
  font-family: "Sora", sans-serif;
  font-size: 9.5px;
  font-weight: bold;
  letter-spacing: 0;
}

.icon_deposit {
  position: absolute;
  width: 8vh;
  height: 8vh;
  left: 50%;
  transform: translate(-50%);
  top: 8vh;
  z-index: 15;
}

.bon_svg {
  position: absolute;
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
  z-index: 10;
}
#bonus_info_line {
  transform-origin: 50% 10%;
}


</style>
