<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image
          class="btnImg"
          src="~/img/Bemo.png"
          width="40"
          height="40"
          verticalAlignment="right"
        />
        <Label text="Add Devices" fontSize="24" verticalAlignment="center" />
      </StackLayout>
    </ActionBar>

    <GridLayout rows="*" columns="*">
      <StackLayout row="0" col="0">
        <Button text="Back" @tap="Back" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { log } from "util";
var firebase = require("nativescript-plugin-firebase");
import bluetooth, { isBluetoothEnabled } from "nativescript-bluetooth";
import * as BluetoothService from "../BluetoothService";
import myDevices from "./myDevices";
export default {
  data() {
    return {
      name: [],
      UUID: []
    };
  },
  methods: {
    Back: function() {
      this.$navigateBack(myDevices);
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
</style>
