<template>
  <ScrollView>
    <StackLayout>
      <StackLayout orientation="horizontal" margin="10">
        <Image src="~/img/1.jpg" width="50%" height="50%" class="images" />

        <StackLayout margin="20" horizontalAlignment="center">
          <Label text="name" textWrap="true" class="size" margin="10" />
          <Label text="emal" textWrap="true" class="size" margin="10" />
        </StackLayout>
      </StackLayout>
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
.images {
  border-radius: 50%;
}
.size {
  font-size: 20px;
}
</style>