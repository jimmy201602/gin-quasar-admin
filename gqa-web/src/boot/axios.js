import axios from 'axios'
import { Notify, Cookies, SessionStorage } from 'quasar'

export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 15000

    // 请求拦截
    axios.interceptors.request.use(res => {
        const token = Cookies.get('gqa_token')
        const userId = app.store.getters['session/userInfo'].ID
        res.headers = {
            'Content-Type': 'application/json',
            'x-token': token,
            'x-user-id': userId
        }
        return res
    }, error => {
        Notify.create({
            type: 'negative',
            message: error,
        })
        return Promise.reject(error)
    })

    // 响应拦截
    axios.interceptors.response.use(response => {
        if (response.headers["new-token"]) {
            app.store.commit('session/SET_TOKEN', response.headers["new-token"], '24h')
        }
        if (response.data.code === 0 || response.headers.success === "true") {
            return response.data
        } else {
            Notify.create({
                type: 'negative',
                message: response.data.msg || decodeURI(response.headers.msg || 'axios响应错误！'),

            })
            if (response.data.data && response.data.data.reload) {
                Cookies.remove('gqa_token')
                Cookies.remove('gqa_avatar')
                router.push({ path: '/login' })
            }
            return response.data.msg ? response.data : response
        }
    }, error => {
        if (error + '' === 'Error: Network Error') {
            router.push({ path: '/503' })
        } else if (error.response && error.response.status === 404) {
            Notify.create({
                type: 'negative',
                message: '请求地址不存在 [' + error.response.request.responseURL + ']',
            })
        }
        return Promise.reject(error)
    })
}
