import axios from 'axios'

export function getAllApi(data) {
    return axios({
        url: "/api/getAllApis",
        method: 'post',
        data
    })
}

export function getApiListApi(data) {
    return axios({
        url: "/api/getApiList",
        method: 'post',
        data
    })
}

export function getApiByIdApi(data) {
    return axios({
        url: "/api/getApiById",
        method: 'post',
        data
    })
}

export function createApi(data) {
    return axios({
        url: "/api/createApi",
        method: 'post',
        data
    })
}

export function updateApi(data) {
    return axios({
        url: "/api/updateApi",
        method: 'post',
        data
    })
}

export function deleteApi(data) {
    return axios({
        url: "/api/deleteApi",
        method: 'post',
        data
    })
}