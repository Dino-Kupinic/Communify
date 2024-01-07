<script setup lang="ts">
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"

type Icon = {
  name: string
  scale: number
}
const icons: Icon[] = [
  {
    "name": "vi-file-type-vue",
    "scale": 3,
  },
  {
    "name": "vi-file-type-typescript-official",
    "scale": 3,
  },
  {
    "name": "vi-file-type-tailwind",
    "scale": 3,
  },
  {
    "name": "vi-file-type-vitest",
    "scale": 3,
  },
  {
    "name": "vi-file-type-docker2",
    "scale": 3,
  },
]
</script>

<template>
  <main class="mt-10 w-full pl-10 pr-10 h-screen">
    <p class="text-6xl md:text-8xl p-4 text-center font-extrabold bg-clip-text text-transparent tracking-tighter
              bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.200),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.200),theme(colors.indigo.400))]
              bg-[length:200%_auto] animate-gradient"
    >
      Let's start chatting.
    </p>
    <p class="text-md sm:text-lg text-center mt-5 text-neutral-600 dark:text-neutral-500">
      Your all-new chatting experience has arrived.
      <br>A friendly hub for authentic conversations, shared moments
      <br>and <strong>meaningful socializing</strong>.
    </p>
    <div class="flex justify-center mt-12 mb-20">
      <RouterLink to="/chats">
        <Button>
          <v-icon name="hi-arrow-right" class="mr-1.5"></v-icon>
          <span>Join for free</span>
        </Button>
      </RouterLink>
    </div>
    <div class="m-auto w-3/4  sm:w-2/5">
      <p class="text-xs text-center tracking-wide mt-4 mb-2 text-neutral-600 dark:text-neutral-500">
        A HTL STEYR PROJECT
      </p>
      <Separator/>
      <div class="flex justify-center items-center mt-4">
        <v-icon v-for="icon in icons" :name="icon.name" :scale="icon.scale"/>
      </div>
    </div>
  </main>
</template>
