<template>
  <v-container text-xs-center grid-list-lg>
    <v-card>
      <v-col class="text-center" cols="12">
        <h2 class="white text-xs-center headline">Users</h2>
      </v-col>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        sort-by="users"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-row>
              <v-col md="3">
                <v-btn
                  color="blue"
                  class="font-weight-black"
                  v-bind="attrs"
                  v-on="on"
                  dark
                  @click="dialog = true"
                >
                  ADD
                </v-btn>
              </v-col>
              <v-col>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-col>
            </v-row>

            <v-spacer></v-spacer>

            <v-col md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                single-line
                hide-details
                solo
              ></v-text-field>
            </v-col>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="255">
      <v-card class="box">
        <v-card-title>
          <strong
            ><p>{{ formTitle }}</p></strong
          >
        </v-card-title>

        <v-form ref="form">
          <v-row class="color: white" cols="9" md="12">
            <v-col cols="10" md="12">
              <v-text-field
                v-model="editedItem.user"
                label="User"
              ></v-text-field>
            </v-col>

            <v-col cols="8" md="12">
              <v-text-field
                type="text"
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="box" no-gutters>
            <v-col cols="6" md="6">
              <v-btn width="70" class="black--text" color="white" @click="close"
                >Cancel</v-btn
              >
            </v-col>

            <v-col cols="6" md="6">
              <v-btn class="white--text" color="blue" @click="save">Save</v-btn>
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
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogRegister: false,
    dialogDelete: false,
    headers: [
      { text: "User", value: "user", width: 300 },
      { text: "Email", value: "email", width: 350 },
      { text: "Actions", value: "actions", sortable: false, width: 150 },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      user: "",
      email: "",
    },
    defaultItem: {
      user: "",
      email: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "USER REGISTRATION" : "EDIT USER";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [];
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped>
.box {
  padding: 22px;
}
</style>
