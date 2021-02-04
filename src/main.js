import Vue from "vue";
import Vuelidate from "vuelidate";
import TreeView from "vue-json-tree-view";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/normalize-and-reset.css";
import "@/assets/css/global.css";
import { CART_STORAGE_KEY } from "./store";

Vue.use(Vuelidate);
Vue.use(TreeView);
Vue.config.productionTip = false;

const PriceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

Vue.filter("asDollarsAndCents", function(cents) {
  return PriceFormatter.format(cents / 100.0);
});

new Vue({
  router,
  store,
  CART_STORAGE_KEY,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
