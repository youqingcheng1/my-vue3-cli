/**
 * 获取url参数的值
 * @param {String}
 */
const queryURLParam = (key) => {
  const val = new RegExp("[?&]" + key + "=([^&]*)(&?)", "i").exec(
    window.location.href
  );
  return val ? val[1] : val;
};
/**
 * @param {Number|Object} headInfo
 *  * 说明：
 * 1、游戏登录态参数，取登录态中的headIndex
 * 2、密码登录取得的baseinfo，取baseinfo.RoleInfo
 * 3、验证码登录，取返回值中的Model和SkinID参数，组装成字面量对象
 */
const getAvatarUrl = (headInfo) => {
  // 如果是从游戏内带的登录态，则直接使用带出来的id，因为游戏内已经算好id
  if (typeof headInfo === "number") {
    return `https://image.mini1.cn/roleicon/${headInfo}.png`;
  } else if (headInfo !== null && typeof headInfo == "object") {
    //皮肤id映射
    const skinHeadIdMap = {
      10: 39,
      9: 38,
      8: 37,
      6: 35,
      7: 36,
      5: 34,
      4: 33,
      3: 30,
      2: 32,
      1: 31,
    };

    let resultID = 0;
    const skinID = +headInfo.SkinID;

    if (skinID <= 0) {
      // 没有皮肤使用Model
      resultID = +headInfo.Model;
    } else {
      // 有皮肤且存在于映射表中使用映射表中的id
      if (skinHeadIdMap[skinID]) {
        resultID = skinHeadIdMap[skinID];
      } else {
        // 不存在则使用skinid + 29
        resultID = skinID + 29;
      }
    }
    return `https://image.mini1.cn/roleicon/${resultID}.png`;
  } else {
    return "https://image.mini1.cn/roleicon/1.png";
  }
};

/**
 * 上报日志*(图片上报)
 * @param {String} url 打点服务地址
 * @param {Object} options 打点参数
 *
 */
const reportLog = (url, options) => {
  let logImg = new Image();

  logImg.onload = function () {
    console.log("log success -- " + new Date().getTime());
  };

  logImg.onerror = function () {
    console.log("log error -- " + new Date().getTime());
  };

  // 格式化数据
  let str = "";
  for (var key in options) {
    // eslint-disable-next-line no-prototype-builtins
    if (options.hasOwnProperty(key)) {
      // if (options[key]) {
        var element = options[key];
        str += "&" + key + "=" + element;
      // }
    }
  }

  let logParams = str.substring(1);

  logImg.src = url + "/miniworld?" + logParams;
};
const reportLogFn = (k,val) => {
  let src =
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_REALEASE === "test"
        ? "http://120.24.64.132:8080"
        : "https://tj2.mini1.cn"
      : "http://120.24.64.132:8080";
  reportLog(src, {
    k: k,
    v1: val.uin || "",
    v2: val.apiid || "",
    v3: val.ver || "",
    v4: val.country || "",
    v5: val.lang || "",
    v6: "__IP__",
    _t: new Date().getTime(),
  });
};

const type = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'm' : 'pc'
const isMiniWorldGame = /miniworldgame/gi.test(navigator.userAgent) || (window.GetUrlAddAuthStr !== undefined);
/* 判断浏览器类型 */
const browser = {
    versions: (function () {
      const u = navigator.userAgent
      return {
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1 || u.indexOf('Macintosh') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
        qq: u.indexOf(' QQ') > -1 // 是否QQ
      }
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
let wxType = navigator.userAgent.indexOf('MicroMessenger') > -1 ? 'wx':'p';

export default {
  queryURLParam,
  getAvatarUrl,
  reportLogFn,
  type,
  isMiniWorldGame,
  browser,
  wxType
}