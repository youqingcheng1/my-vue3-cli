import axios from 'axios';
import $message from "@/components/Message";

const ajax = axios.create({
    timeout: 1000 * 20,
    validateStatus: () => {
        return status <= 500
    }
})

/**
 * 给post加请求头
 */
ajax.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded; charset=UTF-8";

/**
 * 响应
 */
ajax.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.code === 0) {
            return Promise.resolve(response.data.data)
        } else {
            if(response.status >= 500){
                $message({ text: '系统繁忙！' });
            } else {
                $message({ text: response.data.msg || '请求出错！' });
            }
            console.log(response.data.code)
            return Promise.reject({ msg: response.data.msg || '请求出错！', code: response.data.code || -1 })
        }
    },
    error => {
        const { response } = error;
        if (response.status < 500) {
            $message({ text: response.data.msg });
        } else if (response.status >= 500) {
            $message({ text: '系统繁忙！' });
        } else {
            $message({ text: '系统繁忙！' });
        }
        return Promise.reject(response.data);
    }
)

/**
 * 请求器
 */
ajax.interceptors.request.use(
    (config) => {
        //请求头添加auth token
        const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN")
        AUTH_TOKEN && (config.headers["Authorization"] = `Bearer ${AUTH_TOKEN}`);
        //请求头添加用户校验信息
        return config;
    },
    (error) => Promise.reject(error)
);


/**
* 封装ajax api接口
* @param {api} api数组对象
* @param {type} 不是1传入body格式
*  参数解构，{param = {},body = {},type = 1} = {} 默认参数
*/
const ajaxFn = (api) => {
    let result = {}
    api.forEach((o) => {
        result[o.name] = ({
            param = {},
            body = {},
            type = 1
        } = {}) => {
            const form = new FormData();
            Object.keys(body).forEach(i => {
                form.append(i, body[i])
            })
            const r = type == 1 ? form : body;
            let params = param;
            if (o.type === 'get') {
                return ajax[o.type](o.url, { params })
            } else {
                return ajax[o.type](o.url, r, { params })
            }
        }
    })
    return result
}

export default ajaxFn;