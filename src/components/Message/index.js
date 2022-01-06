import { createApp, nextTick } from 'vue'
import messageComponent from './message.vue'

let messageConstructor = null;
let instance = null

const Message = (options = {}) => {
  let messageDom = document.getElementById(`MessageID`);
  if (messageDom) {
    let messageText = new Set(document.getElementsByClassName('cr-Message-conten'));
    let arr = [];
    for (let i of messageText.values()) {
      arr.push(i.innerHTML)
    }
    let str = arr.some(i => {
      return i === options.text
    }
    )
    if (str) return
  }
  // 组件属性
  let opts = {
    text: '',
    visible: false,
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()

  messageConstructor = createApp(messageComponent, { ...opts });
  const parent = document.createElement('div');
  parent.id = `MessageID`;
  instance = messageConstructor.mount(parent);
  document.body.appendChild(parent)
  // 显示message
  nextTick(() => {
    instance.visible = true
  })

  // 将组件实例赋值给message
  return instance
}

export default Message
