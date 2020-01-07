<template>
  <div :style="{ width: `${width}px` }" class="card" :id="id">
    <v-card :color="card.components.main.color" :width="width" hover raised>
      <v-card-title class="head-drag">
        <v-icon v-if="card.components.main.icon" large left>{{card.components.main.icon}}</v-icon>
        <span
          v-if="title"
          class="title font-weight-light ml-2"
        >
          {{title}}
        </span>
        <v-spacer/>
        <v-progress-circular v-if="loading" indeterminate :size="20" :width="3" color="primary"></v-progress-circular>
        <v-menu lazy bottom offset-y>
          <v-btn slot="activator" flat icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="hasSettings" @click.stop="openSettings()">
              <v-list-tile-title>{{$t("Settings")}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="pr-5">{{$t("Width")}}</v-list-tile-title>
              <v-list-tile-action class="width-buttons">
                <v-btn icon flat :disabled="!canDecrease" @click="decreaseSize">
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-btn icon flat :disabled="!canIncrease" @click="increaseSize">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile @click="remove()">
              <v-list-tile-title>{{$t("Remove")}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text :style="{ height: `${height}px` }">
        <v-container
          v-if="hasSettings && !isCorrectlyConfigured"
          pt-0 align-center justify-center align-content-center d-flex :style="{flexDirection: 'column'}"
        >
          <v-flex pb-2>
            <span class="title font-weight-light grey--text text--darken-1">
              {{$t("This widget needs to be configured")}}
            </span>
          </v-flex>
          <v-flex>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" @click="openSettings()" v-on="on">{{$t("Settings")}}</v-btn>
              </template>
              <span>{{$t("Click to configure widget")}}</span>
            </v-tooltip>
          </v-flex>
        </v-container>
        <component
          v-else
          :is="card.components.main.component"
          :id="card.id"
          :settings="card.settings"
          @loading="onLoading"
          @error="onError"
          @updateTitle="onTitleUpdate"
        />
        <v-container
          v-if="error"
          pt-0 align-center justify-center align-content-center d-flex :style="{flexDirection: 'column'}"
        >
          <v-flex pb-2>
            <span class="title font-weight-light red--text text--darken-1">
              {{$t(error)}}
            </span>
          </v-flex>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-if="hasSettings" v-model="displaySettings" max-width="800px">
      <dashboard-card-settings
        :card="card"
        :dashboard="dashboard"
        :settings="card.settings"
        :view="card.components.settings.component"
        @close="displaySettings = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import DashboardCardSettings from "./DashboardCardSettings.vue";

const MAX_COLUMNS = 3;
const COLUMN_WIDTH = 400;

export default {
  name: "DashboardCard",
  props: {
    id: String,
    card: {
      type: Object,
      required: true
    },
    dashboard: {
      type: Object,
      required: true
    },
    height: {
      type: Number
    }
  },
  data: () => ({
    loading: false,
    error: null,
    displaySettings: false,
    updatedTitle: null,
    columns: 1
  }),
  methods: {
    onLoading(value) {
      this.loading = value;
      if (this.loading) {
        this.error = null;
      }
    },
    onError(msg) {
      this.error = msg;
    },
    onTitleUpdate(value) {
      this.updatedTitle = value;
    },
    remove() {
      this.$emit("deleted");
    },
    openSettings() {
      this.displaySettings = true;
    },
    increaseSize() {
      this.columns++;
      this.setNewSize();
    },
    decreaseSize() {
      this.columns--;
      this.setNewSize();
    },
    setNewSize() {
      this.$store.dispatch("dashboard/updateCardColumns", {
        dashboard: this.dashboard,
        card: this.card,
        columns: this.columns
      });
    }
  },
  computed: {
    width() {
      return COLUMN_WIDTH * this.columns + 30 * (this.columns - 1);
    },
    canDecrease() {
      return this.columns > 1;
    },
    canIncrease() {
      return this.columns === 1 || this.columns < MAX_COLUMNS;
    },
    hasSettings() {
      return !!this.card.components.settings;
    },
    title() {
      return this.updatedTitle || this.card.components.main.title;
    },
    isCorrectlyConfigured() {
      const widget = this.$dashboard.getWidget(this.card.type);

      if (!widget || !widget.settings || !widget.settings.validate) {
        return true;
      }

      return widget.settings.validate(this.card.settings);
    }
  },
  mounted() {
    this.columns = (this.card.settings && this.card.settings.columns) || this.card.components.main.columns || 1;
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

.width-buttons {
  flex-direction: row;
  align-items: center;
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
