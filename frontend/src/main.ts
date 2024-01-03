import "./assets/index.css"

import {createApp} from "vue"
import {createPinia} from "pinia"

import App from "./App.vue"
import router from "./router/router"

import {OhVueIcon, addIcons} from "oh-vue-icons"
import {
  IoLogoGithub,
  IoPersonCircleSharp,
  IoChatbubbleSharp,
  IoChatbubbleEllipses,
  IoSettingsSharp,
  IoSunny,
  IoMoon,
  IoLogOut,
} from "oh-vue-icons/icons/io"
import {
  ViFileTypeVue,
  ViFileTypeTypescriptOfficial,
  ViFileTypeDocker2,
  ViFileTypeVitest,
  ViFileTypeVite,
} from "oh-vue-icons/icons"
import {HiArrowRight} from "oh-vue-icons/icons/hi"

addIcons(
  IoLogoGithub,
  IoPersonCircleSharp,
  IoChatbubbleSharp,
  IoChatbubbleEllipses,
  IoSettingsSharp,
  IoSunny,
  IoMoon,
  IoLogOut,
  ViFileTypeVue,
  ViFileTypeTypescriptOfficial,
  ViFileTypeDocker2,
  ViFileTypeVitest,
  ViFileTypeVite,
  HiArrowRight,
)
const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount("#app")