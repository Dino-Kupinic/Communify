<script setup lang="ts">
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Room} from "@/model/room.dto.ts"
import {storeToRefs} from "pinia"
import {useUserStore} from "@/stores/userStore.ts"
import {computed, ComputedRef, inject, ref} from "vue"
import {roomKey} from "@/model/room.key.ts"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Topic} from "@/model/topic.dto.ts"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

defineProps<{
  roomTopics: Topic[]
  maximum_users: string
}>()

const room = inject<Room>(roomKey) as Room
const {users, currentUser} = storeToRefs(useUserStore())

const username: ComputedRef<string> = computed(() => {
  const user = users.value.filter((user) => user.id == room.creator_id)
  return user[0].username
})

const imgURL: ComputedRef<string> = computed(() => {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${username.value}&scale=130&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&radius=30&randomizeIds=true`
})

const editName = ref<string>("")
const editDescription = ref<string>("")
const editPassword = ref<string>("")
const editMaximumUsers = ref<number>(0)
</script>

<template>
  <!-- Owner -->
  <Dialog>
    <DialogTrigger>
      <slot/>
    </DialogTrigger>
    <DialogContent v-if="room.creator_id === currentUser?.id">
      <DialogHeader>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogDescription>
          Make changes to your room here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-start space-y-2.5">
        <Label>Creator</Label>
        <div class="flex items-center space-x-2">
          <img
            class="avatar"
            :src=imgURL
            alt="avatar"
            width="32px"
          />
          <p class="text">{{ username }}</p>
        </div>
        <Label for="name">Name</Label>
        <Input id="name" type="text" v-model="editName"/>
        <Label for="description">Description</Label>
        <Input id="description" type="text" v-model="editDescription" placeholder="Description"/>
        <Label>Topics</Label>
        <Button variant="outline" size="default">
          <v-icon name="io-add-circle"/>
          <span class="ml-1">
            Add Topic
          </span>
        </Button>
        <div v-if="roomTopics" class="flex flex-row flex-wrap gap-1 mt-3">
          <Badge v-for="topic in roomTopics" :variant="topic.color" class="cursor-pointer">
            {{ topic.text }}
          </Badge>
        </div>
        <Label>Maximum user count</Label>
        <div class="flex flex-row w-full flex-wrap gap-1 mt-auto">
          <Input type="number" v-model="editMaximumUsers" placeholder="0"/>
        </div>
        <Label>Password</Label>
        <div v-if="room.password" class="w-full">
          <Input type="text" v-model="editPassword" placeholder="Password"/>
        </div>
      </div>
      <DialogFooter>
        <AlertDialog>
          <AlertDialogTrigger class="w-full">
            <Button variant="destructive" class="mb-4 w-full">
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the room.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button class="w-full">
          Save changes
        </Button>
        <Button variant="secondary" class="w-full">
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>

    <!-- Guest -->
    <DialogContent v-else>
      <DialogHeader>
        <DialogTitle>Room Info</DialogTitle>
        <DialogDescription>
          View infos about this room here.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-start space-y-2.5">
        <Label>Creator</Label>
        <div class="flex items-center space-x-2">
          <img
            class="avatar"
            :src=imgURL
            alt="avatar"
            width="32px"
          />
          <p class="text">{{ username }}</p>
        </div>
        <Label for="name">Name</Label>
        <Input id="name" type="text" disabled :default-value="room.name"/>
        <Label for="description">Description</Label>
        <p class="text-xs" id="description">{{ room.description }}</p>
        <Label>Topics</Label>
        <div v-if="roomTopics" class="flex flex-row flex-wrap gap-1 mt-3">
          <Badge v-for="topic in roomTopics" :variant="topic.color">{{ topic.text }}</Badge>
        </div>
        <div v-if="roomTopics.length === 0">
          <span class="text-sm">No topics provided.</span>
        </div>
        <Label>Maximum user count</Label>
        <div class="flex flex-row flex-wrap gap-1 mt-auto">
          <div>
            <v-icon name="hi-solid-user-group"/>
            {{ maximum_users }}
          </div>
        </div>
        <Label>Password</Label>
        <div v-if="room.password">
          <v-icon name="hi-solid-lock-closed"/>
          <span class="text-sm ml-1">Password protected</span>
        </div>
        <div v-else>
          <span class="text-sm">None</span>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
