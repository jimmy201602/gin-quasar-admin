import { Cookies, SessionStorage } from 'quasar'

export function SET_TOKEN(state, token, expires) {
    Cookies.set('gqa_token', token, { expires })
    state.token = token
}

export function SET_USERINFO(state, userInfo, expires) {
    Cookies.set('gqa_avatar', userInfo.headerImg, { expires })
    state.userInfo = userInfo
}

export function SET_ADDROUTES(state, addRoutes) {
    state.addRoutes = addRoutes
}

export function LOGOUT(state) {
    Cookies.remove('gqa_token')
    Cookies.remove('gqa_avatar')
    state.token = ''
}

export function SET_DICT(state, dictionaryMap) {
    state.dictMap = { ...state.dictMap, ...dictionaryMap }
}

export function INIT_CHIP_MENU(state, thisChip) {
    const { path, meta, name } = state.addRoutes[0]
    // 进入系统的路由就是首页
    if (thisChip.name === name) {
        state.chipMenu = []
        state.chipMenu.push({ ...thisChip })
    } else {
        // 通过跳转进入系统，把首页先添加进去
        state.chipMenu = []
        state.chipMenu.push({
            fullPath: '/' + path,
            meta,
            name: path,
        })
        state.chipMenu.push({ ...thisChip })
    }
}

export function ADD_CHIP_MENU(state, addChip) {
    state.chipMenu.push({ ...addChip })
}

export function REMOVE_CHIP(state, chip) {
    for (const [index, value] of state.chipMenu.entries()) {
        if (value.name === chip.name) {
            state.chipMenu.splice(index, 1)
            break
        }
    }
}
