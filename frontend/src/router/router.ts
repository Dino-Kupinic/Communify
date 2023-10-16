import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteMeta,
  type RouteRecordRaw,
} from "vue-router"

import HomeView from "@/views/HomeView.vue"
import NotFoundView from "@/views/NotFoundView.vue"
import NoFooterLayout from "@/layouts/NoFooterLayout.vue"
import AuthenticationView from "@/views/AuthenticationView.vue"
import RegisterWindow from "@/components/auth/RegisterWindow.vue"
import LoginWindow from "@/components/auth/LoginWindow.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import UserHomeView from "@/views/UserHomeView.vue"
import UserProfileView from "@/views/UserProfileView.vue"
import ChatRoomsView from "@/views/ChatRoomsView.vue"

const routes: Array<RouteRecordRaw> & {
  meta?: RouteMeta
} = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
    ],
  },
  {
    path: "/",
    component: NoFooterLayout,
    children: [
      {
        path: "/chats",
        name: "chats",
        component: ChatRoomsView,
        meta: {
          requiresAuth: true,
        },
        // children: [
        //   {
        //     path: ":room_name",
        //     name: "room",
        //     component: RoomView,
        //     meta: {
        //       requiresAuth: true,
        //     },
        //   },
        // ],
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/user/:username",
        name: "User",
        component: UserHomeView,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "profile",
            component: UserProfileView,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/",
    component: NoFooterLayout,
    children: [
      {
        path: "/auth",
        name: "authentication",
        component: AuthenticationView,
        redirect: (to: RouteLocationNormalized) => ({
          path: "/auth/login",
        }),
        children: [
          {
            path: "login",
            name: "login",
            component: LoginWindow,
          },
          {
            path: "register",
            name: "register",
            component: RegisterWindow,
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "not found",
        component: NotFoundView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const isLoggedIn = localStorage.getItem("auth_token") !== ""
  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: "/auth/login",
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
