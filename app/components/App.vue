<template>
  <!-- <Page class="page" >
      <ActionBar title="Scan" class="action-bar">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BackMenu"/>
  </ActionBar>-->

  <StackLayout>
    <ScrollView sdkExampleTitle sdkToggleNavButton>
      <StackLayout>
        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
          <Label v-if="scanning" backgroundColor="#FE0000">Scanning. . .</Label>
          <Label
            v-for="device in devices"
            :key="device.uuid"
            class="showID"
            id="showID"
            height="70"
            backgroundColor="#43b883"
          >Device UUID: {{device.uuid}} Distance:{{device.distance}}</Label>
        </FlexboxLayout>
        <DockLayout stretchLastChild="false">
          <!-- <Button   class="btn" text="Checkpermission" dock="bottom" @tap="checkpermission"/> -->
          <Button v-if="!scanning" class="btn" text="StartScan" dock="bottom" @tap="startScan" />
          <Button v-if="scanning" class="btn1" text="StopScan" dock="bottom" @tap="stopScan" />
        </DockLayout>
        <DockLayout stretchLastChild="false">
          <Button class="btn" text="Checkpermission" dock="bottom" @tap="checkpermission" />
        </DockLayout>
        <DockLayout stretchLastChild="false">
          <Button class="btn" text="detail scan" dock="bottom" @tap="gotoFirebasePage" />
        </DockLayout>
        <DockLayout stretchLastChild="false">
          <Button class="btn" text="map" dock="bottom" @tap="gotomap" />
        </DockLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
  <!-- <show></show> -->
  <!-- </Page> -->
</template>

<script>
import bluetooth, { isBluetoothEnabled } from "nativescript-bluetooth";
import * as BluetoothService from "../BluetoothService";
import { log } from "util";
import { truncateSync } from "fs";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import { functions } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase");
import firebasePage from "./firebase";
import map from "./map";
export default {
  data() {
    return {
      devices: [],
      scanning: false
    };
  },
  methods: {
    startScan: function() {
      this.scanning = true;

      BluetoothService.StartScan(device => {
        const found = this.devices.some(el => el.uuid === device.uuid);
        if (!found) {
          this.devices.push(device);
        } else {
          this.devices.map(d => {
            if (device.uuid == d.uuid) {
              d.distance = device.distance;
            }
          });
        }
      });
    },

    stopScan: async function() {
      await BluetoothService.stopScan();
      this.scanning = false;
    },

    checkpermission: async function() {
      bluetooth.isBluetoothEnabled().then(function(enabled) {});
    },
    gotoFirebasePage: function() {
      this.$navigateTo(firebasePage);
    },
    gotomap: function() {
      this.$navigateTo(map);
    },
    BackMenu: function() {
      this.$navigateBack();
    }
  }
  // mounted() {
  //   const user = firebase.firestore.collection("user");
  //   if(this.devices.uuid == "66:AF:30:B7:74:37"){
  //     user.add(this.devices.uuid).then(function (doc) {
  //     console.log("loc id ...." + doc.id);
  //   })
  //   }

  // },
};
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}
.btn {
  font-size: 25;
  background: olivedrab;
}
.btn1 {
  font-size: 25;
  background: palevioletred;
}
.description-label {
  margin-bottom: 15;
}

.img1 {
  margin-top: 10px;
  vertical-align: center;
  width: 20%;
  height: 20%;
}

.ShowUID {
  margin-top: 20px;
}
</style>
