import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
Vue.use(Vuex);

const SET_ID = "SET_ID";
const SET_USERS = "SET_USERS";
const SET_USERNAME = "SET_USERNAME";
const SET_EMAIL = "SET_EMAIL";
const SET_ITEM = "SET_ITEM";
const SET_EDITED_INDEX = "SET_EDITED_INDEX";
const SET_LOADING = "SET_LOADING";

const moduleInfo = {
  state: {
    id: null,
    users: [],
    username: "",
    email: "",
    item: {},
    editedIndex: -1,
    loading: false,
  },
  getters: {
    id: (state) => {
      return state.id;
    },
    users: (state) => {
      return state.users;
    },
    username: (state) => {
      return state.username;
    },
    email: (state) => {
      return state.email;
    },
    item: (state) => {
      return state.item;
    },
    editedIndex: (state) => {
      return state.editedIndex;
    },
    loading: (state) => {
      return state.loading;
    },
  },
  mutations: {
    [SET_ID](state, id) {
      state.id = id;
    },
    [SET_USERS](state, users) {
      state.users = users;
    },
    [SET_USERNAME](state, username) {
      state.username = username;
    },
    [SET_EMAIL](state, email) {
      state.email = email;
    },
    [SET_ITEM](state, item) {
      state.item = item;
    },
    [SET_EDITED_INDEX](state, editedIndex) {
      state.editedIndex = editedIndex;
    },
    [SET_LOADING](state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async initializeUsers({ state }) {
      state.loading = true;
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          state.users = response.data;
          state.loading = false;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!!"
          );
        });
    },

    async getUser({ state }) {
      axios
        .get(`https://localhost:3000/${state.item.id}`)
        .then((response) => {
          state.users = response.data;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },

    async saveUser({ dispatch, state }) {
      if (state.editedIndex > -1) {
        axios
          .put(`http://localhost:3000/users/${state.id}`, {
            id: state.id,
            username: state.username,
            email: state.email,
          })
          .then(() => {
            return dispatch("initializeUsers");
          })
          .catch(() => {
            Vue.toasted.error(
              "Something is wrong and we are already solving it, try again later!"
            );
          });
      } else {
        axios
          .post(`http://localhost:3000/users/`, {
            username: state.username,
            email: state.email,
          })
          .then(() => {
            return dispatch("initializeUsers");
          })
          .catch(() => {
            Vue.toasted.error(
              "Something is wrong and we are already solving it, try again later!"
            );
          });
      }
    },

    async deleteUser({ dispatch, state }) {
      axios
        .delete(`http://localhost:3000/users/${state.item.id}`)
        .then(() => {
          return dispatch("initializeUsers");
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },
  },
};

const store = new Vuex.Store({
  modules: {
    modinfo: moduleInfo,
  },
});

export default store;
