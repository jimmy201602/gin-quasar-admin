
const routes = [
    {
        path: '/login',
        component: () => import('layouts/LoginLayout.vue'),
        children: [
            { path: '', name: 'user-login', component: () => import('pages/Login/Login.vue') },
        ]
    },

    // // Always leave this as last one,
    // // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
