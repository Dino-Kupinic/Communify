<script setup lang="ts">
import BodyText from "@/components/text/BodyText.vue"
import Link from "@/components/text/Link.vue"
import Icon from "@/components/util/Icon.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
</script>

<template>
  <footer>
    <slot></slot>
    <div class="legal-info">
      <BodyText font-size="13px" class="footer-text">
        Released under the
        <Link link="https://github.com/Dino-Kupinic/Communify/blob/master/LICENSE" :opens-tab="true">
            <span>
              MIT License.<GoogleIcon name="North_East" font-size="1.1rem" line-height="1.5"></GoogleIcon>
            </span>
        </Link>
        <br>
        Copyright © 2023 Team DJJ. All rights Reserved.
      </BodyText>
      <Link link="https://github.com/Dino-Kupinic/Communify" :opens-tab="true">
        <Icon image-name="github"></Icon>
      </Link>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-decoration: none;
  padding: 0;
  border-top: 1px solid var(--neutral-500);
  background-color: var(--color-background-soft);
  width: 100%;
  position: relative;
  bottom: 0;
}

.legal-info {
  border-top: var(--color-background-soft);
  padding: 1rem;
  display: inline;
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  margin-bottom: 0.5rem;
}
</style>