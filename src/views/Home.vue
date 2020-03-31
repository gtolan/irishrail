<template>
  <div class="home">
    <navbar />
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Loading {{loading}}</h1>

    <loadingScreen />

    <h1>CurrentTrains {{currentTrains}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import Navbar from "@/components/shared/Navbar";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Navbar,
    LoadingScreen
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
