<template>
  <v-app>
    <template>
      <v-card>
          <v-row>
            <v-col cols="12" sm="12" class="text-center black--text">
              <h1>OPERAND</h1>
            </v-col>
          </v-row>

        <router-view></router-view>

      <v-footer padless  app>
      <v-col class="text-center" cols="12">
        <strong>&copy; OPERAND {{new Date().toISOString().substr(0,4)}}</strong>
      </v-col>
    </v-footer>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
        </v-menu>
      </v-card>
    </template>
  </v-app>
</template>

<script>
export default {
  name: `app`,
  props: {
    source: String,
  },

  data: () => ({
    menu: false,
  }),

};
</script>
