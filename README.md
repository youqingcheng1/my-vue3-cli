## vue3-cli

> 支持 scss
> 加入 postcss-pxtorem 插件 pc 和移动同套逻辑 写不同样式

#### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn serve
```

#### Compiles and minifies for production

```
yarn build:test  --測試服
yarn build:prod --正式服
yarn serve --本地服务
```

#### 选项 API 生命周期选项和组合式 API 之间的映射

> beforeCreate -> use setup()
> created -> use setup()
> beforeMount -> onBeforeMount
> mounted -> onMounted
> beforeUpdate -> onBeforeUpdate
> updated -> onUpdated
> beforeUnmount -> onBeforeUnmount
> unmounted -> onUnmounted
> errorCaptured -> onErrorCaptured
> renderTracked -> onRenderTracked
> renderTriggered -> onRenderTriggered
> activated -> onActivated
> deactivated -> onDeactivated

### 封装消息提示框

```javascript
import { getCurrentInstance } from "vue";
const internalInstance = getCurrentInstance();
const ctx = internalInstance.appContext.config.globalProperties;
ctx.$message({
  text: "测试信息提示框",
});
```

### 封装 ajax

> 传参 param body type
> param --Object
> body --Object （body 体）
> type --Number （传非 1，请求把 body 转为 form 形式提交）

(1) api 配置接口 例如

```javascript
const home = [
  // 获取个人状态
  {
    type: "get",
    url: `${baseUrl}fn/uStatus`,
    name: "getStatus",
  },
];
```

(2) 业务代码使用接口

```javascript
import { getCurrentInstance } from "vue";
const internalInstance = getCurrentInstance();
const ctx = internalInstance.appContext.config.globalProperties;
async test(){
    const res = await ctx.$http.xxx({
        param:xx,
        body:xx,
        type:xx
    })
}
```

### 迷你世界打点

reportLog.js

```
import reportLog from "../config/reportLog";
const { trade } = reportLog;
      trade(10015).view("HomePage", {
        v1: isGame ? 1 : 2,
      });
```

