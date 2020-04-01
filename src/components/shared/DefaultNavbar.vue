<template>
  <nav v-navposition>
    <img class="nav-logo" :src="irishRailLogo" />
  </nav>
</template>

<script>
import navbarDirective from "../../directives/navbar";

export default {
  name: "DefaultNavbar",
  directives: { navposition: navbarDirective },
  data() {
    return {
      irishRailLogo: require("../../assets/irishRail.png")
    };
  }
};
</script>

<style lang="scss" scoped>
nav {
  height: 3.5rem;
  z-index: 2;
  background-color: #2c8a5f;
  color: white;
  img.nav-logo {
    width: 155px;
    display: -webkit-box;
    margin: auto;
  }
}
</style>