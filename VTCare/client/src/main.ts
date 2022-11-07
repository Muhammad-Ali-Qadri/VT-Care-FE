import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bulma/css/bulma.css";
import Vue from "vue";
import { createApp } from 'vue'

//createApp(App).use(router).mount("#app");
const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

