<template>
  <v-container text-xs-center grid-list-lg>
    <v-overlay :value="$store.state.modinfo.loading">
      <v-card-text>
        Loading...
        <v-progress-linear
          indeterminate
          color="orange"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-overlay>
    <v-row>
      <v-col md="3">
        <v-btn
          color="orange"
          class="zdex font-weight-black"
          dark
          @click="(dialog = true), resetImput()"
          fixed
          bottom
          right
          fab
          large
        >
          +
        </v-btn>
      </v-col>
      <v-col>
        <v-divider class="mx-4" inset vertical></v-divider>
      </v-col>
    </v-row>

    <v-card>
      <v-col class="text-center" cols="12">
        <h2 class="white text-xs-center headline">Users</h2>
      </v-col>
      <v-data-table
        :headers="headers"
        :items="$store.state.modinfo.users"
        :search="search"
        sort-by="users"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>

            <v-col md="4">
              <v-text-field
                color="orange"
                v-model="search"
                append-icon="mdi-magnify"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editUser(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="(dialogDelete = true), (obj = item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="255">
      <v-card class="dialog">
        <v-snackbar
          :timeout="timeout"
          color="orange"
          bottom
          fixed
          shaped
          elevation="24"
          v-model="bar"
          class="front"
        >
          {{ print }}
        </v-snackbar>

        <v-card-title>
          <strong
            ><p>{{ formTitle }}</p></strong
          >
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="color: white" cols="9" md="12">
            <v-col cols="10" md="12">
              <v-text-field
                color="orange"
                v-model="$store.state.modinfo.username"
                label="User"
                :rules="userRules"
                v-on:keyup.enter="validate"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="8" md="12">
              <v-text-field
                color="orange"
                type="text"
                v-model="$store.state.modinfo.email"
                label="Email"
                :rules="emailRules"
                v-on:keyup.enter="validate"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="box" no-gutters>
            <v-col cols="6" md="6">
              <v-btn
                width="70"
                class="black--text"
                color="white"
                @click="dialog = false"
                >Cancel</v-btn
              >
            </v-col>

            <v-col cols="6" md="6">
              <v-btn class="white--text" color="orange" @click="validate()"
                >Save</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="180px">
      <v-card>
        <v-card-title>
          <v-flex xs12>
            <h3 class="headline mb-3">Attention!</h3>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 class="text-xs-center-important font-weight-black">
            Really want to delete the user?
            <br />
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="orange darken-1" text @click="deleteUser(obj)"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    print: "enter an user and email!",
    dialog: false,
    dialogRegister: false,
    dialogDelete: false,
    valid: true,
    bar: false,
    headers: [
      { text: "User", value: "username", width: 300 },
      { text: "Email", value: "email", width: 350 },
      { text: "Actions", value: "actions", sortable: false, width: 150 },
    ],
    obj: {},
    editedItem: {
      username: "",
      email: "",
    },
    defaultItem: {
      username: "",
      email: "",
    },
    timeout: 1600,
    userRules: [(v) => !!v || "Enter an user!"],
    emailRules: [
      (v) => !!v || "Enter an email!",
      (v) => /.+@.+\..+/.test(v) || "Enter a valid email address!",
    ],
  }),

  computed: {
    ...mapGetters(["id, username, email, item, editedIndex, loading"]),

    id: {
      get() {
        return this.$store.state.id;
      },

      set(newId) {
        this.$store.commit("SET_ID", newId);
      },
    },

    username: {
      get() {
        return this.$store.state.editedItem.username;
      },

      set(newUsername) {
        this.$store.commit("SET_USER", newUsername);
      },
    },

    email: {
      get() {
        return this.$store.state.editedItem.email;
      },

      set(newEmail) {
        this.$store.commit("SET_EMAIL", newEmail);
      },
    },

    editedIndex: {
      get() {
        return this.$store.state.editedIndex;
      },

      set(newEditedIndex) {
        this.$store.commit("SET_EDITED_INDEX", newEditedIndex);
      },
    },

    item: {
      get() {
        return this.$store.state.item;
      },

      set(newItem) {
        this.$store.commit("SET_ITEM", item);
      },
    },

    loading: {
      get() {
        return this.$store.state.loading;
      },

      set(newLoading) {
        this.$store.commit("SET_LOADING", newLoading);
      },
    },

    formTitle() {
      return this.$store.state.modinfo.editedIndex === -1
        ? "USER REGISTRATION"
        : "EDIT USER";
    },
  },

  methods: {
    validate() {
      if (this.userRules && this.emailRuless) {
        this.$refs.form.validate();
        this.bar = true;
      } else if (this.$refs.form.validate() != false) {
        this.saveUser();
      }
    },

    async initializeUsers() {
      await this.$store.dispatch("initializeUsers");
    },

    async getUser(item) {
      await this.$store.dispatch("getUser");
    },

    async saveUser() {
      this.dialog = false;
      this.$store.state.modinfo.editedItem = {};
      this.$store.dispatch("saveUser");
    },

    async deleteUser(item) {
      this.$store.state.modinfo.item = item;
      this.dialogDelete = false;
      await this.$store.dispatch("deleteUser");
    },

    editUser(item) {
      this.$store.state.modinfo.editedIndex = item.id;
      this.$store.state.modinfo.id = item.id;
      this.$store.state.modinfo.username = item.username;
      this.$store.state.modinfo.email = item.email;
      this.dialog = true;
      this.editedItem = Object.assign(item, {});
    },

    resetImput() {
      this.$store.state.modinfo.username = "";
      this.$store.state.modinfo.email = "";
      this.$store.state.modinfo.editedIndex = -1;
    },
  },

  created() {
    this.initializeUsers();
  },
};
</script>
<style scoped>
.box {
  padding: 23px;
}

.zdex {
  z-index: 100;
}

.dialog {
  border-radius: 20px;
  padding: 23px;
}
</style>
