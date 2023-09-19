import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharTableView from "../views/CharTableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/table/:startIndex(\\d+)?',
      name: 'table',
      component: CharTableView,
      props: true
    }
  ]
})


router.beforeEach((to, from, next) => {
  console.log(
    `%cnavigating%c : %c${from.path}%c => %c${to.path}%c`,
    'border-radius: 2px; background-color: #50b996; color: black; padding: 0 2px 0 2px;',
    '',
    'border-radius: 2px; background-color: #7399ab; color: black; padding: 0 2px 0 2px;',
    '',
    'border-radius: 2px; background-color: #21b9ff; color: black; padding: 0 2px 0 2px;'
    );
  next();
})

export default router
