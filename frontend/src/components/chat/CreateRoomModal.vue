<script setup lang="ts">

import {Input} from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {ref} from "vue"
import {Topic} from "@/model/topic.dto.ts"
import CreateTopicModal from "@/components/chat/CreateTopicModal.vue"

const roomName = ref<string>("")
const roomDescription = ref<string>("")
const roomMaximumUsers = ref<string>("")
const roomPassword = ref<string>("")
const roomTopics = ref<Topic[]>([])
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot/>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a Room</DialogTitle>
        <DialogDescription>
          Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-start space-y-2.5">
        <Label for="name">Name</Label>
        <Input id="name" type="text" v-model="roomName"/>
        <Label for="description">Description</Label>
        <Input id="description" type="text" v-model="roomDescription" placeholder="Description"/>
        <Label>Topics</Label>
        <CreateTopicModal>
          <Button variant="outline" size="default">
            <v-icon name="io-add-circle"/>
            <span class="ml-1">
            Add Topic
          </span>
          </Button>
        </CreateTopicModal>
        <div v-if="roomTopics" class="flex flex-row flex-wrap gap-1 mt-3">
          <Badge v-for="topic in roomTopics" :variant="topic.color" class="cursor-pointer">
            {{ topic.text }}
          </Badge>
        </div>
        <Label>Maximum user count</Label>
        <div class="flex flex-row w-full flex-wrap gap-1 mt-auto">
          <Input type="number" v-model="roomMaximumUsers" placeholder="0"/>
        </div>
        <Label>Password</Label>
        <Input type="text" v-model="roomPassword" placeholder="Password"/>
      </div>
      <DialogFooter>
        <Button class="w-full">
          Save changes
        </Button>
        <Button variant="secondary" class="w-full">
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
