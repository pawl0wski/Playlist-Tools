import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import Authorize from "../views/AuthorizeView.vue";
import AboutMe from "../views/AboutMe.vue";
import Tools from "../views/ToolsView.vue";
import CopyPlaylistView from "../views/ToolView/CopyPlaylistView.vue";
import DuplicationRemoverView from "../views/ToolView/DuplicationRemoverView.vue";
import IntroRemoverView from "../views/ToolView/IntroRemoverView.vue";
import FilterRemoverTool from "../views/ToolView/FilterRemoverView.vue";

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
    {
        path: "/tools/duplication",
        name: "DuplicationRemoverTool",
        component: DuplicationRemoverView,
    },
    {
        path: "/tools/intro",
        name: "IntroRemoverTool",
        component: IntroRemoverView,
    },
    {
        path: "/tools/filter",
        name: "FilterRemoverTool",
        component: FilterRemoverTool,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
