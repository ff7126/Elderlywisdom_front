import Home from '../views/common/Home.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/Login.vue'),
        meta: {auth: false}
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/login/Register.vue'),
        meta: {auth: false}
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: "",
                redirect: "/login",
                meta: {auth: false}
            },
            {
                // 老人列表
                path: '/oldMan',
                component: () => import('../views/page/old/oldMan.vue'),
                meta: { auth: true,title: '老人列表'}
            },
            {

                path: '/oldMenage',
                component: () => import('../views/page/old/AgeDistribution.vue'),
                meta: { auth: true,title: '老人年龄段分布'}
            },
            {

                path: '/workMenage',
                component: () => import('../views/page/work/AgeDistribution.vue'),
                meta: { auth: true,title: '老人年龄段分布'}
            },
            {
                //查看管理员信息
                path:'/managerInfo',
                component:() =>import('../views/page/manager/managerInfo.vue'),
                meta: {auth: true, title: '查看管理员信息' }

            },
            {
                //修改密码
                path:'/changePwd',
                component:() =>import('../views/login/changePwd.vue'),
                meta: { auth: true,title: '修改密码'}

            },
            {
                path:'/emotion',
                component:() =>import('../views/page/monitor/emotion.vue'),
                meta: { auth: true,title: '实时查看情绪识别'}
            },
            {
                path:'/abnormal',
                component:() =>import('../views/page/monitor/abnormal.vue'),
                meta: { auth: true,title: '实时查看异常行为'}
            },
            {
                path:'/monitor',
                component:() =>import('../views/page/monitor/monitor.vue'),
                meta: { auth: true,title: '实时查看监控'}
            },
            {
                path:'/falldown',
                component:() =>import('../views/page/monitor/falldown.vue'),
                meta: { auth: true,title: '实时查看摔倒检测'}
            },
            {
                path:'/intrusion',
                component:() =>import('../views/page/monitor/intrusion.vue'),
                meta: { auth: true,title: '实时查看入侵检测'}
            },

            {
                //查看工作人员列表
                path:'/workers',
                component:() =>import('../views/page/work/workers.vue'),
                meta: { auth: true,title: '查看工作人员列表'}
            },
            {
                //交互信息
                path:'/interactions',
                component:() =>import('../views/page/record/interactions.vue'),
                meta: {auth: true, title: '交互信息' }
            },
            {
                //异常信息
                path:'/abnormal1',
                component:() =>import('../views/page/record/abnormal.vue'),
                meta: {auth: true, title: '异常信息' }
            },
            {

                path:'/emotion1',
                component:() =>import('../views/page/record/emotion.vue'),
                meta: {auth: true, title: '情感信息' }
            }
        ]
    }
]

export default routes