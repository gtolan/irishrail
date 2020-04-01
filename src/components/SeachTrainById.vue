
<template>
  <section class="container">
    <h1>Seach Train: {{this.routeTrainId == '' ? firstTrainVailableTrain: this.routeTrainId}}</h1>

    <form @submit.prevent="handleFormSubmit">
      <select v-model="selected" :placeholder="selected">
        <option v-for="(item, index) in currentTrains" :key="index">{{item['TrainCode'][0]}}</option>
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
        Scheduled Departure: {{item['ScheduledDeparture'][0]}}
        <span class="icon"></span>
      </h1>

      <div class="list-items">
        <ul>
          <li>Train Code {{item['TrainCode'][0]}}</li>
          <li>Date: {{item["TrainDate"][0] }}</li>
          <li>Location Name: {{item['LocationFullName'][0] }}</li>
          <li>Location Order: {{item['LocationOrder'][0] }}</li>
          <li>Location Type: {{item['LocationType'][0] }}</li>
          <li>Location Name: {{item['LocationFullName'][0] }}</li>
          <li>Origin: {{item['TrainOrigin'][0] }}</li>
          <li>Destination: {{item['TrainDestination'][0] }}</li>
          <li>Scheduled Arrival: {{item['ScheduledArrival'][0] }}</li>
          <li>Scheduled Departure: {{item['ScheduledDeparture'][0] }}</li>
          <li>Expected Arrrival: {{item['ExpectedArrival'][0] }}</li>
          <li>Expected Departure: {{item['ExpectedDeparture'][0] }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script>
import { mapMutations, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker
  },
  created() {
    console.log(this.$route.params.id);
    console.log(this.trainById);
    this.updateSearchedTrainId = this.$route.params.id;
    this.currentTrains.length == 0 ? this.fetchCurrentTrains() : null;
    const payload = { selected: this.updateSearchedTrainId };
    this.fetchTrainByIdAndDate(payload);
  },
  computed: {
    trainById() {
      let ge = this.$store.getters.filterTrainsById;
      console.log(ge, "GE");
      return ge;
    },
    currentTrains() {
      return this.$store.getters.currentTrains;
    },
    trainMovements() {
      return this.getTrainMovements();
    },
    firstTrainVailableTrain() {
      return this.$store.getters.firstTrainId;
    }
  },
  updated() {
    console.log(this.trainMovements, "MOV Updated");
  },
  data() {
    return {
      routeTrainId: this.$route.params.id,
      selected: this.firstTrainVailableTrain,
      dateSelected: new Date(2020, 3, 1)
    };
  },
  methods: {
    ...mapMutations(["updateSearchedTrainId"]),
    ...mapActions([
      "fetchTrainByIdAndDate" // map `this.fetchTrainByIdAndDate()` to `this.$store.dispatch('fetchTrainByIdAndDate')`
    ]),
    getTrainMovements() {
      return this.$store.getters.trainMovements;
    },
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
      console.log(this.dateSelected, this.selected, date);
      const payload = { selected, date };
      this.routeTrainId = selected;
      //   this.$route.path = "/" + encodeURIComponent(selected);
      history.pushState({}, null, `/train/${selected}`);
      this.fetchTrainByIdAndDate(payload);
    },
    closeCollapse(el) {
      el.classList.add("hidden");
      el.dataset.isOpen = "false";
    },
    handleToggleExpand(item, event) {
      console.log(event.target, event.target.nextSibling);
      let listItems;
      if (event.target.classList.contains("icon")) {
        listItems = event.target.parentElement.nextSibling;
        event.target.parentElement.classList.toggle("open");
        console.log(listItems);
      } else {
        listItems = event.target.nextSibling;
        event.target.classList.toggle("open");
        console.log(listItems);
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
}
</style>
<style lang="scss" scoped>
.container {
  width: 70vw;
  max-width: 600px;
  margin: auto;
  select,
  form .btn {
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
    background-color: #4e9f3c;
  }
}

h1.card-title {
  margin: 0;
  position: relative;
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