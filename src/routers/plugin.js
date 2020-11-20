import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/routers/index';
import getCookie from '../plugins/getCookie';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.public) {
    return next();
  }

  // private
  if (await getCookie.hasAuth()) {
    return next('404');
  }

  return next();
});

export default router;
