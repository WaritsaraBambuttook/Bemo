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
          rowHeight="150"
        >
          <v-template>
            <FlexboxLayout flexDirection="row" class="list-group-item">
              <Image :src="item.url" class="image" width="170" />
              <Label :text="item.name" class="list-group-item-heading" style="width: 100%" />
            </FlexboxLayout>
          </v-template>
        </ListView>
        <Button class="but" text="Add new Bemo" @tap="addDevices" margin="10" />
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
  ops: ["user"],
  data() {
    return {
      items: [],
      email: []
    };
  },
  methods: {
    addDevices: function() {
      this.$navigateTo(AddDevice, {
        props: { email: this.$data.email }
      });
      console.log("test");
      console.log("add");
    },
    onItemTap: function(event) {
      console.log("You tapped: " + this.$data.items[event.index].name);
      this.$navigateTo(detail_item, {
        props: {
          items: this.$data.items[event.index],
          email: this.$data.email
        }
      });
    }
  },
  async mounted() {
    let dataInStore = this.$store.getters.dataAboutUser;
    console.log(dataInStore.email);
    this.email = dataInStore.email;

    const query = await firebase.firestore
      .collection("item")
      .get({ source: "server" });
    query.forEach(doc => {
      let detail = this.email;
      if (detail == doc.data().email) {
        this.items.push(doc.data());
      }
    });
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
.button {
  color: red;

  margin-top: 20px;
  background-color: aqua;
}
.but {
  background-color: #304451;
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
.list-group-item-heading {
  font-size: 18;
}
</style>
