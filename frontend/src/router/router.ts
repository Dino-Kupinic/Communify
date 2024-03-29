import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteMeta, Router,
  type RouteRecordRaw,
} from "vue-router"
import {useUserStore} from "@/stores/userStore.ts"

const DefaultLayout = () => import("@/layouts/DefaultLayout.vue")
const NoFooterLayout = () => import("@/layouts/NoFooterLayout.vue")
const NoFooterNavbarLayout = () => import("@/layouts/NoFooterNavbarLayout.vue")

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
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/",
    component: NoFooterLayout,
    children: [
      {
        path: "/rooms",
        name: "rooms",
        component: () => import("@/views/RoomsView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: NoFooterNavbarLayout,
    children: [
      {
        path: "/chats/:room",
        name: "chatroom",
        component: () => import("@/views/ChatView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/user/:username/profile",
        name: "User",
        component: () => import("@/views/UserProfileView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/auth",
        name: "authentication",
        component: () => import("@/views/AuthenticationView.vue"),
        redirect: (to: RouteLocationNormalized) => ({
          path: "/auth/login",
        }),
        children: [
          {
            path: "login",
            name: "login",
            component: () => import( "@/components/auth/LoginWindow.vue"),
          },
          {
            path: "register",
            name: "register",
            component: () => import("@/components/auth/RegisterWindow.vue"),
          },
          {
            path: "recovery",
            name: "recovery",
            component: () => import("@/components/auth/RecoveryWindow.vue"),
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
        component: () => import("@/views/NotFoundView.vue"),
      },
    ],
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn)
    return {
      path: "/auth/login",
      query: {
        redirect: to.fullPath,
      },
    }

  if (userStore.isLoggedIn && to.path.includes("auth"))
    return {
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    }
})

export default router