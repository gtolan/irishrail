<template>
  <section>
    <div
      class="train-card"
      v-for="(item,index) in currentTrains"
      :key="index"
      :headerTitle="item['TrainCode']"
    >
      <div class="card-header" @click="handleToggleExpand(item, $event)">
        <h1
          class="card-title"
        >{{item['TrainCode'][0]}} Direction: {{item['Direction'][0] | newLine}}</h1>
        <span class="icon"></span>
      </div>

      <div class="list-items hidden">
        <ul>
          <li>
            {{item['TrainCode'][0]}}
            <button
              class="more-info"
              @click="getMoreTrainInfo(item['TrainCode'][0])"
            >More info</button>
          </li>
          <li>{{item['TrainDate'][0]}}</li>
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
export default {
  name: "CurrentTrains",
  filters: {
    newLine: function(value) {
      console.log(value, "newline");
      return value.replace(/(\r\n|\n|\r)/gm, " ");
    }
  },
  computed: {
    currentTrains() {
      return this.$store.getters.currentTrains;
    }
  },
  data() {
    return {
      isHidden: true
    };
  },
  methods: {
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
      const elem = event.target.classList.contains("icon")
        ? event.target.previousElementSibling
        : event.target;
      console.log(elem, "want h1");
      const listItems = elem.parentElement.nextSibling;
      elem.nextSibling.classList.toggle("open");

      listItems.classList.contains("hidden")
        ? this.openCollapse(listItems)
        : this.closeCollapse(listItems);
    },
    ...mapMutations(["updateSearchedTrainId"]),
    getMoreTrainInfo(id) {
      console.log("find more info on..", id);
      this.updateSearchedTrainId(id);
      this.$router.push(`/train/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes collapse {
  0% {
    opacity: 0;
    display: none;
  }
  100% {
    display: block;
    opacity: 1;
  }
}
div.train-card {
  width: 90vw;
  border: 1px solid grey;
  padding: 0.3rem;
  border-radius: 5px;
  width: 90vw;
  margin: 1rem;
  cursor: pointer;
  max-width: 300px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  .card-header {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  h1.card-title {
    margin: 0;
    position: relative;
    width: 90%;
  }

  span.open::after {
    content: " \02D7";
    position: absolute;
    margin-top: 0.25rem;
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
      button.more-info {
        height: 2rem;
        width: 200px;
        border-radius: 4px;
        background-color: dodgerblue;
        color: white;
        font-size: 1rem;
        text-transform: uppercase;
      }
    }
  }
}
</style>