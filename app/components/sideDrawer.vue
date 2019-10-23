<template lang="html">
  <Page actionBarHidden="true">
   
    <RadSideDrawer  ref="drawer">
      <StackLayout ~drawerContent background-color="pink">
           <Label class="drawer-header" text="Drawer" />
         
            <Label class="drawer-item" text="Item 1" />
           <Label class="drawer-item" text="Item 2"/>
            <Label class="drawer-item" text="Item 3" />
         
         <Button class="drawer-close-button" text="CLOSE"  @tap="$refs.drawer.nativeView.closeDrawer()" />
      </StackLayout>
<GridLayout class="bg" ~mainContent rows="*" columns="*">
  <Frame>
    <Page>
       <ActionBar>
      <GridLayout width="100%" columns="auto,*">
        <Label text="Menu" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
        <Label class="title" text="Drawer" col="1" />
      </GridLayout>
    </ActionBar>
 <Label class="message" :text="msg" col="0" row="0"/>
    </Page>
  </Frame>
 
</GridLayout>
    </RadSideDrawer>
  </Page>
</template>
<script>
var RadSideDrawer = require("nativescript-ui-sidedrawer");
export default {
  data() {
    return {
      msg: "hello world"
    };
  },

  methods: {}
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
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-close-button {
  margin-top: 20;
  padding: 10 10 10 10;
  background-color: #53ba82;
  color: #ffffff;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #333333;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>