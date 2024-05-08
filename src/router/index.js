import { createRouter, createWebHistory } from 'vue-router'

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

export default router
