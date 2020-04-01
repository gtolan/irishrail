<template>
  <div class="home">
    <loadingScreen v-if="loading" />
    <searchTrainById v-if="!loading" />
  </div>
</template>



<script>
import SearchTrainById from "../components/SeachTrainById";
import LoadingScreen from "../components/LoadingScreen";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    LoadingScreen,
    SearchTrainById
  },
  created() {
    this.fetchCurrentTrains(); //update the store with current trains
  },
  computed: {
    loading() {
      return this.$store.getters.currentTrains.length == 0 ? true : false;
    },
    currentTrains() {
      return this.$store.getters.currentTrains;
    }
  },
  methods: {
    ...mapActions([
      "fetchCurrentTrains", // map `this.fetchCurrentTrains()` to `this.$store.dispatch('fetchCurrentTrains')`
      "fetchTrainByIdAndDate" // map `this.fetchTrainByIdAndDate()` to `this.$store.dispatch('fetchTrainByIdAndDate')`
    ])
  }
};
</script>
