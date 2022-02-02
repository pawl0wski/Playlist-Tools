import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import Authorize from "../views/AuthorizeView.vue";
import AboutMe from "../views/AboutMe.vue";
import Tools from "../views/ToolsView.vue";
import CopyPlaylistView from "../views/ToolView/CopyPlaylistView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        props: true,
    },
    {
        path: "/authorize",
        name: "Authorize",
        component: Authorize,
    },
    {
        path: "/tools",
        name: "Tools",
        component: Tools,
    },
    {
        path: "/about",
        name: "AboutMe",
        component: AboutMe,
    },
    // Tools
    {
        path: "/tools/copy",
        name: "CopyPlaylistTool",
        component: CopyPlaylistView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
