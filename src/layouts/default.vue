<template>
  <main>
    <navbar />
    <slot name="pagecontent"></slot>
    <pagefooter />
  </main>
</template>

<script>
import DefaultNavbar from "../components/shared/DefaultNavbar";
import DefaultFooter from "../components/shared/DefaultFooter";

export default {
  name: "DefaultLayout",
  components: { navbar: DefaultNavbar, pagefooter: DefaultFooter }
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
}
</style>