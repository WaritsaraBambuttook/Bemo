<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
           <StackLayout>
                <Button text="enable Location" @tap="enableLocationTap"/>
                <Button text="Get Current Location" @tap="GetLocationTap"/>
                <!-- <Button row="2" text="start monitoring" @tap="buttonStartTap"/>
                <Button row="3" text="stop monitoring" @tap="buttonStopTap"/> -->
            </StackLayout>
        </ScrollView>
    </Page>
</template>
<script>
//import { Location } from 'nativescript-geolocation';
//const geolocation = require("nativescript-geolocation");
import * as geolocation from "nativescript-geolocation";
import { isEnabled, enableLocationRequest, getCurrentLocation } from "nativescript-geolocation";
    // const watchId;
    export default {
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
            desiredAccuracy: 3,timeout: 20000}).then(function(loc) {
                if (loc) {
                    console.log("latitude is: " + loc.latitude);
                    console.log("longitude is: " + loc.longitude);
                    //this.currentGeoLocation.latitude.push(loc.latitude)
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


        },

        data() {
            return {
                currentGeoLocation: {
                    latitude: null,
                    longitude: null,
                    altitude: null,
                    direction: null
                }
            };
        }
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