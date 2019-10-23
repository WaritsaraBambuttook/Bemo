<template lang="html">
  <Page actionBarHidden="true">
    <!-- <ActionBar>
      <StackLayout orientation="horizontal">
        <Label text="Bemo" fontSize="24" verticalAlignment="center" width="80%" />
        <Image class="btnImg" src="~/img/1.jpg" width="40" height="40" verticalAlignment="right" />
      </StackLayout>
    </ActionBar> -->
       
    <RadSideDrawer  ref="drawer">
      <StackLayout ~drawerContent backgroundColor="beige" >
       
           <Label class="drawer-header" text="Drawer" />
         
            <Label class="drawer-item" text="Item 1" />
           <Label class="drawer-item" text="Item 2"/>
            <Label class="drawer-item" text="Item 3" />
       
          
         
         <Button class="drawer-close-button" text="CLOSE"  @tap="$refs.drawer.nativeView.closeDrawer()" />
      </StackLayout>
<GridLayout class="bg" ~mainContent rows="*" columns="*">
  <Frame>
    <Page>
      <!-- <ActionBar>
      <StackLayout orientation="horizontal">
        <Label text="Bemo" fontSize="24" verticalAlignment="center" width="80%" />
        <Image class="btnImg" src="~/img/1.jpg" width="40" height="40" verticalAlignment="right" />
      </StackLayout>
    </ActionBar> -->
       <ActionBar>
      <GridLayout width="100%" columns="auto,*">
        <!-- <Image class="btnImg" src="~/img/1.jpg" width="40" height="40" verticalAlignment="right" col="0"  @tap="$refs.drawer.nativeView.showDrawer()"/> -->
        <Label text="Menu" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
        <Label class="title" text="Bemo" col="1" />
      </GridLayout>
    </ActionBar>

 <StackLayout>
      <SegmentedBar @selectedIndexChange="indexChange" row="0">
        <SegmentedBarItem title="device" />
        <SegmentedBarItem title="Scan" />
        <SegmentedBarItem title="Map" />
        <SegmentedBarItem title="Status" />
        <!-- <SegmentedBarItem title="detail" /> -->
      </SegmentedBar>
      <GridLayout rows="*">
        <ScrollView row="1">
          <StackLayout>
            <component v-bind:is="component"></component>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </StackLayout>
    </Page>
  </Frame>
 
</GridLayout>
    </RadSideDrawer>
    
    
  </Page>
</template>
<script>
var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
import map from "./map.vue";
import scan from "./App.vue";
import myDevice from "./Menu";
import status from "./status";
import { Observable } from "tns-core-modules/ui/page/page";

export default {
  components: {
    c0: myDevice,
    c1: scan,
    c2: map,
    c3: status
  },
  data() {
    return {
      component: "c0"
    };
  },
  methods: {
    indexChange: function(args) {
      let newIndex = args.value;
      this.component = "c" + newIndex;
      console.log("Current tab index: " + this.component);
    }
  }
};
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}
/* .btn {
  border: none;
  outline: none;
  margin: -5;
  font-size: 15;
text-transform: none;
} */
.description-label {
  margin-bottom: 15;
}
.btnImg {
  border-radius: 50%;
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
  padding: 80 40 40 40;
  margin-bottom: 20;
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
