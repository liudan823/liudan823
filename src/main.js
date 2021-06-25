import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import apis from './http/apis'
Vue.config.productionTip = false
Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
};
Vue.use(ElementUI)
Vue.prototype.$apis = apis
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
