<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <!-- <Image class="btnImg" src="~/img/back.png" width="40" height="40" verticalAlignment="left" /> -->
        <Image
          class="btnImg"
          src="~/img/Bemo.png"
          width="40"
          height="40"
          verticalAlignment="center"
        />
        <Label text="Add Devices" fontSize="24" verticalAlignment="right" />
      </StackLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout orientation="vertical">
        <StackLayout class="input-field" margin="10">
          <TextField class="name" hint="Name" v-model="name" />
          <TextField class="UUID" hint="UUID" v-model="UUID" />
          <!-- <Label
            v-for="item in devices"
            :key="item.uuid"
            textWrap="true"
            margin="10"
            height="50"
            class="item"
            backgroundColor="#43b883"
            @tap="selectItems($event)"
          >UUID : {{item.uuid}} distance : {{item.distance}}</Label>-->

          <ListView
            class="list-group"
            for="item in devices"
            @itemTap="selectItems"
            height="250"
            rowHeight="50"
            margin="10"
          >
            <v-template>
              <FlexboxLayout flexDirection="row" class="list-group-item">
                <Label
                  :text="'UUID : '+item.uuid +' distance : ' + item.distance"
                  class="list-group-item-heading"
                  style="width: 100%"
                />
              </FlexboxLayout>
            </v-template>
          </ListView>
          <Image :src="cameraImage" class="image" stretch="aspectFit" margin="10" />
          <Button text="Select UUID" class="SelectUUID" @tap="SelectUUID" margin="10" />
          <Button text="Take a Picture" class="SelectUUID" @tap="TakePicture" margin="10"></Button>
        </StackLayout>
        <StackLayout margin="20">
          <Button text="Add Item" class="button" @tap="add_item"></Button>
          <Button text="Back" class="button" @tap="Back" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { log } from "util";
var firebase = require("nativescript-plugin-firebase");
import bluetooth, { isBluetoothEnabled } from "nativescript-bluetooth";
import * as Bluetooth from "../Bluetooth";
import myDevices from "./myDevices";
import { device } from "tns-core-modules/platform/platform";
import * as geolocation from "nativescript-geolocation";
var dialogs = require("tns-core-modules/ui/dialogs");
import {
  EventData,
  Observable,
  fromObject
} from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import { takePicture, requestPermissions } from "nativescript-camera";

