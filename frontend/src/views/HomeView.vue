<script setup lang="ts">

import Logo from "@/components/util/Logo.vue"
import HeroTitle from "@/components/text/HeroTitle.vue"
import Infobox from "@/components/Boxes/InfoBox.vue"
import HeroButton from "@/components/controls/HeroButton.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import HeroSubText from "@/components/text/HeroSubText.vue"
import Section from "@/components/section/Section.vue"
import Module1 from "@/components/modules/Module1.vue"
import Module2 from "@/components/modules/Module2.vue"
import Module3 from "@/components/modules/Module3.vue"
import Icon from "@/components/util/Icon.vue"
import Illustration from "@/components/util/Illustration.vue"

/*
#44585f
 */

</script>
<template id="template">
  <div class="logo">
    <Logo></Logo>
  </div>

  <HeroTitle id="heroTitle">Let's start chatting.</HeroTitle>
  <HeroSubText id="herosubText" font-size="24px" color="var(--neutral-500)">
    Connecting people, one message at a time.<br> You'll find what you're looking for!
  </HeroSubText>

  <HeroButton to="/auth/login" class="center">
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

  <Section bgColor="--color-text" id="section1">
    <Module1 id="module1" class="moduleSplitted4mediaQuery" bgColor="#c0cbcf" text-color="--text-color" >
      <Illustration image-name="everyPerson"></Illustration>
      <h3 class="textmodule1">Chat with everyone you like ...</h3>
    </Module1>

    <Module2 id="module2" class="moduleSplitted4mediaQuery" bgColor="#c0cbcf" text-color="--text-color" >
      <Illustration image-name="worldwide" picture-width="25rem"></Illustration>
      <h3 class="textmodule1"> ... and everywhere you stay.</h3>
    </Module2>
  </Section>

  <Section bgColor="--color-text" id="section2" >
    <Module3 id="module3" bgColor="#1c344a" text-color="#e0dfdf">
      <Illustration image-name="connectingPeople"  picture-width="45rem"></Illustration>
      <h3 class="textmodule1">Find new Friends and use the platform for new experiencies, practise in talking or for learning</h3>
    </Module3>
  </Section>

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
    margin-top: 15%;
  }

  #herosubText {
    padding-right: 15%;
    padding-left: 15%;
  }
}

@media screen and (max-width: 750px) {
  #heroTitle {
    font-size: 5em;
    margin-top: 15%;
  }

  #herosubText {
    padding-right: 10% !important;
    padding-left: 10% !important;
  }

  .infobox-container {
    display: unset !important;
  }

  .infoBoxOutside {
    margin: 15% auto !important;
  }


  #section1 {
    display: unset !important;
  }

  #module1 {
    width: 100%;
    margin: 0;
    margin-bottom: 15px
  }

  #module2 {
    width: 100%;
    margin-left: 0;
    margin-top: 20px!important;
    margin-bottom: 15px;
  }

  #module3 {
    margin-top: 20px !important;
  }

}

#herosubText {
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

#section1 {
  display: flex;
  margin-bottom: 20px;
}

#section2 {
  margin-bottom: 15px;
}

@media (prefers-color-scheme: dark) {
    .moduleSplitted4mediaQuery {
      background-color: #44585f !important;
    }
    #section2 {
      margin: 0 !important;
      margin-bottom: 15px !important;
    }
}

#module3 {
  margin-top: 40px;
}

.textmodule1 {
  text-align: center;
  width: 100%;
  font-weight: 500;
  color: #829398;
  font-family: Inter, serfi;
  /*
  background: linear-gradient(90deg, #1ec3e0, #2432d3);
  background-clear: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 650;

   */
}


</style>
