import vue from "vue";
import Vuex from "vuex";
vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dataAboutUser: ""
    // Notification: "0"
  },
  mutations: {
    setdataAboutUser(state, dataAboutUser) {
      state.dataAboutUser = dataAboutUser;
    }
    // setNotification(state, Notification) {
    //   state.Notification = Notification;
    // }
  },
  getters: {
    dataAboutUser: state => state.dataAboutUser
  }
});
