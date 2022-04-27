import axios from 'axios';
// 环境的切换


/**
* 封装get方法
* @param url
* @param api
* @param params
* @returns {Promise}
*/
export function get(url, api, params) {
    return axios({
        method: 'get',
        url: api,
        baseURL: url,
        headers: {
            "Content-Type": "application/json:charset=UTF-8"
        },
        params: params
    })
        .then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

/**
 * 封装postJson方法
 * @param url
 * @param api
 * @param data
 *  @param params
 * @returns {Promise}
 */
//@于志程
export function postJson(url, api, data, params) {
    return axios({
        method: 'post',
        url: api,
        baseURL: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: data,
        params: params
    })
        .then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}