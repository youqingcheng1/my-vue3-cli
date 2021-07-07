/**
 * 获取url参数的值
 * @param {String}
 */

 export const queryURLParam = (key) => {
    const val = new RegExp("[?&]" + key + "=([^&]*)(&?)", "i").exec(
      window.location.href
    );
    return val ? val[1] : val;
  };
  
  /**
   * 判断是否在游戏浏览器
   */
  export const isMiniWorldGame = /miniworldgame/gi.test(navigator.userAgent);
  
  /**
   * @param {Number|Object} headInfo
   *  * 说明：
   * 1、游戏登录态参数，取登录态中的headIndex
   * 2、密码登录取得的baseinfo，取baseinfo.RoleInfo
   * 3、验证码登录，取返回值中的Model和SkinID参数，组装成字面量对象
   */
  //自定义接口类型
  export const getAvatarUrl = (headInfo) => {
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
   * 上报日志
   * @param {String} url 打点服务地址
   * @param {Object} options 打点参数
   *
   * options示例：
   * {
   *   k: 15000,  // 必须，打点ID
   *   v1: 1166201,  // 必须，uin或空字符串
   *   v2: 999,  // 必须，渠道id或空字符串
   *   v3: '0.26.7',  // 必须，版本号或空字符串
   *   v4: 'CN',  // 必须，国家或空字符串
   *   v5: 0  // 必须，语言id或空字符串
   *   v6: 平台 1:pc,2:h5
   *   v7: 类型
   * }
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
  
  export const reportLogFn = (k,val) => {
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