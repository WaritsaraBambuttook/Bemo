<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Vue Mapbox Example"></ActionBar>
    <GridLayout>
      <Mapbox
        accessToken="pk.eyJ1Ijoid2FyaXRzYXJhYiIsImEiOiJjanpheGRnaGcwMXhoM3BvM2x1cDVoYWN5In0.4NvZ0yvjJula01d6qqXkOw"
        mapStyle="traffic_day"
        :latitude="latitude"
        :longitude="longitude"
        hideCompass="true"
        
        showUserLocation="false"
        disableZoom="false"
        disableRotation="true"
        disableScroll="false"
        disableTilt="false"
        @mapReady="onMapReady($event)"
      ></Mapbox>
    </GridLayout>
  </Page>
</template>
<script>
import * as geolocation from "nativescript-geolocation";
import { functions } from "nativescript-plugin-firebase";
var mapbox = require("nativescript-mapbox");
export default {
  data() {
    return {
      latitude: [],
      longitude: [],
      center: null,
      zoom:null
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
  },
  methods: {
    onMapReady: function(args) {
      geolocation.getCurrentLocation({
          desiredAccuracy: 3,
          timeout: 20000
        }).then(async loc => {
          if (loc) {
            this.latitude.push(loc.latitude);
            this.longitude.push(loc.longitude);
            this.center = {
              lat: this.latitude[0],
              lng: this.longitude[0]
            };
            this.zoom ={
                level: 16,
                animated: false
            };
            args.map.setZoomLevel(this.zoom)
            args.map.setCenter(this.center)
            args.map.addMarkers([
              {
                lat: this.latitude,
                lng: this.longitude,
                animated: false,
                title: "location",
                subtitle: this.latitude + "," + this.longitude
              }
            ]);
            
             
          }
        })
        .catch(err => {
          console.log(err);
        });
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