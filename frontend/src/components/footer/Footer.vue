<script setup lang="ts">
import Link from "@/components/util/Link.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import Icon from "@/components/util/Icon.vue"
</script>

<template>
  <footer class="no-underline p-0 border-t border-slate-500 bg-background w-full absolute bottom-0 h-32">
    <slot></slot>
    <div class="">
      <p class="text-sm">
        Released under the
        <Link link="https://github.com/Dino-Kupinic/Communify/blob/master/LICENSE" :opens-tab="true">
            <span>
              MIT License.<GoogleIcon name="North_East" font-size="base" line-height="1.5"></GoogleIcon>
            </span>
        </Link>
        <br>
        Copyright © 2023 Team DJJ. All rights Reserved.
      </p>
      <Link link="https://github.com/Dino-Kupinic/Communify" :opens-tab="true">
        <Icon id="icon" image-name="github"></Icon>
      </Link>
    </div>
  </footer>
</template>
