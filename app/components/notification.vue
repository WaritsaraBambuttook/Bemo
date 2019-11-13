<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Notification">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="BacktoBemo" />
    </ActionBar>

    <ScrollView>
      <StackLayout>
        <card-view
          margin="10"
          elevation="40"
          radius="1"
          v-for="detail in detail"
          :key="detail.heading"
        >
          <StackLayout orientation="horizontal">
            <Image src="~/img/Bemo.png" width="100" height="100" />
            <StackLayout>
              <label :text="detail.heading" margin="10"></label>
              <label :text="detail.content" margin="10"></label>
            </StackLayout>
          </StackLayout>
        </card-view>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
export default {
  data() {
    return {
      detail: [
        {
          heading: "Bulbasaur",
          content:
            "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger."
        },
        {
          heading: "Ivysaur",
          content:
            "To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon."
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.title {
  font-size: 20;
  color: black;
}
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
</style>