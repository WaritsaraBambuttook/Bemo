import vue from "vue";
import Vuex from "vuex";
vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dataAboutUser: "f"
  },
  mutations: {
    setdataAboutUser(state, dataAboutUser) {
      state.dataAboutUser = dataAboutUser;
    }
  },
  getters: {
    dataAboutUser: state => state.dataAboutUser
  }
});
