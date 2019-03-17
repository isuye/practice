import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  /* eslint-disable no-unused-vars */
  //Style,
  Scroll
} from 'cube-ui'

Vue.use(Scroll)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
