<template>
  <Page class="page">
    <ActionBar title="Action Items" />
    <StackLayout>
      <SegmentedBar>
        <SegmentedBarItem title="scan" />
        <SegmentedBarItem title="map" />
      </SegmentedBar>
      <GridLayout rows="*,60">
      
      <ScrollView row="0">
        <StackLayout class="home-panel">
          <!--Add your page content here-->
          <Label textWrap="true" text="Play with NativeScript!" class="h2 description-label" />
          <Label
            textWrap="true"
            text="Write code in the editor or drag and drop components to build a NativeScript mobile application."
            class="h2 description-label"
          />
          <Label textWrap="true" text="Scan the QR " class="h2 description-label" />
        </StackLayout>
      </ScrollView>
    </GridLayout>
    </StackLayout>
    
  </Page>
</template>

<script>
 var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
export default {
  data() {
    return {
     
    };
  },
  methods: {
   

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
</style>
