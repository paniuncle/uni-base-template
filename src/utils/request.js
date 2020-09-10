import signal from './signal'
import conf from '../../config.base'

let user_id = uni.getStorageSync('user_id');
let user_token = uni.getStorageSync('user_token');

const header = {};

let baseURL = '';

if (user_id === undefined || user_token === undefined) {
    header['Context-Type'] = 'application/json';
} else {
    header['Context-Type'] = 'application/json';
    header['X-User-Id'] = user_id;
    header['X-Token'] = user_token;
    header['X-Signature'] = '';
    header['X-Timestamp'] = '';
    header['X-Nonce'] = '';
}


if (conf.DEBUG) {
    baseURL = conf.debugURL;
} else {
    baseURL = conf.baseURL;
}

function request(url, method, param= {}) {
    // 优先计算鉴权
    let auth = signal(param, user_id, user_token);
    header['X-Signature'] = auth['signature'];
    header['X-Timestamp'] = auth['timestamp'];
    header['X-Nonce'] = auth['nonce_str'];

    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url, //仅为示例，并非真实接口地址。
            data: param,
            header: header,
            success: (res) => {

                if(res.statusCode === 200) {
                    // 在这里处理业务错误问题

                    resolve(res.data);
                } else if (res.statusCode === 400) {
                    // 400 错误处理
                } else if (res.statusCode === 401) {
                    // 401 鉴权错误处理
                } else if (res.statusCode === 500) {
                    // 500 错误处理
                } else {
                    // 其他错误处理
                }

            },
            fail: (err) => {
                // 这里建议拦截所有请求错误，不进行返回

                reject(err);
            }
        });
    });
}


export default request;
