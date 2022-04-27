import axios from 'axios'
//这里引用了element的loading全屏加载
import { Loading, Message } from "element-ui";
axios.defaults.withCredentials = true
const service = axios.create({
    // baseURL: '/devapi',
    timeout: 30000 // 设置请求超时时间
})
let loading = "";
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理
        if (!(config.headers['Content-Type'])) {
            // loading = Loading.service({
            //     lock: true,
            //     text: "加载中...",
            //     spinner: "el-icon-loading",
            //     background: "rgba(255,255,255,0.7)",
            //     customClass: "request-loading",
            // });
            if (config.method == 'post' && config.type == 'upload') {
                config.headers['Content-Type'] = 'multipart/form-data'
            } else if (config.method == 'post' && config.type == 'download') {
                // 导出csv文件
                config.headers['Content-Type'] = 'application/json;charset=UTF-8'
                config.responseType = 'blob'
            } else if (config.method == 'post') {
                    // config.headers['Content-Type'] = 'multipart/form-data'
                    config.headers['Content-Type'] =
                        'application/json;charset=UTF-8'
                    for (var key in config.data) {
                        if (config.data[key] === '') {
                            delete config.data[key]
                        }
                    }
                    config.data = JSON.stringify(config.data)
                } else {
                    config.headers['Content-Type'] =
                        'application/x-www-form-urlencoded;charset=UTF-8'
                    config.data = JSON.stringify(config.data)
                }
        }

        return config
    },
    (error) => {
        // loading.close();
        // 发送失败
        console.log(666, error)
        return Promise.resolve(error)
    }
)

// 响应拦截器
service.interceptors.response.use(

    (response) => {
       
        const dataAxios = response.data
            // 这个状态码是和后端约定的
            if (dataAxios.code == 500) {
                Message.closeAll();
                Message({
                    message: dataAxios.msg,
                    type: 'error'
                });
            }
            // loading.close();
            return dataAxios

    },
    error => {
        // loading.close();

        return Promise.reject(error)
    }
)

export default service

