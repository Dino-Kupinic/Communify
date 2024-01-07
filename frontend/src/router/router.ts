import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteMeta, Router,
  type RouteRecordRaw,
} from "vue-router"
import {storeToRefs} from "pinia"
import {useUserStore} from "@/stores/user.ts"

const routes: Array<RouteRecordRaw> & {
  meta?: RouteMeta
} = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
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
    component: () => import("@/layouts/NoFooterLayout.vue"),
    children: [
      {
        path: "/chats",
        name: "chats",
        component: () => import("@/views/ChatRoomsView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
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
    component: () => import("@/layouts/DefaultLayout.vue"),
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
    component: () => import("@/layouts/DefaultLayout.vue"),
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
  const {currentUser} = storeToRefs(useUserStore())
  if (to.meta.requiresAuth && currentUser.value == null) {
    return {
      path: "/auth/login",
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router