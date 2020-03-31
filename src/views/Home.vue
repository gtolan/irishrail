<template>
  <defaultLayout>
    <template #pagecontent>
      <div class="home">
        <loadingScreen v-if="loading" />
        <currentTrains v-if="!loading" />
        <!-- <h1>CurrentTrains {{currentTrains}}</h1> -->
      </div>
    </template>
  </defaultLayout>
</template>

<script>
// @ is an alias to /src
import LoadingScreen from "@/components/LoadingScreen.vue";
import CurrentTrains from "@/components/CurrentTrains.vue";
import DefaultLayout from "@/layouts/default";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    DefaultLayout,
    LoadingScreen,
    CurrentTrains
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
