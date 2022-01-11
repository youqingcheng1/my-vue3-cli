<template>
  <HelloWorld msg="测试实例组件"/>
</template>

<script>
import HelloWorld from './components/HelloWorld/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
};
</script>
