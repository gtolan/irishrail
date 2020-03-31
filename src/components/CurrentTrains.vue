<template>
  <section>
    <div
      class="train-card"
      v-for="(item,index) in currentTrains"
      :key="index"
      :headerTitle="item['TrainCode']"
    >
      <h1
        @click="handleToggleExpand(item, $event)"
      >{{item['TrainCode'][0]}} Direction: {{item['Direction'][0] | newLine}}</h1>

      <div class="list-items hidden">
        <ul>
          <li>
            {{item['TrainCode'][0]}}
            <button @click="getMoreTrainInfo(item['TrainCode'][0])">More info</button>
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
      const listItems = event.target.nextSibling;
      listItems.classList.contains("hidden")
        ? this.openCollapse(listItems)
        : this.closeCollapse(listItems);
    },
    getMoreTrainInfo(id) {
      console.log("find more info on..", id);
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
  margin: 1rem auto;
  border: 1px solid grey;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;

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
}
</style>