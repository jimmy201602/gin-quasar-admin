import axios from 'axios'

export function createTempApi(data) {
    return axios({
        url: "/autoCode/createTemp",
        method: 'post',
        data,
        responseType: 'blob'
    })
}

export function getDBApi() {
    return axios({
        url: "/autoCode/getDB",
        method: 'get',
    })
}

export function getTableApi(params) {
    return axios({
        url: "/autoCode/getTables",
        method: 'get',
        params,
    })
}

export function getColumnApi(params) {
    return axios({
        url: "/autoCode/getColumn",
        method: 'get',
        params,
    })
}