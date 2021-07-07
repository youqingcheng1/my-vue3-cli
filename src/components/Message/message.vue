<template>
  <transition name="message-fade">
    <div class="message-mask" v-show="visible">
      <p class="cr-Message-conten">{{ text }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Message",
  props: {
    text: {
      type: String,
      default: ''
    },
    durationProp:{
      type:Number,
      default:2000
    },
    visibleProp:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      duration:this.durationProp,
      visible: this.visibleProp
    }
  },
  mounted(){
     if (typeof this.duration !== "number") {
      this.duration = 2000;
    }
    if (this.duration > 0) {
      // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
      setTimeout(() => {
        // 移除挂载的dom元素
        this.visible = false;
        setTimeout(() => {
          if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
          }
          // 调用组件的$destroy方法进行组件销毁
        },200);
      }, this.duration);
    }
  }
};
</script>
<style lang="scss" scoped>
.message-fade-enter-active,
.message-fade-leave-active {
  margin-top: 0em;
  transition: all 0.5s ease;
}
.message-fade-enter-from,
.message-fade-leave-to {
  margin-top: -5em;
}
.message-mask {
  position: fixed;
  top: 5%;
  left: 0;
  width: 100%;
  z-index: 999;
  .cr-Message-conten {
    padding: 0.7em;
    width: fit-content;
    min-width: 0.8em;
    background-color: #fff;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 15px #ccc;
    border: 1px solid #1890ff;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 0.1em;
    }
  }
}
</style>
