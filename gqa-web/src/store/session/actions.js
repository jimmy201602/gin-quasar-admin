import { loginApi, logoutApi } from "src/api/login"
import { fetchMenuApi } from "src/api/menu"
import { getDictApi } from "src/api/dictionary"
import { Cookies } from 'quasar'
import { RouterGenerator } from 'src/utils/RouterGenerator'

export function Login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password
    const captcha = userInfo.captcha
    const captchaId = userInfo.captchaId
    return new Promise((resolve, reject) => {
        loginApi(username, password, captcha, captchaId).then(res => {
            if (res.code === 0) {
                const token = res.data.token
                const userInfo = res.data.user
                const expires = '24h'
                commit('SET_TOKEN', token, expires)
                commit('SET_USERINFO', userInfo, expires)
            }
            resolve(res.code)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetMenus({ commit, state }) {
    const addRoutes = [{
        path: '/',
        component: () => import('layouts/MainLayout/MainLayout.vue'),
        children: [
            { path: '', redirect: { name: 'dashboard' } }
        ]
    }]
    return new Promise((resolve, reject) => {
        fetchMenuApi().then(res => {
            const addRoutesItem = RouterGenerator(res.data.menus)
            addRoutes[0].children = addRoutes[0].children.concat(addRoutesItem)
            addRoutes.push({
                path: '*',
                component: () => import('pages/Error404.vue')
            })
            commit('SET_ADDROUTES', addRoutesItem)
            resolve(addRoutes)
        }).catch(error => {
            reject(error)
        })
    })
}

export function LogOut({ commit }) {
    return new Promise((resolve, reject) => {
        logoutApi().then(res => {
            commit('LOGOUT')
            resolve(res.code)
        }).catch(error => {
            reject(error)
        })
    })

}

export async function GetDict({ commit, state }, type) {
    if (state.dictMap[type]) {
        return state.dictMap[type]
    } else {
        return new Promise((resolve, reject) => {
            getDictApi({ type }).then(res => {
                if (res.code === 0) {
                    const dictionaryMap = {}
                    const dict = []
                    res.data.resysDictionary.sysDictionaryDetails && res.data.resysDictionary.sysDictionaryDetails.map(item => {
                        dict.push({
                            label: item.label,
                            value: item.value
                        })
                    })
                    dictionaryMap[res.data.resysDictionary.type] = dict
                    commit("SET_DICT", dictionaryMap)
                    resolve(state.dictMap[type])
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export function InitChipMenu({ commit, state }, route) {
    const thisChip = {
        fullPath: route.fullPath,
        meta: route.meta,
        name: route.name,
    }
    commit("INIT_CHIP_MENU", thisChip)
}

export function AddChipMenu({ commit, state }, route) {
    for (const chip of state.chipMenu) {
        if (chip.name === route.name) {
            return false
        }
    }
    const addChip = {
        fullPath: route.fullPath,
        meta: route.meta,
        name: route.name,
    }
    commit("ADD_CHIP_MENU", addChip)
}

export function RemoveChip({ commit }, chip) {
    commit("REMOVE_CHIP", chip)
}
