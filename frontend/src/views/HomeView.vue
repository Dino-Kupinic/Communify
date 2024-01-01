<script setup lang="ts">
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
</script>

<template>
  <main class="mt-10 w-full pl-10 pr-10">
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
      <Button>
        <v-icon name="hi-arrow-right" class="mr-1.5"></v-icon>
        <span>Join for free</span>
      </Button>
    </div>
    <div class="m-auto w-2/5">
      <p class="text-xs text-center tracking-wide mt-4 mb-2 text-neutral-600 dark:text-neutral-500">
        A HTL STEYR PROJECT
      </p>
      <Separator/>
      <div class="flex justify-center items-center mt-4">
        <v-icon name="vi-file-type-vue" scale="3"></v-icon>
        <v-icon name="vi-file-type-typescript-official" scale="3"></v-icon>
        <v-icon name="vi-file-type-tailwind" scale="3"></v-icon>
        <v-icon name="vi-file-type-vite" scale="3"></v-icon>
        <v-icon name="vi-file-type-vitest" scale="3"></v-icon>
        <v-icon name="vi-file-type-docker2" scale="3"></v-icon>
      </div>
    </div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis blandit urna quis venenatis. Maecenas vitae
      magna posuere, pulvinar eros non, auctor magna. Phasellus condimentum tristique ex, vel varius diam ornare quis.
      Quisque eget mi in sapien rutrum sodales vitae ut orci. Suspendisse neque orci, lobortis id purus eu, porttitor
      condimentum neque. Nam malesuada ligula eu mauris placerat efficitur. Curabitur congue lacinia lectus ut gravida.
      Etiam fringilla eleifend eros sit amet finibus. Nullam at arcu at turpis ultricies euismod. Sed auctor pulvinar
      nunc, sit amet iaculis mi maximus at.

      Donec sed leo eget enim aliquam scelerisque. Duis id lorem maximus, tempus libero condimentum, vulputate nunc.
      Curabitur consequat nulla vel ligula eleifend convallis. Proin non neque et nisl fermentum tempor eleifend vel
      leo. Sed pulvinar lacus lacus, id sodales enim pretium vitae. Vivamus et erat nec orci malesuada feugiat. Vivamus
      nec nisi nibh. In in vulputate velit.

      Maecenas id ipsum vitae nulla faucibus finibus. Vestibulum sodales est id mi vestibulum consectetur. Sed a ante a
      lorem cursus dapibus et eget lectus. Donec nec mi cursus, euismod libero quis, mollis arcu. Proin scelerisque nec
      massa ac imperdiet. Sed accumsan odio sit amet mi molestie maximus. Praesent lorem nulla, blandit id nulla et,
      ultricies sagittis erat. Fusce risus purus, lobortis vel lacinia non, commodo eu leo.

      Fusce ornare, leo sed fermentum maximus, massa lacus posuere nulla, a molestie turpis orci ut ligula. Nulla
      facilisi. Fusce in convallis sapien. Quisque iaculis elit ac dui aliquet, vel bibendum neque sodales. Sed eget
      sapien nec enim tincidunt egestas non eu dui. Nullam molestie quam nec velit porta, a ultricies mauris
      condimentum. Mauris nec sagittis lorem. Duis luctus feugiat dui. Mauris suscipit est at tincidunt placerat.
      Vivamus aliquet justo vehicula, tincidunt sapien nec, ullamcorper neque. Morbi eleifend, eros vitae pretium
      gravida, orci felis lobortis ipsum, id vestibulum lorem libero lacinia libero. Donec vel turpis auctor, euismod
      odio non, iaculis ipsum. Suspendisse tincidunt gravida lorem sit amet blandit. Quisque dictum ipsum a enim sodales
      elementum. Duis ipsum dolor, sodales sit amet consectetur vel, fermentum id metus. Pellentesque in nunc a sapien
      vehicula sodales sit amet non eros.

      Donec orci enim, lobortis nec ligula a, ultricies commodo arcu. Etiam convallis ultrices ante, nec aliquet purus
      ullamcorper non. Proin vel nulla sit amet orci sodales varius. Aliquam erat volutpat. Integer scelerisque suscipit
      tortor dictum maximus. Pellentesque in condimentum dolor, eleifend dapibus ante. Maecenas dictum eget elit non
      interdum. Duis et ipsum at leo pulvinar dapibus. Nunc tincidunt tempus ex, at semper neque tincidunt ac.
      Suspendisse commodo faucibus justo a imperdiet.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis blandit urna quis venenatis. Maecenas vitae
      magna posuere, pulvinar eros non, auctor magna. Phasellus condimentum tristique ex, vel varius diam ornare quis.
      Quisque eget mi in sapien rutrum sodales vitae ut orci. Suspendisse neque orci, lobortis id purus eu, porttitor
      condimentum neque. Nam malesuada ligula eu mauris placerat efficitur. Curabitur congue lacinia lectus ut gravida.
      Etiam fringilla eleifend eros sit amet finibus. Nullam at arcu at turpis ultricies euismod. Sed auctor pulvinar
      nunc, sit amet iaculis mi maximus at.

      Donec sed leo eget enim aliquam scelerisque. Duis id lorem maximus, tempus libero condimentum, vulputate nunc.
      Curabitur consequat nulla vel ligula eleifend convallis. Proin non neque et nisl fermentum tempor eleifend vel
      leo. Sed pulvinar lacus lacus, id sodales enim pretium vitae. Vivamus et erat nec orci malesuada feugiat. Vivamus
      nec nisi nibh. In in vulputate velit.

      Maecenas id ipsum vitae nulla faucibus finibus. Vestibulum sodales est id mi vestibulum consectetur. Sed a ante a
      lorem cursus dapibus et eget lectus. Donec nec mi cursus, euismod libero quis, mollis arcu. Proin scelerisque nec
      massa ac imperdiet. Sed accumsan odio sit amet mi molestie maximus. Praesent lorem nulla, blandit id nulla et,
      ultricies sagittis erat. Fusce risus purus, lobortis vel lacinia non, commodo eu leo.

      Fusce ornare, leo sed fermentum maximus, massa lacus posuere nulla, a molestie turpis orci ut ligula. Nulla
      facilisi. Fusce in convallis sapien. Quisque iaculis elit ac dui aliquet, vel bibendum neque sodales. Sed eget
      sapien nec enim tincidunt egestas non eu dui. Nullam molestie quam nec velit porta, a ultricies mauris
      condimentum. Mauris nec sagittis lorem. Duis luctus feugiat dui. Mauris suscipit est at tincidunt placerat.
      Vivamus aliquet justo vehicula, tincidunt sapien nec, ullamcorper neque. Morbi eleifend, eros vitae pretium
      gravida, orci felis lobortis ipsum, id vestibulum lorem libero lacinia libero. Donec vel turpis auctor, euismod
      odio non, iaculis ipsum. Suspendisse tincidunt gravida lorem sit amet blandit. Quisque dictum ipsum a enim sodales
      elementum. Duis ipsum dolor, sodales sit amet consectetur vel, fermentum id metus. Pellentesque in nunc a sapien
      vehicula sodales sit amet non eros.

      Donec orci enim, lobortis nec ligula a, ultricies commodo arcu. Etiam convallis ultrices ante, nec aliquet purus
      ullamcorper non. Proin vel nulla sit amet orci sodales varius. Aliquam erat volutpat. Integer scelerisque suscipit
      tortor dictum maximus. Pellentesque in condimentum dolor, eleifend dapibus ante. Maecenas dictum eget elit non
      interdum. Duis et ipsum at leo pulvinar dapibus. Nunc tincidunt tempus ex, at semper neque tincidunt ac.
      Suspendisse commodo faucibus justo a imperdiet.
    </p>
  </main>
</template>
