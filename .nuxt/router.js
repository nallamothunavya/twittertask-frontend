import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d8762dae = () => interopDefault(import('..\\pages\\CreatePost.vue' /* webpackChunkName: "pages/CreatePost" */))
const _7a97d48a = () => interopDefault(import('..\\pages\\HomePage.vue' /* webpackChunkName: "pages/HomePage" */))
const _69fc687c = () => interopDefault(import('..\\pages\\PostPage.vue' /* webpackChunkName: "pages/PostPage" */))
const _02bd3f8a = () => interopDefault(import('..\\pages\\ProfilePage.vue' /* webpackChunkName: "pages/ProfilePage" */))
const _84ee26d6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/CreatePost",
    component: _d8762dae,
    name: "CreatePost"
  }, {
    path: "/HomePage",
    component: _7a97d48a,
    name: "HomePage"
  }, {
    path: "/PostPage",
    component: _69fc687c,
    name: "PostPage"
  }, {
    path: "/ProfilePage",
    component: _02bd3f8a,
    name: "ProfilePage"
  }, {
    path: "/",
    component: _84ee26d6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
