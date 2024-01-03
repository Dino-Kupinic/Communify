<script setup lang="ts">
import {useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/zod"
import * as z from "zod"

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/components/model/type_constants.ts"
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

const formSchema = toTypedSchema(z.object({
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, {message: "Username must contain atleast 4 character(s)"})
    .max(USERNAME_MAX_LENGTH, {message: "Username can't contain more than 30 characters"})
    .trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, {message: "Too short"})
    .max(PASSWORD_MAX_LENGTH, {message: "The maximum length is 255 characters"})
    .refine((value: string) => !/\s/.test(value), {message: "Password cannot contain whitespaces"}),
}))

const form = useForm({
  validationSchema: formSchema,
})

type LoginForm = z.infer<typeof formSchema>
const onSubmit = form.handleSubmit((values: LoginForm) => {
  console.log("Form submitted!", values)
})
</script>

<template>
  <form @submit="onSubmit"
        class="w-full sm:w-1/2 lg:1/3 xl:w-1/4 space-y-6 sm:border border-slate-300 dark:border-slate-800 p-5 rounded-lg">
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
  <div class="w-full mt-4 sm:w-1/2 lg:1/3 xl:w-1/4 space-y-3 text-center">
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
      <RouterLink to="/auth/register">
        <span class="text-primary">
          Reset it<GoogleIcon name="North_East" font-size="base" line-height="1.5"/>
        </span>
      </RouterLink>
    </p>
  </div>
</template>
