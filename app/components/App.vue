<template>
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
            height="50"
            backgroundColor="#43b883"
            margin="5"
            fontSize="16"
            borderWidth="3 5 3 5"
            alignContent="center"
            textAlignment="center"
          >Device UUID: {{device.uuid}} Distance:{{device.distance}}</Label>
        </FlexboxLayout>

        <DockLayout stretchLastChild="false">
          <Button v-if="!scanning" class="btn" text="StartScan" dock="bottom" @tap="startScan" />
          <Button v-if="scanning" class="btn1" text="StopScan" dock="bottom" @tap="stopScan" />
        </DockLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script>
import bluetooth, { isBluetoothEnabled } from "nativescript-bluetooth";
import * as BluetoothService from "../BluetoothService";
import { log } from "util";
import { truncateSync } from "fs";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import { functions } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase");
//var dialogs = require("tns-core-modules/ui/dialogs");
//import firebasePage from "./firebase";
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

/* .ShowUID {
  margin-top: 20px;
} */
</style>
