<template>
  <defaultLayout>
    <template #pagecontent>
      <div class="home">
        <loadingScreen v-if="loading" />
        <currentTrains v-if="!loading" />
      </div>
    </template>
  </defaultLayout>
</template>

<script>
import CurrentTrains from "../components/CurrentTrains.vue";
import DefaultLayout from "../layouts/default";
import searchMixin from "../mixins/searchMixin";

export default {
  name: "CurrentTrainView",
  components: {
    DefaultLayout,
    CurrentTrains
  },
  mixins: [searchMixin]
};
</script>

<style scoped>
</style>
