import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue';
import PostDetails from '../views/PostDetails.vue';
import SearchPage from '../views/SearchPage.vue';
import UserProfile from '@/views/UserProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },

  {
    path: '/post/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  },

  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },

  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
