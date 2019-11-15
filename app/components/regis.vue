<script>
import { login } from "nativescript-plugin-firebase";
// import { __values } from 'tslib';

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyA8jlBKxQ0_ATqAmDqY5TjViB5K8V9OVrk",
            authDomain: "bemo-c5ae7.firebaseapp.com",
        };
        firebase.initializeApp(config);
</script>
<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/img/Bemo.png"/>
                <Label class="header" text="FINDING BEMO"></Label>

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField class="email" hint="Email" v-model="email" />
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="password" hint="Password" secure="true" v-model="password"/>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
                    
                </GridLayout>
                <Button text="REGISTER" @tap="register" class="btn btn-primary m-t-20"></Button> 
                
            </StackLayout>

            
        </FlexboxLayout>
    </Page>
</template>
<script>
var firebase = require("nativescript-plugin-firebase");
import login from "./login";
export default {
  
  data() {
   
    return {
      email: "",
      password: ""
      
    };
  },
  methods: {
// // const userService = {
//   async register(user) {
//     return await firebase.createUser({
//       email: user.email,
//       password: user.password
//     });
//   }
// // };
register: function() {
      firebase.createUser({
      email: this.email,
      password: this.password

    })
    .then(result => {
        
    //     // Vue.prototype.$result = JSON.stringify(result);
    //     // console.log(JSON.stringify(result));
        
    //     // this.$user = result;
    //     console.log(this.email);
    //     console.log(test);
    //     // this.$navigateTo(username, {props: {user:this.$user}});
        this.$navigateTo(login);
        }) 
      
    //   .catch(error => console.log(error)

    //   );

    


  }
  }
}
</script>
<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        /* horizontal-align: center; */
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #D51A1A;
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
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
