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
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {ref} from "vue"

const input = ref<string>("")
const emit = defineEmits<{
  password: [value: string]
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Room password required</DialogTitle>
        <DialogDescription>
          This room requires a password to enter.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-start space-y-2.5">
        <Label>Password</Label>
        <Input type="text" v-model="input"/>
      </div>
      <DialogFooter>
        <DialogTrigger asChild>
          <Button @click="$emit('password', input)">
            Submit
          </Button>
        </DialogTrigger>
        <DialogClose >
          <Button variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
