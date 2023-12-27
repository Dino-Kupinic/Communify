import "./assets/index.css"

import {createApp} from "vue"
import {createPinia} from "pinia"

import App from "./App.vue"
import router from "./router/router"

import {OhVueIcon, addIcons} from "oh-vue-icons"
import * as Ionicons from "oh-vue-icons/icons/io"
import {IconType} from "oh-vue-icons/types/icons"

const Io: IconType[] = Object.values({...Ionicons})
addIcons(...Io)

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount("#app")