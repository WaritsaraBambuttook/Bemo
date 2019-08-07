<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
           <StackLayout>
                <Button text="enable Location" @tap="enableLocationTap"/>
                <Button text="Get Current Location" @tap="GetLocationTap"/>
                <StackLayout>
                <Label :text="'latitude = ' + currentLocaton.latitude"  />
                <Label :text="'longitude = ' + currentLocaton.longitude" />
                </StackLayout>

                <!-- <GridLayout rows="1,*" columns="*">
                   <MapView :zoom="zoom" 
                    :latitude="location.latitude" 
                    :longitude ="location.longitude" 
                    v-if="allowExecution"
                     @mapReady="mapReady" 
                    @coordinateLongPress="locationSelected"
                    />
                </GridLayout> -->
            </StackLayout>
            
        </ScrollView>
    </Page>
</template>
<script>
//import { Location } from 'nativescript-geolocation';
//const geolocation = require("nativescript-geolocation");
import * as geolocation from "nativescript-geolocation";
import { isEnabled, enableLocationRequest, getCurrentLocation } from "nativescript-geolocation";
// import * as permissions from 'nativescript-permissions'
// import * as platform from 'platform'
    // const watchId;
    export default {
         data() {
            return {
                    currentLocaton: [],
                    // latitude: [],
                    // longitude: [],
                    // zoom: 15,
                    // allowExecution: false,
                    // mapView: null,
                    // API_KEY = "AIzaSyAVz73yW1RCrbjdPp3Fas4bmi42UWImnIg"
            };
        },
        // created: function() {
        //     /* dont run the android permissions routine for iOS */
        //     if (platform.isIOS) {
        //         this.allowExecution = true;
        //         return;
        //     }
        //     /* list of permissions needed */
        //     let permissionsNeeded = [
        //         android.Manifest.permission.ACCESS_FINE_LOCATION,
        //         android.Manifest.permission.ACCESS_COARSE_LOCATION
        //     ];
        //     /* showing up permissions dialog */
        //     permissions
        //         .requestPermissions(permissionsNeeded, "Give it to me!")
        //         .then(() => this.allowExecution = true)
        //         .catch(() => this.allowExecution = false);
        // },
        methods: {
            enableLocationTap: function() {
                geolocation.isEnabled().then(function (isEnabled) {
                    console.log("Enable.....?" + isEnabled);
                if (!isEnabled) {
                    geolocation.enableLocationRequest().then(function () {
                    }, function (e) {
                        console.log("Error: " + (e.message || e));
                    });
                    }
                }, function (e) {
                    console.log("Error is: " + (e.message || e));
                });
            },
           GetLocationTap : function(){
            const location = geolocation.getCurrentLocation({
            desiredAccuracy: 3,timeout: 20000}).then((loc) => {
                if (loc) {
                    console.log("latitude is: " + loc.latitude);
                    console.log("longitude is: " + loc.longitude);
                    // this.latitude.push(loc.latitude);
                    // this.longitude.push(loc.longitude);
                    this.currentLocaton = {latitude:loc.latitude,longitude:loc.longitude}
                    //console.log("this.locations: " + this.locations);
                    
                }
                    
                }, function(e){
                    console.log("Error getLocaton: " + e.message);
            });
                   
            },
            // buttonStartTap: function(){
            //     watchId = geolocation.watchLocation(
            //     function (loc) {
            //         if (loc) {
            //             console.log("Received location: " + loc);
            //         }
            //     },
            //     function(e){
            //         console.log("Error: " + e.message);
            //     },
            //     {desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime : 1000 * 20});
            // },
            // buttonStopTap : function(){
            //      if (watchId) {
            //         geolocation.clearWatch(watchId);
            //     }
            // }
            //  mapReady: function(args){
            //         this.mapView = args.object
            // },


        },
    };
</script>

<style scoped>
  .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>