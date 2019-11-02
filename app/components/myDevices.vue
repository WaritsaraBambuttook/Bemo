<template>
  <StackLayout orientation="vertical" horizontalAlignment="center">
    <ScrollView>
      <GridLayout rows="auto,100,*" columns="*,*,auto">
        <StackLayout row="0" col="0">
          <Label text="My Device" textWrap="true" height="50" fontSize="24" margin="10" />
        </StackLayout>

        <StackLayout row="1" col="0">
          <ListView for="item in items" class="list-group" @itemTap="onItemTap" fontSize="20">
            <v-template>
              <GridLayout class="list-group-item" rows="*" columns="*">
                <Label row="0" col="1" :text="item.name" />
              </GridLayout>
            </v-template>
          </ListView>
        </StackLayout>

        <StackLayout orientation="horizontal" row="2" col="1" margin="10">
          <Button class="button" text="Add" @tap="addDevices" />
        </StackLayout>
      </GridLayout>
    </ScrollView>
  </StackLayout>
</template>

<script>
import { log } from "util";
import add from "./AddDevice";
var firebase = require("nativescript-plugin-firebase");

export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    addDevices: function() {
      this.$navigateTo(add);
      console.log("add");
    },
    onItemTap: function(event) {
      console.log("You tapped: " + this.$data.items[event.index].name);
    }

    // notify: function(message) {
    //   console.log("Title: " + message.title);
    //   console.log("Body: " + message.body);
    //   const confirmOptions = {
    //     title: message.title,
    //     message: message.body,
    //     okButtonText: "Scan",
    //     cancelButtonText: "Cancel"
    //   };
    //   confirm(confirmOptions).then(result => {
    //     console.log(result);
    //     if (result == true) {
    //       console.log("scan button");
    //       this.$navigateTo(pageApp);
    //       //this.changePage = pageApp;
    //     } else {
    //       console.log("cancel button");
    //     }
    //   });
    // }
  },
  async mounted() {
    const query = await firebase.firestore
      .collection("item")
      .get({ source: "server" });
    query.forEach(doc => {
      //console.log(doc.data());
      this.items.push(doc.data());
    });
  }

  // created() {
  //   firebase
  //     .init({
  //       onMessageReceivedCallback: this.notify
  //     })
  //     .then(
  //       function() {
  //         console.log("firebase.init done");
  //         firebase
  //           .subscribeToTopic("news")
  //           .then(() => console.log("Subscribed to topic"));
  //       },
  //       function(error) {
  //         console.log("firebase.init error: " + error);
  //       }
  //     );
  // }
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
