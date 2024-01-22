import "./assets/index.css"

import {createApp} from "vue"
import {createPinia} from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

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
  IoAlertCircle,
} from "oh-vue-icons/icons/io"
import {
  ViFileTypeVue,
  ViFileTypeTypescriptOfficial,
  ViFileTypeTailwind,
  ViFileTypeDocker2,
  ViFileTypeVitest,
  ViFileTypeVite,
} from "oh-vue-icons/icons"
import {
  HiArrowRight,
  HiDotsHorizontal,
  HiSolidUserGroup,
} from "oh-vue-icons/icons/hi"

addIcons(
  IoLogoGithub,
  IoPersonCircleSharp,
  IoChatbubbleSharp,
  IoChatbubbleEllipses,
  IoSettingsSharp,
  IoSunny,
  IoMoon,
  IoLogOut,
  IoAlertCircle,
  ViFileTypeVue,
  ViFileTypeTypescriptOfficial,
  ViFileTypeTailwind,
  ViFileTypeDocker2,
  ViFileTypeVitest,
  ViFileTypeVite,
  HiArrowRight,
  HiDotsHorizontal,
  HiSolidUserGroup,
)
const app = createApp(App)

app.component("v-icon", OhVueIcon)


app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount("#app")