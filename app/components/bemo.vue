<template >
  <Page class="gf">
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
      <SegmentedBar
        @selectedIndexChange="indexChange"
        :selectedIndex="index"
        row="0"
        :backgroundColor="bg"
        :selectedBackgroundColor="color"
      >
        <SegmentedBarItem class="text" title="device" />
        <SegmentedBarItem class="text" title="Scan" />
        <SegmentedBarItem class="text" title="setting" />
      </SegmentedBar>
      <GridLayout class="compo" rows="*">
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
      index: 0,
      color: "#cd7f32",
      bg: "#143059"
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
.description-label {
  margin-bottom: 15;
}
.btnImg {
  border-radius: 50%;
}
ActionBar {
  background-color: #143059;
  color: #ffffff;
}
.compo {
  background-color: #fad6b1;
}
.segment {
  background-color: #e5aab3;
}
.text {
  color: #ffffff;
}
</style>
