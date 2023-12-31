import "./assets/index.css"

import {createApp} from "vue"
import {createPinia} from "pinia"

import App from "./App.vue"
import router from "./router/router"

import {OhVueIcon, addIcons} from "oh-vue-icons"
import * as Ionicons from "oh-vue-icons/icons/io"
import * as Heroicons from "oh-vue-icons/icons/hi"
import * as Vueicons from "oh-vue-icons/icons"
import {IconType} from "oh-vue-icons/types/icons"

const Io: IconType[] = Object.values({...Ionicons})
const Hi: IconType[] = Object.values({...Heroicons})
const Vi: IconType[] = Object.values({...Vueicons})
addIcons(...Io, ...Hi, ...Vi)

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount("#app")