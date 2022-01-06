import qs from 'qs';
class UserInfo {

    url() {
        let u = window.location.search;
        return u.split('?')[1] ? qs.parse(u.split('?')[1]) : false
    }

    sessionUrl() {
        if (sessionStorage.getItem('userInfo')) {
            let u = JSON.parse(sessionStorage.getItem('userInfo'))
            return u && u.uin ? u : false;
        } else {
            return false
        }
    }

    ssoUrl() {
        let getCookie = function (name) {
            let arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if ((arr = document.cookie.match(reg))) {
                return decodeURIComponent(arr[2]);
            } else return null;
        };
        let arr = [
            "uin",
            "nickName",
            "headIndex",
            "token",
            "skinId",
            "sign",
            "apiid",
            "token",
        ];
        let result = {};
        if (getCookie("uin")) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "nickName") {
                    result[arr[i]] = decodeURIComponent(getCookie(arr[i]));
                } else {
                    result[arr[i]] = getCookie(arr[i]);
                }
            }
        }

        return result && result.uin ? result : false;
    }

    init() {
        let result = this.url() || this.ssoUrl() || this.sessionUrl() || {};
        console.log(result)
        if (result && result.uin) {
            sessionStorage.setItem('userInfo', JSON.stringify(result))
            return result
        } else {
            console.log('没有登陆信息')
        }
    }

}

const userInfo = new UserInfo();

const info = userInfo.init();
export default {
    info
}