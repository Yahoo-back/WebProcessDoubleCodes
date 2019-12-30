import Vue from 'vue'
import 'jquery'
import './plugins/axios'
import 'amfe-flexible'
import { Toast } from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import { Slider } from 'vant';
Vue.use(Slider);
import Router from 'vue-router'

import { Icon } from 'vant';
Vue.use(Icon);
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);
import { Progress } from 'vant';
Vue.use(Progress);
import { Button } from 'vant';
Vue.use(Button);
import { Step, Steps } from 'vant';
Vue.use(Step).use(Steps);
import { Field } from 'vant';
Vue.use(Field);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Dialog } from 'vant';
Vue.use(Dialog);
import { Popup } from 'vant';
Vue.use(Popup);
import { Picker } from 'vant';
Vue.use(Picker);
import { NumberKeyboard } from 'vant';
Vue.use(NumberKeyboard);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
import { Loading } from 'vant';
Vue.use(Loading);
import { Checkbox } from 'vant';
Vue.use(Checkbox)
import qs from 'qs';
// import axios from 'axios'
// Vue.prototype.$ajax = axios
// import axios from 'axios';
// Vue.prototype.$axios = axios;
// axios.default.baseURL = '/api'
// import QS from 'qs'
// Vue.prototype.qs = QS;

Vue.use(Toast)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // Vue.prototype.qs = QS;
  // Vue.prototype.$axios = axios;
  Vue.prototype.$toast.clear()
  const CancelToken = Vue.axios.CancelToken
  store.state.source.cancel && store.state.source.cancel()
  store.commit('setSource', CancelToken.source())
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
