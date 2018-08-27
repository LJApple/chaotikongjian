import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
const login = resolve => require.ensure([], () => resolve(require('../modules/login/login')), 'login')
// 任务
const tasks = resolve => require.ensure([], () => resolve(require('../modules/tasks/tasks')), 'tasks')
// 任务详情
const tasksDetail = resolve => require.ensure([], () => resolve(require('../modules/tasks/tasks-detail')), 'tasks-detail')
// 我的
const my = resolve => require.ensure([], () => resolve(require('../modules/my/my')), 'my')
// 设置
const setting = resolve => require.ensure([], () => resolve(require('../modules/my/setting')), 'setting')
// 论坛
const  forum = resolve => require.ensure([], () => resolve(require('../modules/forum/forum')), 'forum')
// 发过的主题
const  myForum = resolve => require.ensure([], () => resolve(require('../modules/forum/my-forum')), 'my-forum ')
// 论坛详情
const  forumDetail = resolve => require.ensure([], () => resolve(require('../modules/forum/forumDetail')), 'forumDetail')
// 发帖
const  post = resolve => require.ensure([], () => resolve(require('../modules/forum/post')), 'post')

const router = new Router({
  mode : 'history',
  base: '/t2/',  //添加的地方
  routes: [
    {
      path: '/',
      redirect: 'tasks'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component : tasks,
      meta: { keepAlive: true, title: '领取任务', requireAuth:true }//当前的.vue文件需要缓存
    },
    {
      path: '/tasksDetail/:taskId',
      name: 'tasksDetail',
      component: tasksDetail,
      meta: {
        title: '任务详情'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        title: '我的',
        requireAuth: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum,
      meta: {
        title: '唠嗑儿',
        keepAlive: true,
        requireAuth:true
      }
    },
    {
      path: '/forumDetail',
      name: 'forumDetail',
      component: forumDetail,
      meta: {
        title: '模块1',
        keepAlive: true
      }
    },
    {
      path: '/myForum',
      name: 'myForum',
      component: myForum,
      meta: {
        title: '发过的主题'
      }
    },
    {
      path: '/post',
      name: 'post',
      component: post,
      meta: {
        title: '发布帖子'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const account_token =   window.sessionStorage.getItem('account_token')
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
      if (account_token) { // 判断当前的token是否存在
          next()
      } else {
          next({
          path: '/login',
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
     }
  }
  else {
      next();
  }
})

export default router