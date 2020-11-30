import axios from 'axios'

export function fetchMenuApi() {
    return axios({
        url: '/menu/getMenu',
        method: 'post'
    })
}

export function getMenuTreeApi() {
    return axios({
        url: "/menu/getBaseMenuTree",
        method: 'post',
    })
}

export function addAuthorityApi(data) {
    return axios({
        url: "/menu/addMenuAuthority",
        method: 'post',
        data
    })
}

export function getAuthorityApi(data) {
    return axios({
        url: "/menu/getMenuAuthority",
        method: 'post',
        data
    })
}

export function getMenuListApi(data) {
    return axios({
        url: "/menu/getMenuList",
        method: 'post',
        data
    })
}

export function updateBaseMenuApi(data) {
    return axios({
        url: "/menu/updateBaseMenu",
        method: 'post',
        data
    })
}

export function addBaseMenuApi(data) {
    return axios({
        url: "/menu/addBaseMenu",
        method: 'post',
        data
    })
}

export function deleteBaseMenuApi(data) {
    return axios({
        url: "/menu/deleteBaseMenu",
        method: 'post',
        data
    })
}

export function getBaseMenuByIdApi(data) {
    return axios({
        url: "/menu/getBaseMenuById",
        method: 'post',
        data
    })
}