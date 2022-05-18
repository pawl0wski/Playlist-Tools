import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "sweetalert2/src/sweetalert2.scss";

document.title = "Playlist tools";

const app = createApp(App);

app.use(router);

app.mount("#app");
