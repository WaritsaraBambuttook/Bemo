import Vue from "nativescript-vue";
// import noti from "./components/notification";
import login from "./components/login";
import VueDevtools from "nativescript-vue-devtools";
var firebase = require("nativescript-plugin-firebase");
import RadGauge from "nativescript-ui-gauge/vue";
// import NSVueGlobalDrawer from "nativescript-vue-global-drawer";
// Vue.use(NSVueGlobalDrawer);
Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.use(RadGauge);
firebase.init({}).then(
  function() {
    console.log("firebase.init done");
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