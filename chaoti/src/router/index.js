import Vue from 'vue'
import Router from 'vue-router'
import common from '../utils/common'

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
const integralRankings = resolve => require.ensure([], () => resolve(require('../modules/my/integralRankings')), 'integralRankings')
// 论坛
const  forum = resolve => require.ensure([], () => resolve(require('../modules/forum/forum')), 'forum')
// 发过的主题
const  myForum = resolve => require.ensure([], () => resolve(require('../modules/forum/my-forum')), 'my-forum')
// 论坛列表
const  forumDetail = resolve => require.ensure([], () => resolve(require('../modules/forum/forumDetail')), 'forumDetail')
// 发帖
const  post = resolve => require.ensure([], () => resolve(require('../modules/forum/post')), 'post')
// 帖子详情
const  forumListDetail = resolve => require.ensure([], () => resolve(require('../modules/forum/forumListDetail')), 'forumListDetail')
// 全名体验坊 
const  nationalWorkshop = resolve => require.ensure([], () => resolve(require('../modules/forum/nationalWorkshop')), 'nationalWorkshop')
// 全名体验坊详情
const  nwDetail = resolve => require.ensure([], () => resolve(require('../modules/forum/nwDetail')), 'nwDetail')

// 热点公告
const  bulletin = resolve => require.ensure([], () => resolve(require('../modules/forum/bulletin')), 'bulletin')
// 热点详情
const  bulletinDetail = resolve => require.ensure([], () => resolve(require('../modules/forum/bulletinDetail')), 'bulletinDetail')

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
        keepAlive: true,
        title: '超积分',
        requireAuth: true
      }
    },
    {
      path: '/integralRankings',
      name: 'integralRankings',
      component: integralRankings,
      meta: {
        title: '积分排行榜'
      }
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum,
      meta: {
        title: '卡神来帮忙',
        keepAlive: true,
        requireAuth:true
      }
    },
    {
      path: '/forumDetail',
      name: 'forumDetail',
      component: forumDetail,
      meta: {
        title: '意见反馈',
        keepAlive: true
      }
    },
    {
      path: '/forumListDetail',
      name: 'forumListDetail',
      component: forumListDetail,
      meta: {
        title: '帖子详情'
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
            title: '意见反馈'
        }
    },
    {
        path: '/nationalWorkshop',
        name: 'nationalWorkshop',
        component: nationalWorkshop,
        meta: {
          title: '全名体验坊'
        },
        children: [
            {
              path: ':activityId',
              component: nwDetail,
              meta: {
                title: '活动详情'
              },
            }
        ]
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: bulletin,
      meta: {
        title: '热点公告'
      },
      children: [
          {
            path: ':activityId',
            component: bulletinDetail,
            meta: {
              title: '热点详情'
            },
          }
      ]
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
//   const account_token =  window.localStorage.getItem('account_token')
  const account_token =  common.getCookie('account_token')
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