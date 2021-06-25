import axios from 'axios'
import {
    Message
} from 'element-ui'
import store from '../store'
import router from '../router'
//开发
// const baseURL = 'http://localhost:8889/api/private/v1/'
//测试
// const baseURL = 'http://localhost:8889/api/private/v1/'
//线上
// const baseURL = 'http://localhost:8889/api/private/v1/'
// axios.defaults.headers.common['token'] = 'abc';
// axios.defaults.baseURL = baseURL
let baseURL;
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://localhost:8889/api/private/v1/';
} else if (process.env.NODE_ENV == 'debug') {
    baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
    baseURL = 'https://www.production.com';
}

const instanceA = axios.create({
    baseURL,
    // timeout: 3000
})

// 添加请求拦截器
instanceA.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = store.state.token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceA.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    if (res.status >= 200 && res.status < 300 || res.status === 304) {
        if (res.data.meta.status === 200||res.data.meta.status===201) {
            return res.data
        } else {
            Message({
                type: 'error',
                message: res.data.meta.msg
            })
            if (res.data.meta.msg === '无效token') {
                router.replace({
                    name: 'Login'
                })
            }
            return Promise.reject(res.data.meta.msg)
        }
    } else {
        Message({
            type: 'error',
            message: res.statusText
        })
        return Promise.reject(res.statusText)
    }
}, function (error) {
    // 对响应错误做点什么
    Message({
        type: 'error',
        message: error
    })
    return Promise.reject(error);
});

function http(url, data = {}, method = "POST", params = {}) {
    return instanceA({
        url,
        data,
        params,
        method
    })
}

const instanceB = axios.create({
    baseURL: 'http://www.baidu.com'
})
export default http;