import {defineStore, storeToRefs} from "pinia"
import {ref} from "vue"
import {AuthModel} from "pocketbase"
import {pb} from "@/db/pocketbase.ts"
import {useErrorStore} from "@/stores/errorStore.ts"
import {User} from "@/model/user.dto.ts"

export const useUserStore = defineStore("message", () => {
  const users = ref<User[]>([])
  const currentUser = ref<AuthModel>()
  const isLoggedIn = ref<boolean>(pb.authStore.isValid)

  function getUserToken(): string {
    return pb.authStore.token
  }

  async function fetchUsers() {
    try {
      users.value = await pb.collection("users").getFullList()
      await pb
        .collection("users")
        .subscribe("*", async ({action, record}) => {
          switch (action) {
            case "create":
              const newUser = await pb.collection("users").getOne(record.id)
              record.expand = {newUser}
              const user: User = {
                id: record.id,
                username: record.username,
                email: record.email,
                emailVisibility: record.emailVisibility,
                password: record.password,
                passwordConfirm: record.passwordConfirm,
                age: record.age,
                biography: record.biography || null
              }
              users.value.push(user)
              break
          }
        })
    } catch (err) {
      handleError(err)
    }
  }

  function handleError(err: any) {
    console.error(err)
    const {errorMessage} = storeToRefs(useErrorStore())
    errorMessage.value = `${err}`
  }

  return {currentUser, getUserToken, fetchUsers, users, isLoggedIn}
}, {
  persist: true,
})