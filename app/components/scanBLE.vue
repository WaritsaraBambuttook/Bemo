<template>
  <ScrollView>
    <StackLayout class="home-panel">
      <CircularProgressBar :size="size" :progress="progress" :num="num" margin="10" />

      <Button class="button" text="Start Scan" dock="bottom" @tap="startScan" margin="20" />
    </StackLayout>
  </ScrollView>
  <!-- <ScrollView>
    <StackLayout class="home-panel">
      <CircularProgressBar size="50" progress="50" />
      <StackLayout class="m-y-15" />
      <CircularProgressBar size="100" progress="100" />
      <StackLayout class="m-y-15" />
      <CircularProgressBar size="200" progress="200" />
    </StackLayout>
  </ScrollView>-->
</template>

<script>
import bluetooth, { isBluetoothEnabled } from "nativescript-bluetooth";
import * as BluetoothService from "../BluetoothService";
import { log } from "util";
import { truncateSync } from "fs";

import CircularProgressBar from "./CircularProgressBar";
import RadGauge from "nativescript-ui-gauge/vue";
const timerModule = require("tns-core-modules/timer");
const progressModule = require("tns-core-modules/ui/progress");

export default {
  data() {
    return {
      devices: [],
      size: 250,
      progress: 0,
      num: []
    };
  },
  methods: {
    startScan: function() {
      this.num = 0;
      this.devices = [];
      let count = 0;
      this.progress = 0;
      let id = timerModule.setInterval(() => {
        this.progress = this.progress + 25;
        count++;
        console.log(this.progress);

        if (this.progress >= 100) {
          timerModule.clearInterval(id);
        }
      }, 1000);

      BluetoothService.StartScan(device => {
        console.log("............................" + device);
        this.devices.push(device);
        console.log(this.devices);

        this.num = this.devices.length;
        console.log(">>>>>>>>>>>>>>>>>>>>>>" + this.num);

        //   const found = this.devices.some(el => el.uuid === device.uuid);
        //   if (!found) {
        //     this.devices.push(device);
        //   } else {
        //     this.devices.map(d => {
        //       if (device.uuid == d.uuid) {
        //         d.distance = device.distance;
        //       }
        //     });
        //   }
      });
    }

    // stopScan: async function() {
    //   await BluetoothService.stopScan();
    //   this.scanning = false;
    // },

    // random(min = 50, max = 150) {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
  },
  components: {
    CircularProgressBar
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
</style>
