<template>
  <div>
  <svg class="dep_bonus" width="215" height="180" fill="none" viewBox="0 0 215 180">
    <g id="rest_of_dep1">
    <text class="bonus-title" xml:space="preserve" fill="#F7F7F7" letter-spacing="0em" style="white-space:pre"><tspan x="61.55" y="11.11">{{
        title
      }}</tspan></text>
    <g>
      <rect id="dep_bon_act" width="214.02" height="107.69" rx="5.22" fill="url(#paint0_linear_10699_15230)"/>
      <rect id="deposit_bonus_bg" width="214.02" height="107.69" y="21.22" fill="#221C36" rx="5.22"/>
      <text class="bonus-subtitle" xml:space="preserve" fill="#FFE114" letter-spacing=".02em" style="white-space:pre"><tspan x="10.44" y="39.16">{{
          subtitle
        }}</tspan></text>
      <rect width="51.44" height="11" x="58.66" y="31.66" fill="#F65757" rx="5.22"/>
      <text class="bonus-time" xml:space="preserve" fill="#110E1B" letter-spacing=".02em" style="white-space:pre"><tspan x="64.26" y="39.16">{{
          time
        }}</tspan></text>
      <text class="bonus-amount" xml:space="preserve" fill="#F7F7F7" letter-spacing="0em" style="white-space:pre"><tspan x="10.44" y="61.59">{{
          amount + " " +  currency
        }}</tspan></text>
      <text class="bonus-deposit" xml:space="preserve" fill="#FFE114" letter-spacing="0em" style="white-space:pre"><tspan x="10.44" y="83.7">{{
          deposit
        }}</tspan></text>
      <text class="bonus-label" xml:space="preserve" fill="#F7F7F7" letter-spacing=".04em" style="white-space:pre"><tspan x="10.44" y="93.53">{{
          label
        }}</tspan></text>

      <text class="bonus-wager" xml:space="preserve" fill="#FFE114" letter-spacing="0em" style="white-space:pre"><tspan x="105" y="83.7">{{
          wager
        }}</tspan></text>
      <text xml:space="preserve" fill="#F7F7F7" class="bonus-label" letter-spacing=".04em"
            style="white-space:pre"><tspan x="105" y="93.53">
        {{ wagerLabel }}
      </tspan></text>
      <path fill="#4C426B" d="M0 107.47h214.02v21.44H0z"/>
      To align the text to the right in SVG, you can use the `text-anchor` attribute and set it to `end`. This will align the text to the right based on the x-coordinate provided. Here's how you can do it:

      ```vue
      <text class="bonus-choose" xml:space="preserve" fill="#FCFCFC" letter-spacing="0em" style="white-space:pre" text-anchor="end">
<tspan id="bonus-choose11" x="120" y="120.86">{{
    choose
  }}</tspan></text>
    </g>
    <image :xlink:href="gift_deposit" x="140" y="27" height="26%" width="26%"/>
    </g>
    <g id="min_dep11">
      <text class="bonus-min-deposit" xml:space="preserve" fill="#FFE114" letter-spacing="0em" style="white-space:pre"><tspan x="50.88" y="83.7">{{
          minDeposit
        }}</tspan></text>
      <text xml:space="preserve" fill="#F7F7F7" class="bonus-label" letter-spacing=".04em"
            style="white-space:pre"><tspan x="50.88" y="93.53">
        {{ minDepositLabel }}
      </tspan></text>
    </g>
    <defs xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="paint0_linear_10699_15230" x1="-3.11074e-08" y1="60.5171" x2="214.409" y2="58.8283" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EB02E2"/>
        <stop offset="1" stop-color="#2797FF"/>
      </linearGradient>
    </defs>
  </svg>
    <img :src="check" id="checkbox" class="checkbox" alt="">
  <div id="dep_button" class="dep_button">
    <div class="top_text"> <span>{{deposit_word}} </span> <span id="sum_dep">50</span><span>{{" " + currency}}</span></div>
    <div id="bottom_text11" class="bottom_text"> <span>+30 </span> <span>{{currency}}</span> <span>{{bonus}}</span></div>
  </div>
  </div>
</template>

<script>
import gift_deposit from "@components/Stories/img/gift_deposit.webp";
import check from "@components/Stories/img/check.svg";
export default {
  props: {
    title: String,
    subtitle: String,
    time: String,
    amount: String,
    deposit: String,
    label: String,
    minDeposit: String,
    minDepositLabel: String,
    wager: String,
    wagerLabel: String,
    choose: String,
    deposit_word: String,
    currency: String,
    bonus: String,
  },
  data() {
    return {
      gift_deposit,
      check,
    }
  }
}

</script>

<style scoped>
.bonus-title {
  font-family: 'Sora', sans-serif;
  font-size: 9px;
  font-weight: bold;
}

.bonus-subtitle {
  font-family: 'Sora', sans-serif;
  font-size: 6px;
  font-weight: bold;
}

.bonus-time {
  font-family: 'Sora', sans-serif;
  font-size: 6px;
  font-weight: bold;
}

.bonus-amount {
  font-family: 'Sora', sans-serif;
  font-size: 10px;
  font-weight: bold;
}

.bonus-deposit {
  font-family: 'Sora', sans-serif;
  font-size: 8px;
  font-weight: bold;
}

.bonus-label {
  font-family: 'Sora', sans-serif;
  font-size: 6px;
}

.bonus-min-deposit {
  font-family: 'Sora', sans-serif;
  font-size: 8px;
  font-weight: bold;
}

.bonus-wager {
  font-family: 'Sora', sans-serif;
  font-size: 8px;
  font-weight: bold;
}

.bonus-choose {
  font-family: 'Sora', sans-serif;
  font-size: 8px;
  font-weight: bold;
}
#min_dep11 {
  transform-origin: 10% 10%;
}
.dep_bonus {
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  position: absolute;
}

.dep_button {
  position: absolute;
  top: 20vh;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  border-radius: 5vh;
  min-height: 3.5vh;
  background-color: var(--color-primary-1);
}

.top_text {
  font-family: 'Sora', sans-serif;
  font-size: 1vh;
  margin-top: 0.4vh;
  margin-bottom: 0.4vh;
  font-weight: 700;
  color: var(--color-on-light-back);
}

.bottom_text {
  font-family: 'Sora', sans-serif;
  font-size: 0.9vh;
  font-weight: 400;
  margin-bottom: 0.4vh;
  color: var(--color-on-light-back);
  display: none;
}
.checkbox {
  position: absolute;
  z-index: 10;
  top: 15.3vh;
  left: 16.7vh;
  height: 1.2vh;
  width: auto;
  opacity: 0;
  display: none;
}
#dep_bon_act {
  transform: translate(0, 21px);
  opacity: 0;
}

</style>
