<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Widget Store</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 md6 v-for="card in cards" :key="card.name">
                <widget-store-card :card="card" @add="useCard(card)"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import WidgetStoreCard from "@/components/WidgetStoreCard.vue";
import Modules from "@/modules";

export default {
  name: "WidgetStore",
  data: () => ({
    dialog: false,
  }),
  computed: {
    cards() {
      return Modules.getAllDescription().map(module => {
        module.available = !this.$store.state.card.cards.includes(module.name);

        return module;
      });
    }
  },
  methods: {
    useCard(card) {
      this.$emit("add", card.name);
    }
  },
  components: {
    WidgetStoreCard
  }
}
</script>
