import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteMeta, Router,
  type RouteRecordRaw,
} from "vue-router"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import HomeView from "@/views/HomeView.vue"
import NoFooterLayout from "@/layouts/NoFooterLayout.vue"
import NotFoundView from "@/views/NotFoundView.vue"
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
        component: UserProfileView,
        meta: {
          requiresAuth: true,
        }
      },
    ],
  },
  // {
  //   path: "/",
  //   component: NoFooterLayout,
  //   children: [
  //     {
  //       path: "/auth",
  //       name: "authentication",
  //       component: AuthenticationView,
  //       redirect: (to: RouteLocationNormalized) => ({
  //         path: "/auth/login",
  //       }),
  //       children: [
  //         {
  //           path: "login",
  //           name: "login",
  //           component: LoginWindow,
  //         },
  //         {
  //           path: "register",
  //           name: "register",
  //           component: RegisterWindow,
  //         },
  //         {
  //           path: "recovery",
  //           name: "recovery",
  //           component: ResetPassword,
  //         },
  //       ],
  //     },
  //   ],
  // },
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

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// TODO: refactor to cookie
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
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