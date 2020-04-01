<template>
  <div class="container">
    <router-link to="/current-trains" class="btn route current">Show Current trains</router-link>

    <div class="logo">
      <img :src="irishRailLogo" />
    </div>
    <form @submit.prevent="handleFormSubmit">
      <select v-model="selected">
        <option value="start" key="start">Select Train By Code</option>
        <option v-for="(item, index) in currentTrains" :key="index">{{item['TrainCode'][0]}}</option>
      </select>
      <button type="submit" class="btn">Search by Train Code</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {},
  created() {
    this.fetchCurrentTrains(); //update the store with current trains
  },
  data() {
    return {
      selected: "start",
      irishRailLogo: require("../assets/irishRail.png")
    };
  },
  computed: {
    currentTrains() {
      return this.$store.getters.currentTrains;
    }
  },
  methods: {
    ...mapActions([
      "fetchCurrentTrains", // map `this.fetchCurrentTrains()` to `this.$store.dispatch('fetchCurrentTrains')`
      "fetchTrainByIdAndDate" // map `this.fetchTrainByIdAndDate()` to `this.$store.dispatch('fetchTrainByIdAndDate')`
    ]),
    ...mapMutations(["updateSearchedTrainId"]),
    handleFormSubmit() {
      this.updateSearchedTrainId(this.selected);
      this.$router.push(`/train/${this.selected}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .btn {
    margin: 1rem auto;
    height: 3rem;
    border-radius: 5px;
    width: 100%;
    text-transform: uppercase;
    display: block;
    font-weight: 700;
    font-size: 1.15rem;
    font-family: sans-serif;
    letter-spacing: 1px;
  }
  .route {
    display: block;
    text-decoration: none;
    max-width: 600px;
    width: 70vw;
    max-width: 600px;
    margin: auto;
    line-height: 2.85rem;
    &.current {
      color: white;
      background-color: dodgerblue;
    }
  }
  .logo,
  form,
  select {
    width: 70vw;
    max-width: 600px;
    margin: auto;
  }
  select {
    height: 3rem;
  }
  .logo {
    img {
      width: 100%;
    }
  }
  form button {
    background-color: #e88c35;
    color: white;
  }
}
</style>
