<template>
  <div class="expandable">
    <div class="container-header">
      <h1>Details: {{headerTitle}}</h1>
    </div>
    <v-slot name="expandable" class="expand">default</v-slot>
  </div>
</template>

<script>
export default {
  name: "ExpandableContent",
  props: ["headerTitle", "show"]
};
</script>

<style lang="scss" scoped>
div.expandable {
  width: 100vw;
  background: grey;
}
.expand {
  transition: 0.3s ease-in-out;
}
</style>