<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Vue Mapbox Example">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoBemo" />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout rows="auto,auto,*" columns="*">
          <StackLayout col="0" row="0" margin="10">
            <GridLayout rows="*" columns="*">
              <Label class="title" row="0" col="0" text="Search with UUID" />
            </GridLayout>
          </StackLayout>
          <!-- <StackLayout col="1" row="1">
            <ListPicker
              :items="scanned"
              v-model="selectedListPickerIndex"
              @selectedIndexChange="indexChange"
            />
          </StackLayout>-->

          <StackLayout col="0" row="1" margin="10">
            <ContentView height="420" width="420">
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

        <StackLayout orientation="horizontal" margin="10" horizontalAlignment="center">
          <Button class="button" text="Find" width="40%" />
          <Button class="button" text="lost" width="40%" />
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
const firebase = require("nativescript-plugin-firebase");
import bemo from "./bemo";
export default {
  data() {
    return {
      latitude: [],
      longitude: [],
      center: null,
      zoom: null,
      // selectedListPickerIndex: 0,
      // dataInScan: [],
      // index: [],
      map: null
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
    // const data = [];
    // const qs = await firebase.firestore
    //   .collection("scan")
    //   .get({ source: "server" });
    // qs.forEach(doc => {
    //   data.push({
    //     lat: doc.data().location.latitude,
    //     lng: doc.data().location.longitude,
    //     animated: false,
    //     title: doc.data().tagID,
    //     subtitle:
    //       "time >> " + doc.data().time + "distance >> " + doc.data().distance,
    //     iconPath: "./img/placeholder.png",
    //     time: doc.data().time,
    //     toString: () => doc.data().tagID
    //   });
    // });
    // this.dataInScan = data;
  },
  methods: {
    BacktoBemo: function() {
      this.$navigateBack(bemo);
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

        let data = "Bag";

        const qs = await firebase.firestore
          .collection("item")
          .get({ source: "server" });
        qs.forEach(doc => {
          console.log(doc.data().name);

          if (data == doc.data().name) {
            const dataInFirebase = {
              lat: doc.data().location.latitude,
              lng: doc.data().location.longitude,
              animated: false,
              title: doc.data().tagID,
              subtitle:
                "time >> " +
                doc.data().time +
                "distance >> " +
                doc.data().distance,
              iconPath: "./img/placeholder.png"
            };
            args.map.addMarkers([dataInFirebase]);
          }
        });

        args.map.addMarkers([
          {
            lat: this.latitude,
            lng: this.longitude,
            animated: false,
            title: "location",
            subtitle: this.latitude + "," + this.longitude
          }
        ]);
        // this.index = null;
        // console.log(this.index);
        // console.log(args.map.object);
      }
    }

    // indexChange: function(args) {
    //   let newIndex = args.value;
    //   const eachData = this.dataInScan[newIndex];
    //   console.log(newIndex);

    //   const locations = this.dataInScan.filter(e => e.title == eachData);
    //   if (this.map) {
    //     this.map.removeMarkers();
    //     this.map.addMarkers([
    //       {
    //         lat: this.latitude,
    //         lng: this.longitude,
    //         animated: false,
    //         title: "Current location",
    //         subtitle: "location" + this.latitude + "," + this.longitude
    //       }
    //     ]);
    //     const markers = [];
    //     locations.map(l => {
    //       const { lat, lng, title, iconPath } = l;
    //       markers.push({
    //         lat,
    //         lng,
    //         animated: false,
    //         title,
    //         subtitle: "location" + lat + "," + lng,
    //         iconPath
    //       });
    //     });
    //     //console.log(markers);
    //     // this.map.addMarkers([markers[0]]);
    //     // this.map.addMarkers([markers[1]]);

    //     this.map.addMarkers(markers);
    //   }
    // }
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
  background-color: #4caf50;
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
  background-color: #53ba82;
  color: #ffffff;
}
</style>