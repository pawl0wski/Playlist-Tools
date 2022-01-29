import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomeView.vue'
import Authorize from '../views/AuthorizeView.vue'
import Tools from '../views/ToolsView.vue'
import PlaylistsSelector from '../views/PlaylistsSelector.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: Authorize
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
  },
  {
    path: '/tools/playlists',
    name: 'PlaylistsSelector',
    component: PlaylistsSelector,
    props: {
      onlyMyPlaylists: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
