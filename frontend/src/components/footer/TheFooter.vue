<script setup lang="ts">
import Link from "@/components/util/Link.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import FooterThemePreference from "@/components/footer/FooterThemePreference.vue"
import {useDateFormat, useNow} from "@vueuse/core"

const year = useDateFormat(useNow(), "YYYY")
</script>

<template>
  <footer
    class="no-underline p-0 border-t border-slate-300 dark:border-slate-800 bg-background w-full static bottom-0 h-32 sm:h-24">
    <slot></slot>
    <div class="flex w-full h-full gap-3 sm:gap-5 md:gap-7 justify-center">
      <div class="flex flex-col pt-2 justify-center">
        <p class="text-sm sm:text-xs text-center">
          Released under the
          <Link link="https://github.com/Dino-Kupinic/Communify/blob/master/LICENSE" :opens-tab="true">
              <span>
                MIT License.<GoogleIcon name="North_East" font-size="base" line-height="1.5"></GoogleIcon>
              </span>
          </Link>
          <br>
          Copyright © 2023 - {{ year }} <br> Team DJJ. All rights Reserved.
        </p>
        <Link class="m-auto" link="https://github.com/Dino-Kupinic/Communify" :opens-tab="true">
          <v-icon name="io-logo-github" scale="1.5"/>
        </Link>
      </div>
      <div class="p-2">
        <FooterThemePreference/>
      </div>
    </div>
  </footer>
</template>
