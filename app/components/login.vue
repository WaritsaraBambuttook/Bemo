<script>
import { login, fetchSignInMethodsForEmail } from "nativescript-plugin-firebase";


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA8jlBKxQ0_ATqAmDqY5TjViB5K8V9OVrk",
  authDomain: "bemo-c5ae7.firebaseapp.com"
};
firebase.initializeApp(config);
</script>
<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/img/Bemo.png" />
        <Label class="header" text="FINDING BEMO"></Label>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="email" hint="Email" v-model="email" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="password" hint="Password" secure="true" v-model="password" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
        </GridLayout>
        <Button text="Sign In" @tap="login" class="btn btn-primary m-t-20 login"></Button>
        <Button text="Sign In With Google" class="google" @tap="google"></Button>
        
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>
<script>
import bemo from "./bemo";
var firebase = require("nativescript-plugin-firebase");
import regis from "./regis";
var Toast = require("nativescript-toast");
var dialogs = require("tns-core-modules/ui/dialogs");
export default {
  name: "user",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
     console.log("mounted")
       firebase.getCurrentUser()
      .then(user => {
          console.log("User uid: " + user.uid)
          this.$navigateTo(bemo, {
            props: { user: user, indexChangeTap: 0, text: "3" }
          });
      })
      .catch(error => console.log("Trouble in paradise: " + error));
  },
  methods: {
    
    login: function() {
      console.log("login");

      firebase
        .login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: this.email,
            password: this.password
          }
        })
        .then(result => {
          

          this.$user = result;
          
          this.$navigateTo(bemo, {
            props: { user: this.$user, indexChangeTap: 0, text: "3" }
          });
        })

        .catch(error => {
          console.log(error);
          dialogs.alert("email and password incorrect").then(function() {
            console.log("Dialog closed!");
          });
        });
    },
    async mounted() {
        console.log("mounted")
       firebase.getCurrentUser()
      .then(user => console.log("User uid: " + user.uid))
      .catch(error => console.log("Trouble in paradise: " + error));

  
  },
    
    google: async function() {
      console.log("googleeeeeeee");
      firebase
        .login({
          type: firebase.LoginType.GOOGLE,
          googleOptions: {
            scopes: [
              "https://www.googleapis.com/auth/userinfo.email",
              "https://www.googleapis.com/auth/userinfo.profile"
            ]
          }
        })
        .then(result => {
          var data = JSON.stringify(result);
          console.log("RESULT " + JSON.stringify(result));
          
          this.$user = result;
          
          this.$navigateTo(bemo, {
            props: { user: this.$user, indexChangeTap: 0, text: "3" }
          });
        })
        .catch(error => {
          console.log("google :" + error);
          dialogs
            .alert("email and password incorrect" + error)
            .then(function() {
              console.log("Dialog closed!");
            });
        });

      
    }
  }
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
  background-color: #143059;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 150;
  font-weight: bold;
}

.header {
  /* horizontal-align: center; */
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}
.input {
  font-size: 18;
  /* placeholder-color: #A8A8A8; */
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
}

.login-label {
  /* horizontal-align: center; */
  color: #f8f2f2;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
.google {
  background-color: #fb7452;
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
.login {
  background-color: #006300;
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
.email {
  color: white;
}
.password {
  color: white;
}
</style>
