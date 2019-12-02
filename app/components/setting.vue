<template>
  <ScrollView>
    <StackLayout>
      <StackLayout height="50" horizontalAlignment="center" margin="20">
        <Label text="My Profile" textWrap="true" class="profile" />
      </StackLayout>
      <StackLayout>
        <Image :src="this.detail.photoURL" width="50%" height="50%" class="images" />
        <StackLayout margin="20" horizontalAlignment="center">
          <Label
            :text="'name : '+ this.detail.displayName"
            textWrap="true"
            class="size"
            margin="10"
          />
          <Label :text="'email : '+this.detail.email " textWrap="true" class="size" margin="10" />
        </StackLayout>
      </StackLayout>
      <StackLayout margin="20">
        <Button text="Log out" class="button" @tap="logout" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
<script>
import { log } from "util";
import noti from "./notification";
var firebase = require("nativescript-plugin-firebase");
import login from "./login";
export default {
  data() {
    return {
      detail: []
    };
  },
  methods: {
    logout: function() {
      console.log("logout");
      firebase.logout().then(() => {
        this.$navigateTo(login, { clearHistory: true });
      });
    }
  },
  async mounted() {
    let dataInStore = this.$store.getters.dataAboutUser;
    console.log(dataInStore);
    this.detail = dataInStore;
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
.images {
  border-radius: 50%;
}
.size {
  font-size: 18px;
  color: #0000;
}
.button {
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
.profile {
  font-size: 22px;
  color: #0000;
}
</style>