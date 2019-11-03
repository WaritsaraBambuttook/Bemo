<template>
  <ScrollView backgroundColor="pink">
    <StackLayout>
      <GridLayout rows="*,auto" columns="*,*">
        <StackLayout row="0" col="0">
          <Image src="~/img/1.jpg" width="100" height="100" />
        </StackLayout>
        <StackLayout row="0" col="1">
          <Label text="name" textWrap="true" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </ScrollView>
</template>
<script>
export default {
  data() {
    return {};
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
</style>