import axios from 'axios'

export function updateCasbinApi(data) {
    return axios({
        url: "/casbin/updateCasbin",
        method: 'post',
        data
    })
}

export function getPolicyPathByAuthorityIdApi(data) {
    return axios({
        url: "/casbin/getPolicyPathByAuthorityId",
        method: 'post',
        data
    })
}