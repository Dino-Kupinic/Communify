<script setup lang="ts">
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Communify from "@/components/img/Communify.vue"
import NavigationMenuListItem from "@/components/nav/NavigationMenuListItem.vue"

type NavigationListItem = {
  title: string
  href: string
  description: string
}

const gettingStartedList: NavigationListItem[] = [
  {
    title: "Chatting",
    href: "/chats",
    description: "Meet new friends and chat with them. Create groups and chat with multiple people at once.",
  },
  {
    title: "Account",
    href: "/user/:username/profile",
    description: "View your profile and edit your account settings.",
  },
  {
    title: "Support",
    href: "/support",
    description: "Need help? Contact us.",
  },
  {
    title: "Feedback",
    href: "/feedback",
    description: "Missing a feature? Let us know.",
  }
]
</script>

<template>
  <header>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Communify/>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            Home
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
            samc
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            Feedback
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  </header>
</template>

