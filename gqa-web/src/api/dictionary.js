import axios from 'axios'

export function getDictListApi(params) {
    return axios({
        url: "/sysDictionary/getSysDictionaryList",
        method: 'get',
        params
    })
}

export function createDictApi(data) {
    return axios({
        url: "/sysDictionary/createSysDictionary",
        method: 'post',
        data
    })
}

export function deleteDictApi(data) {
    return axios({
        url: "/sysDictionary/deleteSysDictionary",
        method: 'delete',
        data
    })
}

export function updateDictApi(data) {
    return axios({
        url: "/sysDictionary/updateSysDictionary",
        method: 'put',
        data
    })
}

export function getDictApi(params) {
    return axios({
        url: "/sysDictionary/findSysDictionary",
        method: 'get',
        params
    })
}

export function createDictDetailApi(data) {
    return axios({
        url: "/sysDictionaryDetail/createSysDictionaryDetail",
        method: 'post',
        data
    })
}

export function deleteDictDetailApi(data) {
    return axios({
        url: "/sysDictionaryDetail/deleteSysDictionaryDetail",
        method: 'delete',
        data
    })
}

export function updateDictDetailApi(data) {
    return axios({
        url: "/sysDictionaryDetail/updateSysDictionaryDetail",
        method: 'put',
        data
    })
}

export function getDictDetailApi(params) {
    return axios({
        url: "/sysDictionaryDetail/findSysDictionaryDetail",
        method: 'get',
        params
    })
}

export function getDictDetailListApi(params) {
    return axios({
        url: "/sysDictionaryDetail/getSysDictionaryDetailList",
        method: 'get',
        params
    })
}