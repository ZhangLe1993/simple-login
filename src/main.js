import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* elementUI  cnpm i element-ui -S  */
Vue.use(ElementUI);

Vue.config.productionTip = false
/* npm install --save vue-router */
import router from './router'
router.beforeEach((to, from, next) => {
  if(to.meta.title) {

    document.title = to.meta.title;
  }

  next();
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
