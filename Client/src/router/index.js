import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ModDashboard from '../views/ModDashboard.vue'
import UserDashboard from '../views/UserDashboard.vue'
import Timers from '../views/Timers.vue'
import TodoList from '../views/TodoList.vue'
import AuthView from '../views/AuthView.vue'
import Layouts from '../views/LayoutView.vue'
import SettingsView from '../views/SettingsView.vue'
import Accordion from '../views/Accordion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/mod',
      name: 'modDashboard',
      component: ModDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'userDashboard',
      component: UserDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/timers',
      name: 'timers',
      component: Timers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: Layouts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/acc',
      name: 'acc',
      component: Accordion
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
              removeListener()
              resolve(user)
          },
          reject
      )
  })
}

router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
      if (await getCurrentUser()) {
        console.log("successfully gathered user");
          next()
      } else {
          alert("You do not have access to this page!\nPlease login to continue!")
          next("/auth")
      }
  } else {
      next()
  }
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router

