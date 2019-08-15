<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Vue Mapbox Example">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoScanpage" />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout rows="*" columns="*">
           <DockLayout width="100%" height="7%" backgroundColor="black" stretchLastChild="false">
                <Label class="text-center" text="search around me" color="white" dock="left" width="80%" height="50" fontSize="25" margin="5"/>
                <Switch checked="false" class="m-15"  dock="right" color="white" backgroundColor="white"/>
            </DockLayout>
        </GridLayout>

        <GridLayout rows="50,auto,*" columns="auto,auto,*" margin="5">
           <Label row="0" col="0" text="Name :" height="auto" fontSize="20" />
            <Label  row="1" col="0" text="ID :" height="auto" fontSize="20" />
             <Label  row="2" col="0" :text="'Location : lat=' + latitude+' lng=' + longitude" height="auto" fontSize="20" />
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
            <button text="Find Item"  fontSize="20" row="0" col="0" ></button>
            <button text="Delect"  fontSize="20" row="0" col="1" ></button>

        </GridLayout>
      </StackLayout>
    </ScrollView>
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
      zoom: null
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
              level: 16,
              animated: false
            };
            args.map.setZoomLevel(this.zoom);
            args.map.setCenter(this.center);
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
    },
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