<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Vue Mapbox Example">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoScanpage" />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout rows="*" columns="*">
          <DockLayout width="100%" height="7%" backgroundColor="black" stretchLastChild="false">
            <Label
              class="text-center"
              text="search around me"
              color="white"
              dock="left"
              width="80%"
              height="50"
              fontSize="25"
              margin="5"
            />
            <Switch
              checked="false"
              class="m-15"
              dock="right"
              color="white"
              backgroundColor="white"
            />
          </DockLayout>
        </GridLayout>

        <GridLayout rows="50,auto,*" columns="auto,auto,*" margin="5">
          <Label row="0" col="0" text="Name :" height="auto" fontSize="20" />
          <Label row="1" col="0" text="ID :" height="auto" fontSize="20" />
          <Label
            row="2"
            col="0"
            :text="'Location : lat=' + latitude+' lng=' + longitude"
            height="auto"
            fontSize="20"
          />
        </GridLayout>

        <ContentView height="400" width="400">
          <GridLayout>
            <Mapbox
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

        <GridLayout rows="auto,auto" columns="*,*" margin="10">
          <button text="Find Item" fontSize="20" row="0" col="0"></button>
          <button text="Delect" fontSize="20" row="0" col="1"></button>
        </GridLayout>
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
export default {
  data() {
    return {
      latitude: [],
      longitude: [],
      center: null,
      zoom: null,
      // tagID: [],
      // distance: [],
      // location: [],
      // time: []
      datailData: []
    };
  },
  mounted() {
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
    //ดึงข้อมูลscan
    // const scan = firebase.firestore.collection("scan");
    // scan.get({ source: "server" }).then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     // console.log(`${doc.data().tagID} => ${JSON.stringify(doc.data())}`);
    //     // this.tagID.push(doc.data().id);
    //     // this.distance.push(doc.data().distance);
    //     // this.location.push(doc.data().location);
    //     // this.time.push(doc.data().time);

    //     const dataInFirebase = {
    //       lat: doc.data().location.latitude,
    //       lng: doc.data().location.longitude,
    //       animated: false,
    //       title: doc.data().tagID,
    //       subtitle: "time >> " + doc.data().time + "distance >> " + doc.data().distance
    //     };
    //     // console.log(dataInFirebase);
    //     this.onMapReady.args.map.addMarkers([dataInFirebase])
    //     //this.datailData.push(dataInFirebase);
    //     //console.log(this.datailData)
    //     // this.details.push({
    //     //   tagID: doc.data().id,
    //     //   distance: doc.data().distance,
    //     //   location: doc.data().location,
    //     //   time: doc.data().time
    //     // });
    //     //console.log(this.details);
    //   });
    // });
  },
  methods: {
    onMapReady: function(args) {
      const scan = firebase.firestore.collection("scan");
      scan.get({ source: "server" }).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const dataInFirebase = {
            lat: doc.data().location.latitude,
            lng: doc.data().location.longitude,
            animated: false,
            title: doc.data().tagID,
            subtitle:
              "time >> " +
              doc.data().time +
              "distance >> " +
              doc.data().distance
          };
          console.log(dataInFirebase);
        });
      });
      geolocation
        .getCurrentLocation({
          desiredAccuracy: 3,
          timeout: 20000
        })
        .then(async loc => {
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
            const scan = firebase.firestore.collection("scan");
            scan.get({ source: "server" }).then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const dataInFirebase = {
                  lat: doc.data().location.latitude,
                  lng: doc.data().location.longitude,
                  animated: false,
                  title: doc.data().tagID,
                  subtitle:
                    "time >> " +
                    doc.data().time +
                    "distance >> " +
                    doc.data().distance
                };
                console.log(dataInFirebase);
                args.map.addMarkers([
                  dataInFirebase,
              {
                lat: this.latitude,
                lng: this.longitude,
                animated: false,
                title: "location",
                subtitle: this.latitude + "," + this.longitude
              },

              // {
              //     lat: doc.data().location.latitude,
              //     lng: doc.data().location.longitude,
              //     animated: false,
              //     title: doc.data().tagID,
              //     subtitle:
              //       "time >> " +
              //       doc.data().time +
              //       "distance >> " +
              //       doc.data().distance
              // }
            ]);
                
              });
            });
            // args.map.addMarkers([
            //   {
            //     lat: this.latitude,
            //     lng: this.longitude,
            //     animated: false,
            //     title: "location",
            //     subtitle: this.latitude + "," + this.longitude
            //   }

            //   // this.datailData,
            //   // {
            //   //   lat: this.location.latitude,
            //   //   lng: this.location.longitude,
            //   //   animated: false,
            //   //   title: this.tagID,
            //   //   subtitle: "time >>"+this.time + "distance >>" + this.distance
            //   // }
            // ]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // detailFB : async () => {
    //   const fb = 0
    //   for (let index = 0; index < this.tagID.length; index++) {
    //     fb = {
    //             lat: this.location.latitude[i],
    //             lng: this.location.longitude[i],
    //             animated: false,
    //             title: this.tagID[i],
    //             subtitle: "time >>"+this.time[i] + "distance >>" + this.distance[i]
    //     }
    //     console.log(fb);
    //   }

    // },

    BacktoScanpage: function() {
      console.log("Back to Scan page");
      this.$navigateBack();
    }
  }
};
</script>

<style scoped>
/* .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    } */
</style>