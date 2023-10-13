<script setup lang="ts">

import Logo from "@/components/util/Logo.vue"
import BodyText from "@/components/text/BodyText.vue"
import HeroTitle from "@/components/text/HeroTitle.vue"
import Infobox from "@/components/Boxes/InfoBox.vue"
import HeroButton from "@/components/controls/HeroButton.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import HeroSubText from "@/components/text/HeroSubText.vue"

</script>
<template id="template">
  <div class="logo">
    <Logo></Logo>
  </div>

  <HeroTitle id="heroTitle">Let's start chatting.</HeroTitle>
  <HeroSubText id="bodyText" font-size="24px" color="var(--neutral-500)">
    Connecting people, one message at a time.<br> You'll find what you're looking for!
  </HeroSubText>

  <HeroButton to="/" class="center">
    <GoogleIcon name="Arrow_forward" font-size="1.4rem"></GoogleIcon>
    Join for free
  </HeroButton>

  <div class="infobox-container">
    <Infobox class="infoBoxOutside">
      <h3> Communify has more than <span class="highlight">100.000+</span> Users.</h3>
    </Infobox>
    <Infobox class="infoBoxOutside">
      <h3>
        Over
        <span class="highlight">1000+<br></span>
        messages sent per minute
      </h3>
    </Infobox>
    <Infobox class="infoBoxOutside">
      <h3>
        <span class="highlight">99.9%</span>
        Reliability and uptime
      </h3>
    </Infobox>
  </div>
</template>

<style>
.logo {
  margin-top: 2em;
  display: flex;
  justify-content: center;
}

.center {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1250px) {
  #heroTitle {
    font-size: 6em;
    margin-top: 20%;
  }

  #bodyText {
    padding-right: 15%;
    padding-left: 15%;
  }
}

@media screen and (max-width: 750px) {
  #heroTitle {
    font-size: 5em;
    margin-top: 15%;
  }

  #bodyText {
    padding-right: 10%;
    padding-left: 10%;
  }

  .infobox-container {
    display: unset;
  }

  .infoBoxOutside {
    margin: 15% auto;
  }
}

#bodyText {
  padding-right: 28%;
  padding-left: 28%;
  text-align: center;
  line-height: 1.65em;
  font-weight: 450;
  margin-bottom: 2em;
}

.infobox-container {
  display: flex;
  justify-content: center;
}

.highlight {
  background-image: linear-gradient(to right, var(--brand-600), var(--brand-400));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
}

</style>
