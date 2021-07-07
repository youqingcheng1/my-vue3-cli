import { createApp, nextTick } from 'vue'
import messageComponent from './message.vue'

let messageConstructor = null;
let message = undefined;

const Message = (options = {}) => {
  // 如果组件已渲染，则返回即可
  if (message) {
    // return message
  }
  // 组件属性
  const opts = {
    text: '',
    visible: false,
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()

  messageConstructor = createApp(messageComponent, { ...opts });
  const parent = document.createElement('div');
  const instance = messageConstructor.mount(parent)
  document.body.appendChild(parent)
  // 显示message
  nextTick(() => {
    instance.visible = true
  })

  // 将组件实例赋值给message
  message = instance

  return instance
}

export default Message
