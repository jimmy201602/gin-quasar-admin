import axios from 'axios'

export function getRoleListApi(data) {
    return axios({
        url: '/authority/getAuthorityList',
        method: 'post',
        data
    })
}

export function createRoleApi(data) {
    return axios({
        url: '/authority/createAuthority',
        method: 'post',
        data
    })
}

export function updateRoleApi(data) {
    return axios({
        url: '/authority/updateAuthority',
        method: 'put',
        data
    })
}

export function copyRoleApi(data) {
    return axios({
        url: '/authority/copyAuthority',
        method: 'post',
        data
    })
}

export function deleteRoleApi(data) {
    return axios({
        url: '/authority/deleteAuthority',
        method: 'post',
        data
    })
}

export function setDataAuthorityApi(data) {
    return axios({
        url: "/authority/setDataAuthority",
        method: 'post',
        data
    })
}