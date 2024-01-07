<script setup lang="ts">
import {useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import {pb} from "@/db/pocketbase.ts"
import {useErrorStore} from "@/stores/error.ts"
import router from "@/router/router.ts"

const formSchema = toTypedSchema(z.object({
  username: z
    .string()
    .trim(),
  password: z
    .string()
    .trim(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const errorStore = useErrorStore()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await pb.collection("users").authWithPassword(
      values.username,
      values.password,
    )
    if (pb.authStore.isValid)
      await router.push("/chats")
  } catch (error: any) {
    console.error(error)
    errorStore.errorMessage = `${error}`
    if (error.response && error.response.data) {
      for (const key in error.response.data) {
        if (error.response.data.hasOwnProperty(key)) {
          errorStore.hint = `${error.response.data[key].message}`
        }
      }
    }
  }
})
</script>

<template>
  <p class="text-4xl font-bold text-primary mb-5">
    Login
  </p>
  <form @submit.prevent="onSubmit"
        class="w-full sm:w-96 space-y-6 sm:border border-slate-300 dark:border-slate-800 p-5 rounded-lg">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Max Mustermann" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full">
      Login
    </Button>
  </form>
  <div class="w-full mt-4 sm:w-96 space-y-3 text-center">
    <p class="text-base">
      New to Communify?
      <RouterLink to="/auth/register">
        <span class="text-primary">
          Register Now<GoogleIcon name="North_East" font-size="base" line-height="1.5"/>
        </span>
      </RouterLink>
    </p>
    <p class="text-base">
      Forgot your password?
      <RouterLink to="/auth/recovery">
        <span class="text-primary">
          Reset it<GoogleIcon name="North_East" font-size="base" line-height="1.5"/>
        </span>
      </RouterLink>
    </p>
  </div>
</template>
