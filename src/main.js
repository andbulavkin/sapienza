import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./../src/assets/js/custom.js";
import "vue-select/dist/vue-select.css";
import JQuery from "jquery";
import { BootstrapVue } from "bootstrap-vue";
import axios from "axios";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import moment from "moment";
import vSelect from "vue-select";

Vue.use(BootstrapVue);
Vue.use(VueToast);

Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

// base url for api
Vue.prototype.$apiBaseUrl =
  "https://demo.iroidsolutions.com/sapienza-webapp/public/api/v1/";

// global functions
Vue.mixin({
  methods: {
    userDetails: function() {
      if (localStorage.getItem("sapienzaUser")) {
        return JSON.parse(localStorage.getItem("sapienzaUser"));
      }
    },
    accessToken: function() {
      if (localStorage.getItem("sapienzaAccessToken")) {
        return localStorage.getItem("sapienzaAccessToken");
      }
      return null;
    },
    unauthenticatedError: function() {
      this.$toast.error("Login session expire.", {
        position: "top-right",
      });
      localStorage.removeItem("sapienzaAccessToken");
      localStorage.removeItem("sapienzaUser");
      this.$router.push({ path: "/" });
    },
    format_date(value, formate) {
      if (value) {
        return moment(String(value)).format(formate);
      }
    },
  },
});

new Vue({
  router,
  JQuery,
  render: (h) => h(App),
}).$mount("#app");
