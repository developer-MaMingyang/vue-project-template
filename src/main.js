// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'normalize.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store';
import router from './router';


Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  window.scrollTo(0, 0); // 每次进入新view后，返回顶部
});

/* eslint-disable no-new */
new Vue({
  el: '#pc',
  store,
  router,
  components: {
    PC: () => import('@/PC'),
  },
  template: '<PC/>',
});
