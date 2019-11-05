// 这个文件是配置页面路由
import Index from '@/views/index'
import Login from '@/components/login'

export default [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        components: {
            default: Login
        },
        meta: { auth: false } // 用于保存是否需要进行登陆验证
    },
    {
        path: '/index',
        name: 'index',
        components: {
            default: Index
        },
        meta: { auth: true } // 用于保存是否需要进行登陆验证
    }
]