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
      }
    },
    
    // onAuthStateChanged: function(data) { 
    //   console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");  
    //   console.log("Test........"+data)
    //   if(data.loggedIn==true){
    //     Vue.prototype.$navigateTo(bemo);
    //     console.log("testBemo");
    //   }else{
    //     Vue.prototype.$navigateTo(login);
    //     console.log("testLogin");
    //   }
      // let dataInStore = store.getters.dataAboutUser;
    //   console.log(dataInStore);
    //   // let data= dataInStore;
    //   // console.log(data);
    //   if (dataInStore!="") {
    //     Vue.prototype.$navigateTo(bemo);
    //     console.log(logined);
    //     console.log(test);
    //   }else{
    //     Vue.prototype.$navigateTo(login);
    // }
    // },
    
    

    onPushTokenReceivedCallback: function (token) {
      console.log("Firebase push token: " + token);
    }
  })
 
  firebase.init({
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
      console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      if (data.loggedIn == true) {
        Vue.prototype.$navigateTo(bemo);
        
      }else{
        Vue.prototype.$navigateTo(login);
      }
    }
  });
  var listener = {
    onAuthStateChanged: function(data) {
      console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      if (data.loggedIn == true) {
        console.log("User info", data.user);
      }
    },
    thisArg: this
  };

  // add the listener:
  firebase.addAuthStateListener(listener);
  
  // stop listening to auth state changes:
  firebase.removeAuthStateListener(listener);
  
  // check if already listening to auth state changes
  firebase.hasAuthStateListener(listener);
  


  firebase.getCurrentUser()
.then(user => console.log("User uid: " + user.uid))
.catch(error => console.log("Trouble in paradise: " + error));
  
  // .then(
  //   function () {
  //     console.log("firebase.init done 555");
  //     // let dataInStore = store.getters.dataAboutUser;
  //     // console.log(dataInStore);
  //     firebase
  //       .subscribeToTopic("news")
  //       .then(() => console.log("Subscribed to topic"));
  //   },
  //   function (error) {
  //     console.log("firebase.init error: " + error);
  //   }
  // );
  // firebase.auth.onAuthStateChanged(function(user) {
  //   if (user) {
  //     Vue.prototype.$navigateTo(bemo);
  //   } else {
  //     Vue.prototype.$navigateTo(login);
  //   }
  // });
  // var user = firebase.auth.currentUser;
  //   if (user) {
  //     Vue.prototype.$navigateTo(bemo);
  //   } else {
  //     Vue.prototype.$navigateTo(login);
  //   }

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



