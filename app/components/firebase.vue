<template>
  <Page>
    <ActionBar title="Detail">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoScanpage" />
    </ActionBar>
    <ScrollView backgroundColor="pink">
        
      <StackLayout>
        <Label
          v-for="detail in details"
          :key="detail.id"
          textWrap="true"
          horizontalAlignment="center"
        >ID : {{detail.tagID}} Distance : {{detail.distance}} location : {{detail.location}} time : {{detail.time}}</Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
const firebase = require("nativescript-plugin-firebase");
export default {
  data() {
    return {
      details: [],
    };
  },
  mounted() {
    const scan = firebase.firestore.collection("scan");
    scan.get({ source: "server" }).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(`${doc.data().id} => ${JSON.stringify(doc.data())}`);
        // this.tagID.push(doc.data().id);
        // this.distance.push(doc.data().distance);
        // this.location.push(doc.data().location);
        // this.time.push(doc.data().time);
        this.details.push({
          tagID: doc.data().id,
          distance: doc.data().distance,
          location: doc.data().location,
          time: doc.data().time
        });
        console.log(this.details);
      });
    });
  },
  methods: {
    BacktoScanpage: function() {
      console.log("Back to Scan page");
      this.$navigateBack();
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

.description-label {
  margin-bottom: 15;
}
</style>