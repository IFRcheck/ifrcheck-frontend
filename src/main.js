require("@/assets/sass/main.scss");
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import "bootstrap";

const app = createApp(App);
app.use(store);
app.mount("#app");
