<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Map">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoBemo" />
    </ActionBar>
    <ScrollView class="bg">
      <StackLayout>
        <GridLayout rows="auto,auto,*" columns="*">
          <StackLayout col="0" row="0">
            <Label
              :text="'Name : '+ this.items.name"
              textWrap="true"
              horizontalAlignment="center"
              margin="10"
              class="NameofItem"
            />
            <Label
              :text="'Last time : '+ this.lastTimeInScane"
              textWrap="true"
              margin="10"
              class="NameofItem1"
            />
          </StackLayout>
          <StackLayout col="0" row="1" margin="10">
            <ContentView height="400" width="400">
              <GridLayout>
                <Mapbox
                  ref="map"
                  accessToken="pk.eyJ1Ijoid2FyaXRzYXJhYiIsImEiOiJjanpheGRnaGcwMXhoM3BvM2x1cDVoYWN5In0.4NvZ0yvjJula01d6qqXkOw"
                  mapStyle="traffic_day"
                  :latitude="latitude"
                  :longitude="longitude"
                  hideCompass="true"
                  showUserLocation="false"
                  disableZoom="false"
                  disableRotation="false"
                  disableScroll="false"
                  disableTilt="false"
                  @mapReady="onMapReady($event)"
                ></Mapbox>
              </GridLayout>
            </ContentView>
          </StackLayout>
        </GridLayout>
        <StackLayout>
          <ActivityIndicator :busy="processing" rowspan="3" color="red" width="50" height="50"></ActivityIndicator>
        </StackLayout>
        <StackLayout>
          <Button class="button" text="lost" @tap="lost_item" :isEnabled="!processing" />
          <Button class="delete" text="Delete item" @tap="deleteItem" :isEnabled="!processing" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
import * as geolocation from "nativescript-geolocation";
import { functions } from "nativescript-plugin-firebase";
var mapbox = require("nativescript-mapbox");
import { MapboxMarker, Mapbox } from "nativescript-mapbox";
var dialogs = require("tns-core-modules/ui/dialogs");
const firebase = require("nativescript-plugin-firebase");
import bemo from "./bemo";
import axios from "axios";
import { store } from "../store/store";
export default {
  props: ["items", "email"],
  store,
  data() {
    return {
      processing: false,
      latitude: [],
      longitude: [],
      center: null,
      zoom: null,
      map: null,
      dataInStore: [],
      lastTimeInScane: ""
    };
  },
  async created() {
    geolocation.isEnabled().then(
      function(isEnabled) {
        if (!isEnabled) {
          geolocation.enableLocationRequest().then(
            function() {},
            function(e) {
              console.log("Error: " + (e.message || e));
            }
          );
        }
      },
      function(e) {
        console.log("Error is: " + (e.message || e));
      }
    );
  },
  methods: {
    BacktoBemo: function() {
      this.$navigateTo(bemo, {
        props: { user: this.dataInStore, indexChangeTap: 0, text: "3" }
      });
    },
    deleteItem: function() {
      console.log(">>>>>>>>>" + this.items.name);
      console.log(">>>>>>>>>" + this.email);
      this.processing = true;
      console.log(this.processing);
      let Getdata = firebase.firestore
        .collection("item")
        .where("name", "==", this.items.name)
        .where("email", "==", this.email);
      let dataInStore = this.dataInStore;
      let go = this;
      Getdata.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          const test = firebase.firestore.collection("item").doc(doc.id);
          test.delete().then(() => {
            console.log("Deleted " + doc.id);
            dialogs.alert("delete complete").then(function() {
              console.log("Dialog closed!");
              go.processing = false;
              console.log(this.processing);
            });
            go.$navigateTo(bemo, {
              props: { user: dataInStore, indexChangeTap: 0, text: "3" }
            });
          });
        });
      });
    },
    onMapReady: async function(args) {
      this.map = args.map;
      const loc = await geolocation.getCurrentLocation({
        desiredAccuracy: 3,
        timeout: 20000
      });
      if (loc) {
        this.latitude.push(loc.latitude);
        this.longitude.push(loc.longitude);
        this.center = {
          lat: this.latitude[0],
          lng: this.longitude[0]
        };
        this.zoom = {
          level: 14,
          animated: false
        };
        args.map.setZoomLevel(this.zoom);
        args.map.setCenter(this.center);

        let data = this.items.uuid;
        let email = this.email;
        console.log("items " + data);
        console.log("email " + email);
        console.log(this.items.uuid);

        var count = 0;
        const qs = await firebase.firestore
          .collection("scan")
          .where("uuid", "==", this.items.uuid)
          .orderBy("time", "desc")
          .get({ source: "server" });
        qs.forEach(doc => {
          count = count + 1;
          if (count == 1) {
            let timeInScan = doc.data().time;
            console.log(timeInScan);
            this.lastTimeInScane = timeInScan;
            const dataInFirebase = {
              lat: doc.data().location.latitude,
              lng: doc.data().location.longitude,
              animated: false,
              title:
                "Name : " + this.items.name + "  UUID : " + doc.data().uuid,
              subtitle: "เวลาที่พบ : " + doc.data().time,
              iconPath: "./img/bemoIcon.png"
            };
            args.map.addMarkers([dataInFirebase]);
          }
        });

        args.map.addMarkers([
          {
            lat: this.latitude,
            lng: this.longitude,
            animated: false,
            title: "Current your location",
            subtitle: this.latitude + "," + this.longitude,
            iconPath: "./img/human.png"
          }
        ]);
      }
    },
    lost_item: function() {
      console.log(this.items.name);
      this.processing = true;
      console.log(this.processing);
      var instance = this;
      const lost = firebase.firestore.collection("lost");
      lost
        .add({
          name: this.items.name,
          email: this.items.email,
          uuid: this.items.uuid
        })
        .then(doc => {
          console.log("found lost item ...." + doc.id);
        });
      this.onSendNotification();
      dialogs.alert("sent ask for help success ").then(function() {
        console.log("Dialog closed!");
        instance.processing = false;
        console.log(this.processing);
      });
    },
    onSendNotification: function() {
      axios
        .post(
          "https://fcm.googleapis.com/fcm/send",
          {
            to: "/topics/news",
            notification: {
              body: "Please help scanning BEMO",
              title: "Help"
            },
            data: {
              email: this.email
            }
          },
          {
            headers: {
              Authorization:
                "key=AAAAF3Re7hE:APA91bEBRPd6KbCDzdiYKKKReXjCnBrHoOaqeWv1Ze-Vz33eCluspSIVwFiws2KticSQNl3ziyOfFnroXxovjiVc5vFvjNFWV80Gg2o8t-iq1gIe7b4Gi2C4OQoDHgYkQW4xlQUlFdY-",
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.dir(response.data);
          this.data = JSON.stringify(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.dataInStore = this.$store.getters.dataAboutUser;
  },
  computed: {
    scanned() {
      return [...new Set(this.dataInScan)];
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20;
  color: black;
}
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
.button {
  background-color: #304451;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
}
ActionBar {
  background-color: #143059;
  color: #ffffff;
}
.NameofItem {
  margin: 20;
  font-size: 24;
  font-weight: bold;
}
.NameofItem1 {
  font-size: 22;
}
.delete {
  background-color: #fb7452;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
}
.bg {
  background-color: #fad6b1;
}
:disabled {
  opacity: 0.5;
}
</style>