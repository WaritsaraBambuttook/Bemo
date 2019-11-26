import Vue from "nativescript-vue";
//import noti from "./components/notification";
import login from "./components/login";
import VueDevtools from "nativescript-vue-devtools";
var firebase = require("nativescript-plugin-firebase");
import RadGauge from "nativescript-ui-gauge/vue";
// import NSVueGlobalDrawer from "nativescript-vue-global-drawer";
// Vue.use(NSVueGlobalDrawer);
// Test commit
Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.use(RadGauge);
firebase
  .init({
    onMessageReceivedCallback: function(message) {
      console.log("Title: " + message.title);
      console.log("Body: " + message.body);
      // if your server passed a custom property called 'foo', then do this:
      // console.log("Value of 'foo': " + message.data.foo);
      const confirmOptions = {
        title: message.title,
        message: message.body,
        okButtonText: "Scan",
        cancelButtonText: "Cancel"
      };
      confirm(confirmOptions).then(result => {
        console.log(result);
        if (result == true) {
          console.log("scan button");
          // this.$navigateTo(pageApp);
          //this.changePage = pageApp;
        } else {
          console.log("cancel button");
        }
      });
    },

    onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    }
  })
  .then(
    function() {
      console.log("firebase.init done 555");
      firebase
        .subscribeToTopic("news")
        .then(() => console.log("Subscribed to topic"));
    },
    function(error) {
      console.log("firebase.init error: " + error);
    }
  );

//import { MapViewBase } from 'nativescript-google-maps-sdk/map-view-common';
//Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
// if(application.ios) {
//   GMSServices.provideAPIKey("AIzaSyAVz73yW1RCrbjdPp3Fas4bmi42UWImnIg");
// }
// if (platform.isIOS) {
//   GMSServices.provideAPIKey("AIzaSyAVz73yW1RCrbjdPp3Fas4bmi42UWImnIg")
// }

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

new Vue({
  render: h => h("frame", [h(login)])
}).$start();
