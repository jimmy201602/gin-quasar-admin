import axios from 'axios'

export function getUserListApi(data) {
    return axios({
        url: "/user/getUserList",
        method: 'post',
        data
    })
}

export function setUserAuthorityApi(data) {
    return axios({
        url: "/user/setUserAuthority",
        method: 'post',
        data: data
    })
}

export function registerApi(data) {
    return axios({
        url: "/user/register",
        method: 'post',
        data: data
    })
}

export function deleteUserApi(data) {
    return axios({
        url: "/user/deleteUser",
        method: 'delete',
        data: data
    })
}
