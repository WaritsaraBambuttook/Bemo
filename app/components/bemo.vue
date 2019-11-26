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
      <SegmentedBar @selectedIndexChange="indexChange" row="0">
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
  props: ["user"],
  store,
  components: {
    c0: myDevice,
    c1: scan,
    c2: setting
  },
  data() {
    return {
      component: "c0"
    };
  },
  methods: {
    indexChange: function(args) {
      // console.log(this.user);
      let newIndex = args.value;
      this.component = "c" + newIndex;
      console.log("Current tab index: " + this.component);
    }
    // notify: function(message) {
    //   console.log("Title: " + message.title);
    //   console.log("Body: " + message.body);
    //   const confirmOptions = {
    //     title: message.title,
    //     message: message.body,
    //     okButtonText: "Scan",
    //     cancelButtonText: "Cancel"
    //   };
    //   confirm(confirmOptions).then(result => {
    //     console.log(result);
    //     if (result == true) {
    //       console.log("scan button");
    //       this.indexChange(2);
    //       //this.changePage = pageApp;
    //     } else {
    //       console.log("cancel button");
    //     }
    //   });
    // }
  },
  created() {
    this.$store.commit("setdataAboutUser", this.user);

    // firebase
    //   .init({
    //     onMessageReceivedCallback: this.notify
    //   })
    //   .then(
    //     function() {
    //       console.log("firebase.init done");
    //       firebase
    //         .subscribeToTopic("news")
    //         .then(() => console.log("Subscribed to topic"));
    //     },
    //     function(error) {
    //       console.log("firebase.init error: " + error);
    //     }
    //   );
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
