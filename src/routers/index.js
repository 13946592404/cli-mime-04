import Home from '@/views/home.vue';
import Profile from '@/views/profile/Profile.vue';
import About from '@/views/common/About.vue';
import NotFound from '@/views/common/NotFound.vue';
import getCookie from '../plugins/getCookie';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      public: true,
    },
    redirect: {
      name: getCookie.hasAuth() ? 'profile' : 'about',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      public: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      public: true,
    },
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      public: true,
    },
  },
];
