<template>
  <div class="aniamtionTest">
    <div id="demoCanvas" ref="demoCanvas"></div>
  </div>
</template>
<script>
import { ref,onMounted } from "vue";
import SVGA from "svgaplayerweb";
export default {
  name: "aniamtionTest",
  //https://fe-test.mini1.cn/y-activity/static/lottery.svga
  //https://file.nidong.com/upload/gift/20200520/upload_l3xlns9v1in4heomhwgbndzxt8quc9yb.svga
  //https://mnweb.mini1.cn/activity/minicdn/static/lottery.svga
  setup() {
    const data = ref(456);
    const bgImg =
      "https://mnweb.mini1.cn/activity/minicdn/static/lottery.svga";
    onMounted(() => {
      setFill();
      SVGAFn();
    });
     function SVGAFn() {
      let player = new SVGA.Player("#demoCanvas");
      let parser = new SVGA.Parser("#demoCanvas");
      parser.load(bgImg,function(videoItem) {                          //this.bgImg，图片路径需要线上地址，本地引用会报错
          player.setVideoItem(videoItem);
          player.startAnimation();
        }
      );
    }
    function setFill() {               //适配不同屏
      var $_canvas = document.getElementById("demoCanvas"),
        w = window.innerWidth,
        h = window.innerHeight,
        screen_proportion = h / w,
        svga_proportion = 16 / 9;
      if (screen_proportion > svga_proportion) {
        //长屏幕
        $_canvas.style.width = h / svga_proportion + "px";
        $_canvas.style.left = (w - h / svga_proportion) / 2 + "px";
      } else {
        $_canvas.style.height = w * svga_proportion + "px";
        $_canvas.style.top = (h - w * svga_proportion) / 2 + "px";
      }
    return {
      data,
    };
  }
    return {
      data,
    };
  },
};
</script>
