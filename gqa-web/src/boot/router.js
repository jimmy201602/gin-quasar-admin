import { LoadingBar, Loading, QSpinnerGears, Cookies } from 'quasar'

let routerLock = 0

LoadingBar.setDefaults({
    color: 'red',
    size: '4px',
    position: 'top'
})

function loading(type) {
    if (type === 1) {
        Loading.show({
            spinner: QSpinnerGears
        })
        LoadingBar.start()
    } else {
        Loading.hide()
        LoadingBar.stop()
    }
}

export default ({ app, router, Vue }) => {
    router.beforeEach((to, from, next) => {
        loading(1)
        if (Cookies.get('gqa_token')) {
            if (to.path === '/login/' || to.path === '/') {
                next({ path: '/dashboard' })
                loading(2)
            } else {
                if (routerLock === 0) {
                    routerLock++
                    app.store.dispatch('session/GetMenus').then(res => {
                        router.addRoutes(res)
                        next({ ...to, replace: true })
                        loading(2)
                    })
                } else {
                    next()
                }
            }
        } else {
            if (to.path === '/login') {
                next()
                loading(2)
            } else {
                next(`/login?redirect=${to.fullPath}`)
                loading(2)
            }
        }
    })
    router.afterEach(() => {
        loading(2)
    })
}