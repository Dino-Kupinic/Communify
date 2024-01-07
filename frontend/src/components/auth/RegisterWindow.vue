<script setup lang="ts">
import {useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/zod"
import * as z from "zod"

import {
  AGE_MAX_LENGTH,
  AGE_MIN_LENGTH, BIOGRAPHY_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
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
import {pb} from "@/db/pocketbase.ts"
import {User} from "@/components/model/user.dto.ts"
import {useErrorStore} from "@/stores/error.ts"
import router from "@/router/router.ts"

const formSchema = toTypedSchema(z.object({
  username: z.string()
    .min(USERNAME_MIN_LENGTH, {message: "Username must contain atleast 4 character(s)"})
    .max(USERNAME_MAX_LENGTH, {message: "Username can't contain more than 30 characters"})
    .trim(),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, {message: "Too short"})
    .max(PASSWORD_MAX_LENGTH, {message: "The maximum length is 255 characters"})
    .refine((value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.()_+])[A-Za-z\d!@#$%^&*.()_+]+$/.test(value),
      {message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*.()_+)"}),
  email: z.string()
    .max(EMAIL_MAX_LENGTH, {message: "Email can't exceed 255 characters"})
    .email(),
  age: z.number()
    .min(AGE_MIN_LENGTH, {message: "You must be atleast 18 years old"})
    .max(AGE_MAX_LENGTH, {message: "You can't be older than 150 years!"}),
  biography: z.string()
    .max(BIOGRAPHY_MAX_LENGTH, {message: "Biography can't exceed 1000 characters"})
    .optional(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const errorStore = useErrorStore()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const data: User = {
      ...values,
      biography: values?.biography ? values.biography : null,
      passwordConfirm: values.password,
      emailVisibility: false,
    }
    await pb.collection("users").create(data)
    await router.push("/auth/login")
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
    Register
  </p>
  <form @submit.prevent="onSubmit"
        class="w-full sm:w-96 space-y-6 sm:border border-slate-300 dark:border-slate-800 p-5 rounded-lg">
    <div class="flex gap-4">
      <div class="flex-initial w-3/5">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Max Mustermann" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
      </div>
      <div class="flex-initial w-2/5">
        <FormField v-slot="{ componentField }" name="age">
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
      </div>
    </div>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>E-Mail</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="biography">
      <FormItem>
        <FormLabel>Biography (Optional)</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full">
      Create account
    </Button>
  </form>
  <div class="w-full mt-4 sm:w-96 space-y-3 text-center">
    <p class="text-base">
      Already have an account?
      <RouterLink to="/auth/login">
        <span class="text-primary">
          Login<GoogleIcon name="North_East" font-size="base" line-height="1.5"/>
        </span>
      </RouterLink>
    </p>
  </div>
</template>
