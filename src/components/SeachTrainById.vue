
<template>
  <section class="container">
    <h1>Seach Train: {{this.$route.params.id}}</h1>

    <form @submit.prevent="handleFormSubmit">
      <select v-model="selected">
        <option value="start" key="start">Select Train By Code</option>
        <option v-for="(item, index) in currentTrains" :key="index">{{item['TrainCode'][0]}}</option>
      </select>
      <datepicker></datepicker>

      <button type="submit" class="btn">Search by Date</button>
    </form>
    <div
      class="train-card"
      v-for="(item,index) in trainById"
      :key="index"
      :headerTitle="item['TrainCode']"
    >
      <h1 class="card-title" @click="handleToggleExpand(item, $event)">
        {{item['TrainCode'][0]}} Direction: {{item['Direction'][0] | newLine}}
        <span class="icon"></span>
      </h1>

      <div class="list-items">
        <ul>
          <li>
            {{item['TrainCode'][0]}}
            <button>More info</button>
          </li>
          <li>{{item["TrainDate"][0]}}</li>
          <li>{{item['TrainStatus'][0]}}</li>
          <li>{{item['TrainLongitude'][0]}}</li>
          <li>{{item['TrainLatitude'][0]}}</li>
          <li>{{item['Direction'][0]}}</li>
          <li>{{item['PublicMessage'][0] | newLine}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script>
import { mapMutations } from "vuex";
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
  },
  computed: {
    trainById() {
      let ge = this.$store.getters.filterTrainsById;
      console.log(ge, "GE");
      return ge;
    },
    currentTrains() {
      return this.$store.getters.currentTrains;
    }
  },
  data() {
    return {
      routeTrainId: this.$route.params.id,
      selected: null
    };
  },
  methods: {
    ...mapMutations(["updateSearchedTrainId"]),
    openCollapse(el) {
      el.classList.remove("hidden");
      el.dataset.isOpen = "true";
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

<style lang="scss" scoped>
.container {
  width: 70vw;
  max-width: 600px;
  margin: auto;
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
    //   height: 0;
    //   opacity: 0;
    //   z-index: 0;
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