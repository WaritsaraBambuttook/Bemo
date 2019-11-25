<template>
  <ScrollView>
    <StackLayout>
      <StackLayout margin="20">
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
        <!-- <Button text="Notification" class="button"></Button> -->
        <Button text="Log out" class="button" @tap="logout" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
<script>
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
    // notification: function() {
    //   this.$navigateTo(noti);
    // },
    logout: function() {
      console.log("logout");

      // firebase
      //   .logout({
      //     type: firebase.LoginType.GOOGLE
      //   })
      //   .then(result => {
      //     console.log(result);
      //     this.$navigateTo(login);
      //   })
      //   .catch(error => console.log(error));
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