<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <h1>{{ msg }}</h1>
    <h3>{{ data.authInfo.uin }}</h3>
    <h2>测试计算属性：{{ data.time }}</h2>
    <h2><button @click="clickEvent">点击</button> {{ count }}</h2>

    <div class="animationImg"></div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import utils from "@/config/utils";
const { queryURLParam } = utils;
import {
  computed,
  watch,
  watchEffect,
  onMounted,
  onUpdated,
  onUnmounted,
} from "@vue/runtime-core";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    //数据初始化
    const data = reactive({
      status: false,
      authInfo: {},
      time: 0,
    });
    const internalInstance = getCurrentInstance(); //获取上下文实例，ctx=vue2的this
    const ctx = internalInstance.appContext.config.globalProperties;
    const count = ref(1);
    console.log(UserService);

    //钩子函数，create包含在setup里
    onMounted(() => {
      console.log(ctx);
      ctx.$message({
        text: "测试信息提示框",
      });
      getStatus();
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    //模块导入
    const { authInfo, getStatus } = userInfo(ctx);
    const { clickEvent } = event(count, data);

    //computed使用
    data.time = computed(() => {
      return count.value;
    });

    //watch使用 惰性(没有立即执行)
    watch(
      () => count.value,
      (val, oldval) => {
        console.log(val, oldval);
      }
    );

    //立即执行, 不需要传递你要侦听的内容，自动会感知代码依赖，不需要传递很多参数，只要传递一个回调函数
    watchEffect(() => {
      console.log(`watchEffect:${data.status}`);
    });

    data.authInfo = authInfo;

    return {
      data,
      count,
      ctx,
      clickEvent,
    };
  },
};

//细化模块
function userInfo(ctx) {
  let authInfo = {
    uin: queryURLParam("uin") || "121245",
    apiid: queryURLParam("apiid") || "",
    lang: queryURLParam("lang") || "",
    country: queryURLParam("country") || "",
    auth: queryURLParam("auth") || "",
    s2t: queryURLParam("s2t") || "",
    time: queryURLParam("time") || "",
    _time: new Date().getTime() || "",
  };
  async function getStatus() {
    try {
      await ctx.$http.getStatus({
        param: { ...authInfo },
        body: {},
        type: 1,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return {
    authInfo,
    getStatus,
  };
}

function event(count, data) {
  function clickEvent() {
    count.value++;
    data.status = !data.status;
  }
  return {
    clickEvent,
  };
}
</script>
