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
          <Label
            v-for="item in devices"
            :key="item.uuid"
            textWrap="true"
            margin="10"
            height="50"
            class="item"
            backgroundColor="#43b883"
          >UUID : {{item.uuid}} distance : {{item.distance}}</Label>
          <Button text="Select UUID" class="SelectUUID" @tap="SelectUUID" margin="5" />
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
export default {
  data() {
    return {
      name: "",
      UUID: "",
      devices: []
    };
  },
  methods: {
    Back: function() {
      this.$navigateBack(myDevices);
    },
    add_item: function() {
      console.log("add item");
    },
    SelectUUID: function() {
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
