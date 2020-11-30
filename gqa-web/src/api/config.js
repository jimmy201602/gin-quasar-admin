import axios from 'axios'

export function getSystemConfigApi() {
    return axios({
        url: "/system/getSystemConfig",
        method: "post",
    });
};

export function setSystemConfigApi(data) {
    return axios({
        url: "/system/setSystemConfig",
        method: "post",
        data,
    });
};
