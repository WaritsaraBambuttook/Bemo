import Vue from "nativescript-vue";
import bemo from "./components/bemo";
import login from "./components/login";
import VueDevtools from "nativescript-vue-devtools";
var firebase = require("nativescript-plugin-firebase");
import RadGauge from "nativescript-ui-gauge/vue";
var dialogs = require("tns-core-modules/ui/dialogs");
import { store } from "./store/store";


Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.use(RadGauge);
firebase 
  .init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,
    onMessageReceivedCallback: function (message) {
      console.log("Title: " + message.title);
      console.log("Body: " + message.body);
      console.log("email " + message.data.email);
      console.log(JSON.stringify(message));
      let email = message.data.email

      let dataInStore = store.getters.dataAboutUser.email;
      console.log(dataInStore);
      if (dataInStore != email) {
        if (message.title) {
          const confirmOptions = {
            title: message.title,
            message: message.body,
            okButtonText: "Scan",
            cancelButtonText: "Cancel"
          };
          dialogs.confirm(confirmOptions).then(result => {
            
            if (result == true) {
              console.log("scan button");
              Vue.prototype.$navigateTo(bemo, {
                props: {
                  user: dataInStore,
                  indexChangeTap: 1,
                  text: "1"
                }
              });

              
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
      }
    },
    
    
    

    onPushTokenReceivedCallback: function (token) {
      console.log("Firebase push token: " + token);
    }
  })
 
 
  
  



  
  .then(
    function () {
      console.log("firebase.init done 555");
      
      firebase
        .subscribeToTopic("news")
        .then(() => console.log("Subscribed to topic"));
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
  );

Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
Vue.config.silent = TNS_ENV === "production";
new Vue({
 
  render: h => h("frame", [h(login)])
}).$start();



