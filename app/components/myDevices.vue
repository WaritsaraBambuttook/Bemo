<template>
  <StackLayout orientation="vertical" horizontalAlignment="center">
    <ScrollView>
      <StackLayout>
        <Label text="My Device" textWrap="true" height="50" fontSize="24" margin="10" />
        <ListView
          class="list-group"
          for="item in items"
          @itemTap="onItemTap"
          height="500"
          rowHeight="50"
        >
          <v-template>
            <FlexboxLayout flexDirection="row" class="list-group-item">
              <Label :text="item.name" class="list-group-item-heading" style="width: 100%" />
            </FlexboxLayout>
          </v-template>
        </ListView>
        <Button class="button" text="Add" @tap="addDevices" />
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script>
import { log } from "util";
import AddDevice from "./AddDevice";
import detail_item from "./showMap";
var firebase = require("nativescript-plugin-firebase");

export default {
  // name: item,
  // props: ['user'],
  data() {
    return {
      items: [],
      // email: this.user.email
    };
  },
  methods: {
    addDevices: function() {
      // const test = email;
      // console.log(""+this.$email);
      
      this.$navigateTo(AddDevice);console.log("test");
      console.log("add");
      
    },
    onItemTap: function(event) {
      console.log("You tapped: " + this.$data.items[event.index].name);
      this.$navigateTo(detail_item, {
        props: { items: this.$data.items[event.index] }
      });
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
      //ส่งค้า email มาใส่
      let email = "a.a@email.com";
      if (email == doc.data().email) {
        //console.log(doc.data());
        this.items.push(doc.data());
      }
    });
  },
  

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
.list-group {
  border-color: #d3d3d3;
  border-right-width: 2;
}
</style>
