<template>
  <div class="dragTest">
    <div class="drag-container">
      <!-- <img src="https://mnweb.mini1.cn/icon/logo-32x32.png" class="drag-icon" @click="event" /> -->
      <div class="drag-icon">
        <div>74512125</div>
        <img src="https://mnweb.mini1.cn/icon/logo-32x32.png" @click="event"/>
      </div>
    </div>
  </div>
</template>
<script>
import enableDrag from "easy-drag";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "dragTest",
  setup() {
    onMounted(() => {
        disableDrag()
    });
    const event = (e)=>{
      console.log(e)
    }
    return {
      event
    }
  },
};

function getDocument(val) {
  return document.querySelector(val);
}
function disableDrag() {
  return enableDrag(
    getDocument(".drag-icon", {
      outerElement: document.querySelector('.drag-container'),
      innerElement: document.querySelector(".drag-icon"),
      onDragStart: () => {},
      onDrag: () => {},
      onDragEnd: () => {},
    })
  );
}
</script>
<style lang="scss" scoped>
.dragTest{
  padding: 20px;
}
.drag-container{
  height: 300px;
  border: 1px solid #000000;
  .drag-icon{
    border: 1px solid red;
    height: 80px;
    width: 150px;
  }
}
</style>
