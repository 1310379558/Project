<template>
  <div class="header">
    <h3 @click="goBack" class="back"> ◀ </h3>
    <h3 class="title">{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    goBack() {
      //组件往前走一
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="css" scoped>
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* position: relative; */
  position: fixed;
  background-color: #fd8008;
  top: 39px;
}
.header h3 {
  float: left;
}
.header h3.back {
  margin-left: 15px;
}
.header h3.title {
  position: absolute;
  width: 200px;
  height: 50%;
  left: 50%;
  margin-left: -100px;
  text-align: center;
}
</style>>
