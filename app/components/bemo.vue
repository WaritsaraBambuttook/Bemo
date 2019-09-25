<template>
  <Page class="page">
    <ActionBar title="Action Items" />
    <StackLayout>
      <SegmentedBar @selectedIndexChange="indexChange" row="0">
        <SegmentedBarItem title="my device" />
        <SegmentedBarItem title="Scan" />
        <SegmentedBarItem title="Map" />
        <!-- <SegmentedBarItem title="detail" /> -->
      </SegmentedBar>
      <GridLayout rows="*">
        <ScrollView row="1">
          <StackLayout class="home-panel">
            <component v-bind:is="component"></component>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </StackLayout>
  </Page>
</template>
<script>
var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
import map from "./map.vue";
import scan from "./App.vue";
import myDevice from "./Menu";
import { Observable } from "tns-core-modules/ui/page/page";
export default {
  components: {
    c0: myDevice,
    c1: scan,
    c2: map
  },
  data() {
    return {
      component: "c0"
    };
  },
  methods: {
    indexChange: function(args) {
      let newIndex = args.value;
      this.component = "c" + newIndex;
      console.log("Current tab index: " + this.component);
    }
  }
};
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}
/* .btn {
  border: none;
  outline: none;
  margin: -5;
  font-size: 15;
text-transform: none;
} */
.description-label {
  margin-bottom: 15;
}
</style>
