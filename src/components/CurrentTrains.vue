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
        >{{item['TrainCode']| firstElement}} Direction: {{item['Direction'] | firstElement | newLine}}</h1>
        <span class="icon"></span>
      </div>

      <div class="list-items hidden">
        <ul>
          <li>{{item['TrainCode'] | firstElement}}</li>
          <li>{{item['TrainDate']| firstElement}}</li>
          <li>{{item['TrainStatus']| firstElement}}</li>
          <li>{{item['TrainLongitude']| firstElement}}</li>
          <li>{{item['TrainLatitude']| firstElement}}</li>
          <li>{{item['Direction'] | firstElement}}</li>
          <li class="mess">{{item['PublicMessage'] | firstElement | newLine}}</li>
          <button
            class="more-info"
            @click="getMoreTrainInfo(item['TrainCode'][0])"
          >See Train Movements</button>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "CurrentTrains",
  filters: {
    newLine: function(value) {
      if (!value) return;
      value = value.toString().replace(/(\r\n|\n|\r|\\n)/gm, " ");
      return value;
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
      const elem = event.target.classList.contains("icon")
        ? event.target.previousElementSibling
        : event.target;

      const listItems = elem.parentElement.nextSibling;
      elem.nextSibling.classList.toggle("open");

      listItems.classList.contains("hidden")
        ? this.openCollapse(listItems)
        : this.closeCollapse(listItems);
    },
    ...mapMutations(["updateSearchedTrainId"]),
    ...mapActions(["fetchTrainByIdAndDate"]),
    getMoreTrainInfo(id) {
      const payload = { selected: id };
      this.updateSearchedTrainId(id);
      this.fetchTrainByIdAndDate(payload);
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
  padding: 1rem;
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
    text-align: left;
  }
  span {
    position: absolute;
    right: -1rem;
  }
  span.open::after {
    content: " \02D7";
    position: absolute;
    margin-top: -0.3rem;
    background-color: #a59595;
    height: 1.5rem;
    padding-top: 0.75rem;
    padding: 0.45rem;
    padding-top: 0.7rem;
    padding-bottom: 0;
    border-radius: 50%;
    color: white;
    margin-right: -0.51rem;
    line-height: 0.17rem;
    &:hover {
      background-color: #2c8a5e;
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
    top: 0.25rem;
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
      margin-bottom: 0;
      li {
        text-align: left;
        font-family: monospace;
        &.mess {
          white-space: pre-wrap;
        }
      }
      button.more-info {
        height: 2rem;
        width: 100%;
        border-radius: 4px;
        background-color: dodgerblue;
        color: white;
        font-size: 1rem;
        text-transform: uppercase;
        margin: 10px auto;
        outline: none;
        cursor: pointer;
        border: 1px solid darkblue;
        letter-spacing: 1px;
        &:hover {
          background-color: #145ea7;
        }
      }
    }
  }
}
</style>