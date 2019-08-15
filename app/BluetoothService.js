import * as bluetooth from "nativescript-bluetooth";
import * as geolocation from "nativescript-geolocation";
const firebase = require("nativescript-plugin-firebase");
const StartScan = function (callback) {
   
    console.log("start scan .....")
    bluetooth.startScanning({
        onDiscovered: (peripheral) => {
            console.log('start scan. . .')
            console.log('device found with data' + JSON.stringify(peripheral))
            const distance = calculateDistance(peripheral.RSSI).toFixed(2);
            const scan = firebase.firestore.collection("scan");
            //location
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
                        var lat = loc.latitude;
                        var long =loc.longitude;
                       //firebase
                        if(peripheral.UUID){
                            scan.add({
                                id : peripheral.UUID,
                                distance : distance,
                                location : firebase.firestore.GeoPoint(lat,long),
                                time : firebase.firestore.FieldValue.serverTimestamp()
                            }).then(function (doc) {
                            console.log("found id ...." + doc.id);
                            })
                        }
                    }    
                    }, function(e){
                        console.log("Error getLocaton: " + e.message);
                });
                callback({
                uuid: peripheral.UUID,
                distance
            })  
        },
        skipPermissionCheck:true,
    })

}

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
}

const stopScan = async () => {
    console.log('stop scan!')
    return await bluetooth.stopScanning()
}

export {
    StartScan,
    stopScan,
    //checkHasCoarse,
    //checkRequest
}
