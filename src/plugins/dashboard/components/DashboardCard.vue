<template>
  <div :style="{ width: `${width}` }" class="card" :id="id">
    <v-card :color="card.components.main.color" :width="width" hover raised>
      <v-card-title class="head-drag">
        <v-icon v-if="card.components.main.icon" large left>{{card.components.main.icon}}</v-icon>
        <span
          v-if="card.components.main.title"
          class="title font-weight-light ml-2"
        >
          {{card.components.main.title}}
        </span>
        <v-spacer/>
        <v-progress-circular v-if="loading" indeterminate :size="20" :width="3" color="primary"></v-progress-circular>
        <v-menu lazy bottom offset-y>
          <v-btn slot="activator" flat icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="hasSettings" @click.stop="openSettings()">
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="remove()">
              <v-list-tile-title>Remove</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text :style="{ height: `${height}px` }">
        <component :is="card.components.main.component" @loading="onLoading"/>
      </v-card-text>
    </v-card>
    <v-dialog v-if="hasSettings" v-model="displaySettings" max-width="800px">
      <dashboard-card-settings
        :card="card"
        :settings="card.settings"
        :view="card.components.settings.component"
        @close="displaySettings = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import DashboardCardSettings from "./DashboardCardSettings.vue";

export default {
  name: "DashboardCard",
  props: {
    id: String,
    card: {
      type: Object,
      required: true
    },
    height: {
      type: Number
    },
    width: {
      type: String,
      default: "400px"
    }
  },
  data: () => ({
    loading: false,
    displaySettings: false
  }),
  methods: {
    onLoading(value) {
      this.loading = value;
    },
    remove() {
      this.$emit("deleted");
    },
    openSettings() {
      this.displaySettings = true;
    }
  },
  computed: {
    hasSettings() {
      return !!this.card.components.settings;
    }
  },
  components: {
    DashboardCardSettings
  }
};
</script>

<style lang="stylus" scoped>
.card {
  min-width: 400px;
  min-height: 150px;
  margin: 15px;
  position: absolute;
  z-index: 1;

  .v-card {
    overflow-x: hidden;
    .v-toolbar__title {
      font-weight: normal;
      text-transform: capitalize;
    }
    .v-toolbar--absolute {
      background-color: transparent!important;
    }
    .subheading {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .head-drag {
      cursor: grab;
    }
    >>> .scroller {
      max-height: 302px;
      overflow-y: auto;
    }
  }
}

.muuri-item-dragging {
  z-index: 3 !important;
  .head-drag {
    cursor: grabbing!important;
  }
}

.muuri-item-releasing {
  z-index: 2 !important;
}

.muuri-item-hidden {
  z-index: 0 !important;
}

</style>
