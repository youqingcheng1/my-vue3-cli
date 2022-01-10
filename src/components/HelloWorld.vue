<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <h1>{{ msg }}</h1>
    <h3>{{ data.authInfo.uin }}</h3>
    <h2>测试计算属性：{{ data.time }}</h2>
    <div>分模块取值：{{ testValue }}</div>
    <h2><button @click="clickEvent">点击</button> {{ count }}</h2>
    <div class="anim"></div>
    <div class="animationImg" v-if="show"></div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import test from "./hello";
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
    const { show, imagesFn } = ImageLoaing();
    const count = ref(1);
    const testValue = test.val;
    console.log(UserService);
    console.log(show.value);
    testValue.value = 45;

    //钩子函数，create包含在setup里
    onMounted(() => {
      console.log(ctx);
      ctx.$message({
        text: "测试信息提示框",
      });
      getStatus();
      imagesFn();
      console.log(show.value, 22);
      show.value = true;
      userInfo({ ctx, show });
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    //模块导入
    const { authInfo, getStatus } = userInfo({ ctx, show: show });
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
      testValue.value++;
    });

    data.authInfo = authInfo;

    return {
      data,
      count,
      ctx,
      show,
      clickEvent,
      testValue,
    };
  },
};

//细化模块
function userInfo({ ctx, show } = {}) {
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
  // const { show } = ImageLoaing();
  console.log(11, show?.value);
  show.value = 111;
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

//预加载
function ImageLoaing() {
  const show = ref(false);
  function imagesFn() {
    let arr = [];
    let images = [];
    let idx = 0;
    for (let i = 3930; i < 4032; i += 2) {
      arr.push(require(`../assets/images/130/130${i}.png`));
    }
    for (let i = 0; i < arr.length; i++) {
      images[i] = new Image();
      images[i].src = arr[i];
      idx++;
    }
    console.log(idx);
    if (idx === 51) {
      show.value = true;
    }
  }

  return { show, imagesFn };
}
</script>
