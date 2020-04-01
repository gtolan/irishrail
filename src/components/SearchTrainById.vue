
<template>
  <section class="container">
    <h1>Seach Train: {{this.routeTrainId == '' ? firstTrainVailableTrain: this.routeTrainId}}</h1>

    <form @submit.prevent="handleFormSubmit">
      <select v-model="selected" :placeholder="selected">
        <option
          v-for="(item, index) in currentTrains"
          :key="index"
        >{{item['TrainCode'] | firstElement}}</option>
      </select>
      <datepicker placeholder="01 apr 2020" class="datepicker" v-model="dateSelected"></datepicker>

      <button type="submit" class="btn search-date">Search by Date</button>
    </form>

    <div
      class="train-card"
      v-for="(item,index) in trainMovements"
      :key="index"
      :headerTitle="item['TrainCode']"
    >
      <h1 class="card-title" @click="handleToggleExpand(item, $event)">
        Scheduled Departure: {{item['ScheduledDeparture'] | firstElement}}
        <span class="icon"></span>
      </h1>

      <div class="list-items">
        <ul>
          <li>Train Code {{item['TrainCode'] | firstElement}}</li>
          <li>Date: {{item["TrainDate"] | firstElement }}</li>
          <li>Location Name: {{item['LocationFullName'] | firstElement }}</li>
          <li>Location Order: {{item['LocationOrder'] | firstElement }}</li>
          <li>Location Type: {{item['LocationType'] | firstElement }}</li>
          <li>Location Name: {{item['LocationFullName'] | firstElement }}</li>
          <li>Origin: {{item['TrainOrigin'] | firstElement }}</li>
          <li>Destination: {{item['TrainDestination'] | firstElement }}</li>
          <li>Scheduled Arrival: {{item['ScheduledArrival'] | firstElement }}</li>
          <li>Scheduled Departure: {{item['ScheduledDeparture'] | firstElement }}</li>
          <li>Expected Arrrival: {{item['ExpectedArrival'] | firstElement }}</li>
          <li>Expected Departure: {{item['ExpectedDeparture'] | firstElement}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script>
import { mapMutations, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
export default {
  name: "SearchTrainById",
  components: {
    Datepicker
  },

  created() {
    this.currentTrains.length == 0 ? this.fetchCurrentTrains() : null;
  },
  computed: {
    trainById() {
      return this.$store.getters.filterTrainsById;
    },
    currentTrains() {
      return this.$store.getters.currentTrains;
    },
    trainMovements() {
      return this.$store.getters.trainMovements;
    },
    firstTrainAvailableTrain() {
      return this.$store.getters.firstTrainId;
    }
  },
  data() {
    return {
      routeTrainId: this.$route.params.id,
      selected: this.firstTrainAvailableTrain,
      dateSelected: new Date()
    };
  },
  methods: {
    ...mapMutations(["updateSearchedTrainId"]),
    ...mapActions([
      "fetchTrainByIdAndDate" // map `this.fetchTrainByIdAndDate()` to `this.$store.dispatch('fetchTrainByIdAndDate')`
    ]),

    openCollapse(el) {
      el.classList.remove("hidden");
      el.dataset.isOpen = "true";
    },
    dateFormat(date) {
      var month_names = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ];

      var day = date.getDate();
      var month_index = date.getMonth();
      var year = date.getFullYear();

      return "" + day + " " + month_names[month_index] + " " + year;
    },
    handleFormSubmit() {
      const date = this.dateFormat(this.dateSelected);
      const selected = this.selected;
      const payload = { selected, date };
      this.routeTrainId = selected;
      history.pushState({}, null, `/train/${selected}`);
      this.fetchTrainByIdAndDate(payload);
    },
    closeCollapse(el) {
      el.classList.add("hidden");
      el.dataset.isOpen = "false";
    },
    handleToggleExpand(item, event) {
      let listItems;
      if (event.target.classList.contains("icon")) {
        listItems = event.target.parentElement.nextSibling;
        event.target.parentElement.classList.toggle("open");
      } else {
        listItems = event.target.nextSibling;
        event.target.classList.toggle("open");
      }

      listItems.classList.contains("hidden")
        ? this.openCollapse(listItems)
        : this.closeCollapse(listItems);
    }
  }
};
</script>


<style >
.vdp-datepicker.datepicker > div > input {
  width: 70vw;
  max-width: 600px;
  margin: 1rem auto;
  height: 3rem;
  border-radius: 5px;
  font-size: 1.25rem;
  padding-left: 0.45rem;
  outline: none;
}
</style>


<style lang="scss" scoped>
.container {
  width: 70vw;
  max-width: 600px;
  margin: auto;
  select,
  form .btn {
    outline: none;
    width: 70vw;
    max-width: 600px;
    margin: 1rem auto;
    height: 3rem;
    border-radius: 5px;
  }
  select {
    font-size: 1.25rem;
  }
  form button.search-date {
    font-weight: 700;
    font-size: 1.15rem;
    font-family: sans-serif;
    letter-spacing: 1px;
    color: white;
    background-color: #2c8a5f;
    cursor: pointer;
    &:hover {
      background-color: #42b983;
    }
  }
}

h1.card-title {
  margin: 0;
  position: relative;
  cursor: pointer;
  &.open {
    span::after {
      content: " \02D7";
      position: absolute;
    }
  }
  span::after {
    content: " \02D6";
    position: absolute;
    font-size: 4rem;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    right: 1rem;
    top: 0.35rem;
  }
}
div.train-card {
  border: 1px solid grey;
  border-radius: 5px;
  margin: 1rem auto;
  padding: 1rem;
}
div.list-items {
  transition: 0.3s ease-in-out;
  height: auto;
  opacity: 1;
  z-index: 1;
  animation: collapse 1s;
  animation-fill-mode: forwards;
  &.hidden {
    display: none;
  }

  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
}
</style>