<template>
  <v-app>
    <template>
      <v-container text-xs-center grid-list-lg>
        <v-col cols="12" sm="12" class="d-flex justify-center">
          <img height="80px" :src="require('../../assets/images/logo.webp')" />
        </v-col>

        <datatable />

        <v-footer padless app>
          <v-col class="text-center" cols="12">
            <strong
              >&copy; OPERAND
              {{ new Date().toISOString().substr(0, 4) }}</strong
            >
          </v-col>
        </v-footer>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
        </v-menu>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import Datatable from "./components/Datatable.vue";
export default {
  name: `app`,
  props: {
    source: String,
  },
  components: {
    Datatable,
  },

  data: () => ({
    menu: false,
  }),
};
</script>
