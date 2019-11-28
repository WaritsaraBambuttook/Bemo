<template >
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image
          class="btnImg"
          src="~/img/Bemo.png"
          width="40"
          height="40"
          verticalAlignment="right"
        />
        <Label text="Menu" fontSize="24" verticalAlignment="center" />
      </StackLayout>
    </ActionBar>
    <StackLayout>
      <SegmentedBar @selectedIndexChange="indexChange" :selectedIndex="index" row="0">
        <SegmentedBarItem title="device" />
        <SegmentedBarItem title="Scan" />
        <SegmentedBarItem title="setting" />
        <!-- <SegmentedBarItem title="detail" /> -->
      </SegmentedBar>
      <GridLayout rows="*">
        <ScrollView row="1">
          <StackLayout>
            <component v-bind:is="component"></component>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </StackLayout>
  </Page>
</template>
<script>
var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
import scan from "./scanBLE";
import myDevice from "./myDevices";
import setting from "./setting";
import { Observable } from "tns-core-modules/ui/page/page";
import { functions } from "nativescript-plugin-firebase";
import AddDevice from "./AddDevice";
import { store } from "../store/store";
var firebase = require("nativescript-plugin-firebase");
export default {
  props: ["user", "indexChangeTap", "text"],
  store,
  components: {
    c0: myDevice,
    c1: scan,
    c2: setting
  },
  data() {
    return {
      component: "c0",
      // data: ""
      index: 0
    };
  },
  methods: {
    indexChange: function(args) {
      let newIndex = args.value;
      this.component = "c" + newIndex;
      console.log("Current tab index: " + this.component);
    },
    setIndex: function(args) {
      let newIndex = args.value;
      this.component = "c" + newIndex;
      this.index = args.value;
      console.log("Set tab index: " + this.index);
    }
  },
  created() {
    this.$store.commit("setdataAboutUser", this.user);
    console.log("indexFromProps" + this.indexChangeTap);
    // console.log("text" + this.text);
    // this.component = "c" + this.indexChangeTap;
    // console.log("mounted " + this.component);

    let args = { value: this.indexChangeTap };

    this.setIndex(args);
  },
  mounted() {}
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
.btnImg {
  border-radius: 50%;
}
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

/* .title {
  text-align: left;
  padding-left: 50%;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-close-button {
  margin-top: 20;
  padding: 10 10 10 10;
  background-color: #53ba82;
  color: #ffffff;
}

.drawer-header {
  padding: 80 40 40 40;
  margin-bottom: 20;
  background-color: #333333;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
} */
</style>
