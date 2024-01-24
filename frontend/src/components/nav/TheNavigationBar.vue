<script setup lang="ts">
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import Communify from "@/components/img/Communify.vue"
import NavigationMenuListItem from "@/components/nav/NavigationMenuListItem.vue"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {breakpointsTailwind, useBreakpoints, watchArray} from "@vueuse/core"
import BurgerMenu from "@/components/nav/BurgerMenu.vue"
import {ref} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {storeToRefs} from "pinia"
import {pb} from "@/db/pocketbase.ts"
import router from "@/router/router.ts"
import ThemePreference from "@/components/util/ThemePreference.vue"

type NavigationListItem = {
  title: string
  href: string
  description: string
}

const gettingStartedList: NavigationListItem[] = [
  {
    title: "Chatting ✨",
    href: "/chats",
    description: "Meet new friends and chat with them. Be polite and respectful.",
  },
  {
    title: "Account 👤",
    href: "/user/:username/profile",
    description: "View your profile and edit your account settings.",
  },
  {
    title: "Support 🤔",
    href: "/support",
    description: "Need help? Contact us.",
  },
  {
    title: "Feedback 🙂",
    href: "/feedback",
    description: "Missing a feature? Let us know.",
  },
]

const registrationList: NavigationListItem[] = [
  {
    title: "Login 👋",
    href: "/auth/login",
    description: "Login to your account.",
  },
  {
    title: "Register 🙌",
    href: "/auth/register",
    description: "Create a new account.",
  },
  {
    title: "Data Policy & Data Request 👮",
    href: "/data-policy",
    description: "View how your data is stored. You can also request a copy of your data.",
  },
]

const breakpoints = useBreakpoints(breakpointsTailwind)
const md = breakpoints.between("md", "lg")
const lg = breakpoints.between("lg", "xl")
const xl = breakpoints.greater("xl")

const revealMenu = ref<boolean>(false)

watchArray([md, lg, xl], () => {
  revealMenu.value = false
})

const {currentUser} = storeToRefs(useUserStore())

async function logoutUser() {
  pb.authStore.clear()
  await router.push("/")
}
</script>

<template>
  <nav
    class="flex md:justify-center sticky top-0 w-full backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90
           md:gap-2 lg:gap-16 p-2 border-b border-slate-300 dark:border-slate-800">
    <div class="flex items-center">
      <RouterLink to="/">
        <Communify/>
      </RouterLink>
    </div>

    <template v-if="md || lg || xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/chats" :class="navigationMenuTriggerStyle()">
              Chats
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Get Started
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <NavigationMenuListItem
                  v-for="item in gettingStartedList"
                  :key="item.title"
                  :title="item.title"
                  :href="item.href"
                >
                  {{ item.description }}
                </NavigationMenuListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Registration
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <NavigationMenuListItem
                  v-for="item in registrationList"
                  :key="item.title"
                  :title="item.title"
                  :href="item.href"
                >
                  {{ item.description }}
                </NavigationMenuListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/support" :class="navigationMenuTriggerStyle()">
              Support
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div v-if="currentUser" class="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span>My Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Avatar class="mr-3">
                <AvatarFallback>{{ currentUser.username.slice(0, 1).toUpperCase() }}</AvatarFallback>
              </Avatar>
              <span>{{ currentUser.username }}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <DropdownMenuItem class="cursor-pointer">
                <v-icon class="mr-1.5" name="io-person-circle-sharp" scale="0.75"/>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer">
                <v-icon class="mr-1.5" name="io-chatbubble-ellipses" scale="0.75"/>
                <span>Chats</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer">
                <v-icon class="mr-1.5" name="io-settings-sharp" scale="0.75"/>
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem @click="logoutUser" class="cursor-pointer">
              <v-icon class="mr-1.5" name="io-log-out" scale="0.75"/>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemePreference :display-preference-text="false" />
      </div>
      <div v-else class="flex gap-2">
        <RouterLink to="/auth/login">
          <Button>
            Login
          </Button>
        </RouterLink>
        <RouterLink to="/auth/register">
          <Button variant="outline">
            Register
          </Button>
        </RouterLink>
      </div>
    </template>
    <template v-else>
      <div class="ml-auto mr-3 sm:mr-10">
        <BurgerMenu v-model="revealMenu"/>
      </div>
    </template>
  </nav>
  <div v-if="revealMenu" class="fixed z-50 h-screen w-full bg-background overflow-x-hidden">
    <div class="w-full p-5">
      <ul>
        <li v-for="item in gettingStartedList" class="text-lg border-b border-slate-300 dark:border-slate-80 p-3">
          <RouterLink :to="item.href" @click="revealMenu = false">
            {{ item.title.slice(0, item.title.length - 2) }}
          </RouterLink>
        </li>
      </ul>
      <div class="h-10"></div>
      <ul>
        <li v-for="item in registrationList" class="text-lg border-b border-slate-300 dark:border-slate-80 p-3">
          <RouterLink :to="item.href" @click="revealMenu = false">
            {{ item.title.slice(0, item.title.length - 2) }}
          </RouterLink>
        </li>
      </ul>
      <div class="h-10"></div>
      <div v-if="currentUser">
        <RouterLink to="/user/:username/profile">
          <Button class="w-full" @click="revealMenu = false">
            My Account
          </Button>
        </RouterLink>
      </div>
      <div v-else class="flex flex-col gap-3">
        <RouterLink to="/auth/login">
          <Button class="w-full" @click="revealMenu = false">
            Login
          </Button>
        </RouterLink>
        <RouterLink to="/auth/register">
          <Button variant="outline" class="w-full" @click="revealMenu = false">
            Register
          </Button>
        </RouterLink>
      </div>
      <div class="h-10"></div>
      <ThemePreference />
    </div>
  </div>
</template>

