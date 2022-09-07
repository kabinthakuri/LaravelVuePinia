import './bootstrap';
import { createApp } from "vue";
import post from "./components/Post.vue";
import { createPinia } from "pinia";

const app = createApp(post).use(createPinia());
app.mount("#app");
