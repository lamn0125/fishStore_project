import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";

import App from "./App.vue";
import router from "./router";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import { currency, date } from "./methods/filters";

import "bootstrap-icons/font/bootstrap-icons.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 2000,
});

const app = createApp(App);

app.use(VueAxios, axios);
app.component("Loading", Loading);
app.use(router);
app.config.globalProperties.$filters = { currency, date };

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize("en", {
    fields: {
      email: {
        required: "Hey! email cannot be empty",
      },
    },
  }),
});

app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
