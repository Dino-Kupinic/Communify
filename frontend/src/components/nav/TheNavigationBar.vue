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
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

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
    title: "Register 🫶",
    href: "/auth/register",
    description: "Create a new account.",
  },
  {
    title: "Data Policy & Data Request 👮",
    href: "/data-policy",
    description: "View how your data is stored. You can also request a copy of your data.",
  },
]
</script>

<template>
  <!-- TODO: responsive design -->
  <header class="flex justify-center gap-16 p-2 border-b border-slate-300 dark:border-slate-800">
    <div class="flex items-center">
      <RouterLink to="/">
        <Communify/>
      </RouterLink>
    </div>

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
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span>My Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Avatar class="mr-3">
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <span>Dino Kupinic</span>
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
          <DropdownMenuItem class="cursor-pointer">
            <v-icon class="mr-1.5" name="io-log-out" scale="0.75"/>
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

