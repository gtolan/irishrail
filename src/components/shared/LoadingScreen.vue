<template>
  <div class="full-page-view">
    <img :src="loaderImage" />

    <h1>Loading</h1>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  data() {
    return {
      loaderImage: require("../../assets/loader.svg")
    };
  }
};
</script>

<style lang="scss" scoped>
div.full-page-view {
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-line-pack: center;
  align-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>