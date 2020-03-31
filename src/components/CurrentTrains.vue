<template>
  <section>
    <expandableContent
      v-for="(item,index) in currentTrains"
      :key="index"
      :headerTitle="item['TrainCode']"
      show="true"
      @click="handleToggleExpand(item)"
    >
      <template #expandable>
        <ul>
          <li>{{item['TrainCode']}}</li>
          <li>{{item['TrainDate']}}</li>
          <li>{{item['TrainStatus']}}</li>
          <li>{{item['TrainLongitude']}}</li>
          <li>{{item['TrainLatitude']}}</li>
          <li>{{item['Direction']}}</li>
          <li>{{item['PublicMessage']}}</li>
        </ul>
      </template>
    </expandableContent>
  </section>
</template>

<script>
import ExpandableContent from "../components/shared/ExpandableContent";

export default {
  name: "CurrentTrains",
  components: { ExpandableContent },
  computed: {
    currentTrains() {
      return this.$store.getters.currentTrains;
    }
  },
  methods: {
    handleToggleExpand(item) {
      console.log("handle toggle item");
      console.log(item, item.show);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>