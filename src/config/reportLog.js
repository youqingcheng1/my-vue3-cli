import axios from 'axios'

const env = process.env.VUE_APP_REALEASE

console.log(env)

function reportHandle(options = {}) {
  const logURL = env === 'production' ? 'https://tj2.mini1.cn/miniworld' : 'https://tj2-t.mini1.cn/miniworld'
  const { uin = '', ver = '', country = '', lang = '' } = UserService || {}

  const commonParams = {
    ts: Math.floor(new Date().getTime() / 1000),
    uin,
    version: ver,
    country,
    lang,
    platform: '',
    channel: '',
    ip: '__IP__',
    session_id: ''
  }
  // 区分国内海外
  const envMap = {
    development: 1,
    test: 1,
    production: 0
  }
  options = Object.assign(commonParams, {
    env: envMap[env], // env  环境标识  "国内" -> 0, "测试" -> 1, "先遣服" -> 2, "海外" -> 10, "海外测试" -> 11
    id: '71001', // 同业务id，生成文件名作用
    product: '71001', // 业务id，如商业化活动，增长相关
    activity: '10001', // 活动场景， 活动ID
    event_type: 'view', // 事件类型，view 浏览；click 点击；enter 输入;
    scene_comp: 'FrontPage' // 场景组件
  }, options)

  return axios({
    method: 'post',
    url: logURL,
    headers: {
      'Content-type': 'text/plain'
    },
    data: `json3=[${JSON.stringify(options)}]`
  })
}

function makeEvent(product, activity) {
  const _getOptionsHandle = async (options, scene_comp, event_type) => await reportHandle({ ...options, id: product, product, activity, scene_comp, event_type })

  return {
    view: (scene_comp, options = {}) => _getOptionsHandle(options, scene_comp, 'view'),
    click: (scene_comp, options = {}) => _getOptionsHandle(options, scene_comp, 'click'),
    enter: (scene_comp, options = {}) => _getOptionsHandle(options, scene_comp, 'enter')
  }
}

export default {
  // 商业化活动
  trade: (activityId) => makeEvent(71000, activityId),
  // 增长相关
  increase: (activityId) => makeEvent(71001, activityId),
  // 市场活动相关
  market: (activityId) => makeEvent(71002, activityId),
  // 平台生态相关
  platform: (activityId) => makeEvent(71003, activityId),
  // IP相关
  ips: (activityId) => makeEvent(71004, activityId),
  // 内容生态相关
  content: (activityId) => makeEvent(71005, activityId),
}