import axios from 'axios'

// 获取验证码
export function getCodeApi() {
    return axios({
        url: '/base/captcha',
        method: 'post'
    })
}

export function loginApi(username, password, captcha, captchaId) {
    const data = {
        username,
        password,
        captcha,
        captchaId
    }
    return axios({
        url: '/base/login',
        method: 'post',
        data
    })
}

export function logoutApi() {
    return axios({
        url: "/jwt/jsonInBlacklist",
        method: 'post',
    })
}
