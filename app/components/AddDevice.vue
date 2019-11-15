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
          <Button text="Select UUID" class="SelectUUID" @tap="SelectUUID" margin="10" />
        </StackLayout>
        <StackLayout margin="10">
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

export default {
  data() {
    return {
      name: "",
      UUID: "",
      devices: [],
      lat: [],
      lng: []
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
    add_item: function() {
      console.log("add item");
      const addData = firebase.firestore.collection("item");

      //ส่งค้า email มาใส่
      let EmailOfUser = "a.a@email.com";
      addData
        .add({
          email: EmailOfUser,
          uuid: this.UUID,
          name: this.name,
          location: firebase.firestore.GeoPoint(this.lat, this.lng),
          time: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(doc) {
          console.log("found id ...." + doc.id);
        });
      dialogs.alert("Add Items success").then(function() {
        console.log("Dialog closed!");
      });
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
