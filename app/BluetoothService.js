import * as bluetooth from "nativescript-bluetooth";
const firebase = require("nativescript-plugin-firebase");
const StartScan = function (callback) {
   
    console.log("start scan .....")
    bluetooth.startScanning({
        onDiscovered: (peripheral) => {
            console.log('start scan. . .')
            console.log('device found with data' + JSON.stringify(peripheral))
            const distance = calculateDistance(peripheral.RSSI).toFixed(2);
            const user = firebase.firestore.collection("user");
                if(peripheral.UUID === "66:AF:30:B7:74:37"){
                    user.add({
                        id : peripheral.UUID
                    }).then(function (doc) {
                    console.log("found id ...." + doc.id);
                    })
                }
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
