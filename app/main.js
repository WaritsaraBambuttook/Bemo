import Vue from 'nativescript-vue'
//import Menu from './components/Menu'
 import map from './components/map'
//import fb from './components/firebase'
//import pageApp from './components/App'
import store from './store';
import VueDevtools from 'nativescript-vue-devtools'
//import * as platform from 'platform'

//const changePage = Menu;
//connect firebase
var firebase = require("nativescript-plugin-firebase");

firebase.init({
 
}).then(
  function () {
    console.log("firebase.init done");
    firebase.subscribeToTopic("news").then(() => console.log("Subscribed to topic"));
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

//import { MapViewBase } from 'nativescript-google-maps-sdk/map-view-common';
//Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)
// if(application.ios) {
//   GMSServices.provideAPIKey("AIzaSyAVz73yW1RCrbjdPp3Fas4bmi42UWImnIg");
// }
// if (platform.isIOS) { 
//   GMSServices.provideAPIKey("AIzaSyAVz73yW1RCrbjdPp3Fas4bmi42UWImnIg")
// }



if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)  
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  store,
  render: h => h('frame', [h(map)])
}).$start()

