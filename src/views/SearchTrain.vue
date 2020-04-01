<template>
  <div class="home">
    <loadingScreen v-if="loading" />
    <searchTrainById v-if="!loading" />
  </div>
</template>



<script>
import SearchTrainById from "../components/SearchTrainById";

import searchMixin from "../mixins/searchMixin";
export default {
  name: "Home",
  components: {
    SearchTrainById
  },
  mixins: [searchMixin]
};
</script>
