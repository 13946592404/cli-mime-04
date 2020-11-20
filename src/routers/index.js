import Cookie from 'js-cookie';
import Home from '@/views/home.vue';
import Profile from '@/views/profile/Profile.vue';
import About from '@/views/common/About.vue';
import NotFound from '@/views/common/NotFound.vue';

// cookies have field: auth
const getAuth = () => Cookie.get('auth') !== undefined;

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      public: true,
    },
    redirect: {
      name: getAuth() ? 'profile' : 'about',
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
