import Vue from "nativescript-vue";
import bemo from "./components/bemo";
import login from "./components/login";
import VueDevtools from "nativescript-vue-devtools";
var firebase = require("nativescript-plugin-firebase");
import RadGauge from "nativescript-ui-gauge/vue";
var dialogs = require("tns-core-modules/ui/dialogs");
import { store } from "./store/store";
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
    showNotifications: true,
    showNotificationsWhenInForeground: true,
    onMessageReceivedCallback: function(message) {
      console.log("Title: " + message.title);
      console.log("Body: " + message.body);
      console.log(JSON.stringify(message));

      let dataInStore = store.getters.dataAboutUser;
      console.log(dataInStore);
      if (dataInStore != "") {
        if (message.title) {
          const confirmOptions = {
            title: message.title,
            message: message.body,
            okButtonText: "Scan",
            cancelButtonText: "Cancel"
          };
          dialogs.confirm(confirmOptions).then(result => {
            // console.log(result);
            if (result == true) {
              console.log("scan button");
              Vue.prototype.$navigateTo(bemo, {
                props: {
                  user: dataInStore,
                  indexChangeTap: 1,
                  text: "1"
                }
              });

              // this.$navigateTo(pageApp);
              //this.changePage = pageApp;
            } else {
              console.log("cancel button");
            }
          });
        } else {
          console.log("foreground == close app");

          Vue.prototype.$navigateTo(bemo, {
            props: {
              user: dataInStore,
              indexChangeTap: 1,
              text: "2"
            }
          });
        }
      } else {
        console.log("go to login");
        dialogs.alert("Pleasa first login and help people").then(function() {
          console.log("Dialog closed!");
        });
        Vue.prototype.$navigateTo(login);
      }

      // if(){}

      // if your server passed a custom property called 'foo', then do this:
      // console.log("Value of 'foo': " + message.data.foo);
      // const confirmOptions = {
      //   title: message.title,
      //   message: message.body,
      //   okButtonText: "Scan",
      //   cancelButtonText: "Cancel"
      // };
      // dialogs.confirm(confirmOptions).then(result => {
      //   console.log(result);
      //   if (result == true) {
      //     console.log("scan button");
      //     Vue.prototype.$navigateTo(bemo);

      //     // this.$navigateTo(pageApp);
      //     //this.changePage = pageApp;
      //   } else {
      //     console.log("cancel button");
      //   }
      // });
    },

    onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    }
  })
  .then(
    function() {
      console.log("firebase.init done 555");
      // let dataInStore = store.getters.dataAboutUser;
      // console.log(dataInStore);
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
