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
  height: 2.5rem;
  z-index: 2;
  background-color: green;
  color: white;
}
</style>