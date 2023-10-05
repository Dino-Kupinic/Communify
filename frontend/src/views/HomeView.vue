<script setup lang="ts">

import Logo from "@/components/util/Logo.vue"
import BodyText from "@/components/text/BodyText.vue"
import HeroTitle from "@/components/text/HeroTitle.vue"
import Infobox from "@/components/footer/Infobox.vue"
import {ref} from "vue"

const message2people = ref("You can enter Communify by clicking on the button below and become" +
  " a part of our global community. You'll find what you're looking for!")
</script>

<template id="template">
  <Logo id="logoHomeView"></Logo>
  <HeroTitle id="heroTitle">Lets start chatting.</HeroTitle>
  <BodyText id="bodyText" font-size="24px" color="#888888">{{message2people}}</BodyText>

  <div class="FlexDesign">
    <infobox>
    <div class="infobox_inside">
      <h2 class="VertikalCenterH2"> Communifiy hat schon über 100.000+ User! </h2>
    </div>
  </infobox>
    <infobox>
      <div class="infobox_inside">
        <h2 class="VertikalCenterH2"> Data Privace is our focus! <a href="#"> Learn more about it.</a></h2>
      </div>
    </infobox>
  </div>

</template>
<style>

  body {
    background-color: var(--color-main-background);
  }

  #logoHomeView {
    padding-top: 2.5em;
    padding-right: 2.5em;
    float: right;
    width: 30em;
  }

  @media screen and (max-width: 1250px) {
    #logoHomeView {
      padding-top: 2em;
      padding-right: 2em;
      float: right;
      width: 20em;
    }

    #heroTitle {
      font-size: 6em;
      margin-top: 25%;
    }

    #bodyText {
      padding-right: 15% !important;
      padding-left: 15% !important;
    }
  }


  @media screen and (max-width: 750px) {
    #logoHomeView {
      float: right;
      padding-top: 2em;
      padding-right: 2em;
      width: 15em;
    }

    #heroTitle {
      font-size: 5em;
      margin-top: 30%;
    }

    #bodyText {
      padding-right: 10% !important;
      padding-left: 10% !important;
    }
  }

  #bodyText {
    padding-right: 28%;
    padding-left: 28%;
    text-align: center;
    line-height: 1.65em;
    font-weight: 450;
    margin-bottom: 2.5em;
  }

  .infobox_inside {

    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;

  }

  .VertikalCenterH2 {
    text-align: center;
  }


  .FlexDesign {
    display: flex;
    justify-content: center;
  }


</style>
