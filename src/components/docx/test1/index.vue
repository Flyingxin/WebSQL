<template>
  <div class="box">
  </div>
</template>
<script>
// 子组件
import word from "@/components/docx/test1/son.vue";
export default {
  components: { word },
  data() {
    return {
      // 导出word
      wordData: {
        a: "这是标题1内容",
        b: "这是标题2内容",
        c: "这是标题3内容",
        d: "这是标题4内容",
        e: "这是标题5内容",
        f: "这是标题6内容",
        g: "这是标题7内容",
        h: "同意",
        list: [
          { name: "王五", phone: "18888888888" },
          { name: "王五", phone: "18888888888" },
          { name: "王五", phone: "18888888888" },
          { name: "王五", phone: "18888888888" },
        ],
      },
    };
  },
};
</script>
