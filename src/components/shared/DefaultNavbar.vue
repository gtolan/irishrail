<template>
  <nav v-navposition>
    <h4>Rail</h4>
  </nav>
</template>

<script>
import navbarDirective from "../../directives/navbar";

export default {
  name: "DefaultNavbar",
  directives: { navposition: navbarDirective }
};
</script>

<style lang="scss" scoped>
nav {
  height: 3.5rem;
  z-index: 2;
  background-color: green;
  color: white;
  h1 {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
}
</style>