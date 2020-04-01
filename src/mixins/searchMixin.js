import LoadingScreen from "../components/shared/LoadingScreen";


import { mapActions } from "vuex";

export default {
    components: {
        LoadingScreen,
      },
      created() {
        this.$store.getters.currentTrains.length == 0 ?
        this.fetchCurrentTrains() :
        null //update the store with current trains
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
}