import axios from 'axios'

export function deleteOperationLogApi(data) {
    return axios({
        url: "/sysOperationRecord/deleteSysOperationRecord",
        method: 'delete',
        data
    })
}

export function deleteOperationLogByIdsApi(data) {
    return axios({
        url: "/sysOperationRecord/deleteSysOperationRecordByIds",
        method: 'delete',
        data
    })
}

export function getOperationLogListApi(params) {
    return axios({
        url: "/sysOperationRecord/getSysOperationRecordList",
        method: 'get',
        params
    })
}