export default {
  props: ["email"],
  // name: ["item_id"],
  data() {
    return {
      name: "",
      UUID: "",
      devices: [],
      lat: [],
      lng: [],
      saveToGallery: true,
      allowsEditing: false,
      keepAspectRatio: false,
      width: 50,
      height: 50,
      cameraImage: null,
      labelText: "",
      link: ""
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
    geolocation
      .getCurrentLocation({
        desiredAccuracy: 3,
        timeout: 20000
      })
      .then(loc => {
        this.lat = loc.latitude;
        this.lng = loc.longitude;
        console.log("lat " + this.lat);
        console.log("lng " + this.lng);
      });
  },
  methods: {
    Back: function() {
      this.$navigateBack(myDevices);
    },
    add_item: async function() {
      console.log("add item");
      const addDataToItem = await firebase.firestore.collection("item");
      const addDataToScan = await firebase.firestore.collection("scan");
      let EmailOfUser = this.email;
      var fs = require("tns-core-modules/file-system");
      console.log(this.cameraImage);
      var logoPath = this.cameraImage;
      let instance = this;
      var name = this.UUID.replace(/:/g, "");
      if (
        instance.name != "" &&
        instance.UUID != "" &&
        instance.cameraImage != null
      ) {
        firebase.storage
          .uploadFile({
            bucket: "gs://bemo-c5ae7.appspot.com/",
            // remoteFullPath: "ads/" + this.UUID.replace(/:/g, ""),
            remoteFullPath: "ads/" + name,

            localFullPath: logoPath,
            onProgress: function(status) {
              console.log("Uploaded fraction: " + status.fractionCompleted);
              console.log("Percentage complete: " + status.percentageCompleted);
            }
          })
          .then(
            function(uploadedFile) {
              console.log("File uploaded: " + JSON.stringify(uploadedFile));

              firebase.storage
                .getDownloadUrl({
                  bucket: "gs://bemo-c5ae7.appspot.com/",
                  remoteFullPath: "ads/" + name
                })
                .then(
                  function(url) {
                    console.log("Remote URL: " + url);
                    instance.link = url;

                    addDataToItem
                      .add({
                        email: EmailOfUser,
                        uuid: instance.UUID,
                        name: instance.name,
                        location: firebase.firestore.GeoPoint(
                          instance.lat,
                          instance.lng
                        ),
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                        url: instance.link
                      })
                      .then(function(doc) {
                        console.log("found id in items...." + doc.id);
                        dialogs.alert("Add Items success").then(function() {
                          console.log("Dialog closed!");
                        });
                      })
                      .catch(err => {
                        console.log(err);
                      });

                    addDataToScan
                      .add({
                        // email: EmailOfUser,
                        uuid: instance.UUID,
                        distance: instance.devices.distance,
                        // name: this.name,
                        location: firebase.firestore.GeoPoint(
                          instance.lat,
                          instance.lng
                        ),
                        time: firebase.firestore.FieldValue.serverTimestamp()
                      })
                      .then(function(doc) {
                        console.log("found id in scan...." + doc.id);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  },
                  function(error) {
                    console.log("Error: " + error);
                  }
                );
            },
            function(error) {
              console.log("File upload error: " + error);
              //   dialogs
              //     .alert("Please choose uuid and take a pictrue")
              //     .then(function() {
              //       console.log("Dialog closed!");
              //     });
            }
          );
      } else {
        dialogs
          .alert(
            "Please enter the name of the item, Select UUID and take a picture"
          )
          .then(function() {
            console.log("Dialog closed!");
          });
      }
    },
    SelectUUID: function() {
      this.devices = [];
      Bluetooth.StartScan(device => {
        // console.log("..........." + device.distance);
        if (device.distance <= 20) {
          this.devices.push(device);
        } else {
          console.log(device.distance);
        }

        // const found = this.devices.some(el => el.uuid === device.uuid);
        // if (!found) {
        //   this.devices.push(device);
        // } else {
        //   this.devices.map(d => {
        //     if (device.uuid == d.uuid) {
        //       d.distance = device.distance;
        //     }
        //   });
        // }
      });
    },
    selectItems: function(args) {
      console.log("UUID :" + args.index);
      let data = this.devices[args.index].uuid;
      console.log("data " + data);

      this.UUID = data;
    },
    TakePicture: function(args) {
      console.log("take a picture");
      let page = args.object.page;
      let that = this;
      requestPermissions().then(
        () => {
          takePicture({
            width: that.width,
            height: that.height,
            keepAspectRatio: that.keepAspectRatio,
            saveToGallery: that.saveToGallery,
            allowsEditing: that.allowsEditing
          }).then(
            imageAsset => {
              console.log(imageAsset);

              that.cameraImage = imageAsset;
              imageAsset.getImageAsync(function(nativeImage) {
                let scale = 1;
                let actualWidth = 0;
                let actualHeight = 0;
                if (imageAsset.android) {
                  // get the current density of the screen (dpi) and divide it by the default one to get the scale
                  scale =
                    nativeImage.getDensity() /
                    android.util.DisplayMetrics.DENSITY_DEFAULT;
                  actualWidth = nativeImage.getWidth();
                  actualHeight = nativeImage.getHeight();
                } else {
                  scale = nativeImage.scale;
                  actualWidth = nativeImage.size.width * scale;
                  actualHeight = nativeImage.size.height * scale;
                }
                that.cameraImage = imageAsset.android;
                console.log("camer " + that.cameraImage);

                that.labelText =
                  `Displayed Size: ${actualWidth}x${actualHeight} with scale ${scale}\n` +
                  `Image Size: ${Math.round(actualWidth / scale)}x${Math.round(
                    actualHeight / scale
                  )}`;
                console.log(`${labelText}`);
              });
            },
            err => {
              console.log("Error -> " + err.message);
            }
          );
        },
        () => alert("permissions rejected")
      );
    }
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
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
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
.SelectUUID {
  background-color: #bdb217;
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
.item {
  font-size: 16;
}
</style>
