<template>
  <StackLayout>
    <ScrollView sdkExampleTitle sdkToggleNavButton>
      <StackLayout>
        <GridLayout rows="*,auto" columns="*,auto" margin="50">
          <CircularProgressBar :size="size" :progress="progress" row="0" col="0" margin="10" />

          <Button
            class="btn"
            text="StartScan"
            dock="bottom"
            @tap="startScan"
            row="1"
            col="0"
            margin="20"
          />
        </GridLayout>

        <!-- <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
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
        </FlexboxLayout>-->

        <!-- <DockLayout stretchLastChild="false" row="1" col="0" margin="10">
         <Button v-if="!scanning" class="btn" text="StartScan" dock="bottom" @tap="startScan" />
         <Button v-if="scanning" class="btn1" text="StopScan" dock="bottom" @tap="stopScan" /> 
          
        </DockLayout>-->
      </StackLayout>
    </ScrollView>
  </StackLayout>
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
      progress: 0
    };
  },
  methods: {
    startScan: function() {
      this.scanning = true;

      BluetoothService.StartScan(device => {
        console.log("............................" + device);
        let count = 0;

        let id = timerModule.setInterval(() => {
          this.progress = this.progress + 10;
          count++;
          console.log(this.progress);

          if (this.progress >= 100) {
            timerModule.clearInterval(id);
          }
        }, 1000);

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
</style>
