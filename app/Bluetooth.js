import * as bluetooth from "nativescript-bluetooth";
//import * as geolocation from "nativescript-geolocation";
//const firebase = require("nativescript-plugin-firebase");
var dialogs = require("tns-core-modules/ui/dialogs");
const StartScan = function(callback) {
  bluetooth.isBluetoothEnabled().then(function(enabled) {
    console.log(enabled);
    if (enabled == false) {
      dialogs.alert("Open Bluetooth").then(function() {
        console.log("Dialog closed!");
      });
    }
  });
  console.log("start scan .....");

  bluetooth.startScanning({
    seconds: 4,
    onDiscovered: peripheral => {
      console.log("start scan. . .");
      // console.log("device found with data" + JSON.stringify(peripheral));
      const distance = calculateDistance(peripheral.RSSI).toFixed(2);
      callback({
        uuid: peripheral.UUID,
        distance
      });
    },
    skipPermissionCheck: true
  });
  stopScan;
};

const calculateDistance = function calculateDistance(rssi) {
  const txPower = -64;
  if (rssi == 0) {
    return -1.0;
  }
  const ratio = (rssi * 1.0) / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio, 10);
  } else {
    var distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

const stopScan = async () => {
  bluetooth.stopScanning().then(function() {
    console.log("scanning stopped >>>>>>>>>>");
  });
};
export {
  StartScan
  //checkHasCoarse,
  //checkRequest
};
