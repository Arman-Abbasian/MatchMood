import { createRouter, createWebHistory } from 'vue-router'
import Auth from './pages/guest/Auth.vue'
import { supabase } from './supabaseClient'

const Home = () => import('@/pages/Home.vue')
const User = () => import('@/pages/user/User.vue')
const Profile = () => import('@/pages/user/Profile.vue')
const AddReminder = () => import('@/pages/user/AddReminder.vue')
const ReminderList = () => import('@/pages/user/ReminderList.vue')
const ReminderDetail = () => import('@/pages/user/ReminderDetail.vue')
const Login = () => import('@/pages/guest/Login.vue')
const Signup = () => import('@/pages/guest/Signup.vue')
const Statistics = () => import('@/pages/user/Statistics.vue')

const routes = [
  { path: '/', component: Home },
  {
    path: '/user',
    component: User,
    async beforeEnter() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        return '/auth/login'
      }
      return true
    },
    children: [
      { path: '', component: Statistics },
      { path: 'profile', component: Profile },
      { path: 'addReminder', component: AddReminder },
      { path: 'reminderList', component: ReminderList },
      { path: ':reminderId', component: ReminderDetail },
    ],
  },
  {
    path: '/auth',
    component: Auth,

    async beforeEnter() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        return true
      }
      return '/user'
    },
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
