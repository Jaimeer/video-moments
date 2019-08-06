import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'events',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/Events/Events.vue'),
    },
    {
      path: '/events/:eventKey',
      name: 'event',
      component: () => import('@/views/Events/Event.vue'),
      props: true,
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/views/Events/Videos/Videos.vue'),
    },
    {
      path: '/videos/:videoKey',
      name: 'video',
      component: () => import('@/views/Events/Videos/Video.vue'),
      props: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin.vue'),
    },
  ],
})
