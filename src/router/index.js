import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //  登录页
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      //  页面架子
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          //  文章管理
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          //  频道管理
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          //  个人信息
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          //  更换头像
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          //  重置密码
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 => 默认直接放行
// 1. undefined / true：直接放行
// 2. false：返回 from 页面
// 3. 具体路径 / 路径对象：拦截到对应地址
router.beforeEach((to) => {
  // 没有 token 且访问的是非登录页，拦截到登录
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
