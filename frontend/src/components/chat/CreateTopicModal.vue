<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select"
import {ref} from "vue"
import ColorPill from "@/components/util/ColorPill.vue"

const colors = ref(["red", "orange", "gold", "green", "blue", "purple", "pink", "brown"])
const topicName = ref("")
const color = ref("")
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot/>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a Topic</DialogTitle>
        <DialogDescription>
          Click save to add it!
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-start space-y-2.5">
        <Label for="name">Topic</Label>
        <Input id="name" type="text" v-model="topicName" placeholder="Name"/>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a nice color"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color</SelectLabel>
              <SelectItem :value="color" v-for="color in colors" :key="color">
                <div class="flex gap-2">
                  <ColorPill :color="color"/>
                  <span>{{ color }}</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
