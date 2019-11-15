<template>
  <ScrollView>
    <StackLayout>
      <StackLayout margin="20">
        <Image src="~/img/1.jpg" width="50%" height="50%" class="images" />

        <StackLayout margin="20" horizontalAlignment="center">
          <Label text="name : waritsara" textWrap="true" class="size" margin="10" />
          <Label text="emal : four_nukiz@hotmail.com" textWrap="true" class="size" margin="10" />
        </StackLayout>
      </StackLayout>

      <StackLayout margin="20">
        <Button text="Notification" class="button" @tap="notification"></Button>
        <Button text="Log out" class="button" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
<script>
import noti from "./notification";
export default {
  data() {
    return {};
  },

  methods: {
    notification: function() {
      this.$navigateTo(noti);
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
.images {
  border-radius: 50%;
}
.size {
  font-size: 20px;
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