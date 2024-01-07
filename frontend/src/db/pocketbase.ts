import PocketBase from 'pocketbase';
import {useUserStore} from "@/stores/user.ts"

const POCKETBASE_URL = "http://localhost:8090"

export const pb = new PocketBase(POCKETBASE_URL)

const userStore = useUserStore()
userStore.currentUser = pb.authStore.model

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth)
  userStore.currentUser = pb.authStore.model
})