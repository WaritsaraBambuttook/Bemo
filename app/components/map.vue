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
                    zoomLevel="12"
                    showUserLocation="false"
                    disableZoom="true"
                    disableRotation="false"
                    disableScroll="false"
                    disableTilt="false"
                    @mapReady="onMapReady($event)">
                </Mapbox>
        </GridLayout>
    </Page>
</template>
<script>
import * as geolocation from "nativescript-geolocation";
    export default {
         data() {
            return {
                  latitude:[],
                  longitude:[],

            };
        },
        mounted() {
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
                geolocation.getCurrentLocation({
                    desiredAccuracy: 3,timeout: 20000}).then((loc) => {
                     if (loc) {
                        // var lat = loc.latitude;
                        // var long =loc.longitude;
                        this.latitude.push(loc.latitude);
                        this.longitude.push(loc.longitude);
                        //console.log(loc.latitude,loc.longitude);
                        
                    }    
                    }, function(e){
                        console.log("Error getLocaton: " + e.message);
                });
        },
        methods: {
              onMapReady: function(args) {
                args.map.addMarkers([
                    {
                        lat: this.latitude,
                        lng: this.longitude,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ]);
            }
        },
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