import ajaxFn from "./ajax";
const baseUrl =
    process.env.NODE_ENV === 'production' ?
        process.env.VUE_APP_REALEASE === 'test' ?
            'http://activities-test.mini.me/refn/'
            : 'https://activities.mini1.cn/refn/'
        : '/';
const home = [
    // 获取个人状态
    {
        type: "get",
        url: `${baseUrl}fn/uStatus`,
        name: "getStatus"
    }
];

const arr = [...home];

export default ajaxFn(arr);
