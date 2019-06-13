<template>
  <v-container id="card-grid" fluid data-test="dashboard-card-grid">
    <div id="card-container" ref="container">
      <dashboard-card
        v-resize
        v-for="card in cards"
        :ref="card.id"
        :card="card"
        :dashboard="dashboard"
        :id="card.id"
        :key="card.id"
        @deleted="removeCard(card)"
      />
    </div>
    <transition name="fade">
      <div v-if="!cards || !cards.length" id="no-cards">
        <v-icon color="primary" size="80px" dark>widgets</v-icon>
        <span class="pt-2 text-xs-center grey--text">
          {{ $t('There are no widgets') }}
        </span>
      </div>
    </transition>
  </v-container>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";
import Muuri from "muuri";
import DashboardCard from "./DashboardCard.vue";

export default {
  name: "DashboardCardGrid",
  components: {
    DashboardCard
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
    dashboard: {
      type: Object,
      required: true
    }
  },
  created() {
    this.ro = new ResizeObserver(this.onResize);
  },
  mounted() {
    this.initGrid();
    this.subscribeToStore();
  },
  beforeDetroy() {
    this.ro.detach();
  },
  directives: {
    resize: {
      inserted(el, binding, { context }) {
        context.ro.observe(el);
      },
      unbind(el, binding, { context }) {
        context.ro.unobserve(el);
      }
    }
  },
  data: () => ({
    ro: undefined,
    grid: undefined
  }),
  methods: {
    initGrid() {
      this.grid = new Muuri(this.$refs.container, {
        items: ".card",
        dragEnabled: true,
        dragPlaceholder: true,
        layout: { fillGaps: true },
        dragStartPredicate: { handle: ".head-drag" },
        dragSortInterval: 0,
        layoutOnInit: false,
        sortData: {
          index: (item, el) => this.cards.findIndex(element => element.id === el.id)
        }
      });
      if (this.cards.length) {
        this.grid.sort("index", { layout: "instant" });
      }
      this.grid.on("dragEnd", this.onDrag);
    },
    subscribeToStore() {
      this.$store.subscribeAction({
        // needs the store to be commited first, so we handle after action
        after: action => {
          if (action.type === "addCard") {
            this.addCard(action.payload.card.id);
          }
        }
      });
    },
    onResize(entries) {
      if (!this.grid) return;

      for (let i = 0; i < entries.length; i += 1) {
        this.grid.refreshItems(entries[i].target);
      }

      this.grid.layout(true);
    },
    onDrag() {
      const cards = this.grid
        .getItems()
        .filter(f => f.isActive())
        .map(f => f.getElement().id);

      this.$store.dispatch("setCardsOrder", { cards, dashboard: this.dashboard });
    },
    removeCard(card) {
      const element = this.$refs[card.id];

      if (!element || !element.length) {
        return;
      }

      this.grid.hide(element[0].$el, {
        onFinish: () => {
          const widget = this.$dashboard.getWidget(card.type);

          if (widget && widget.hooks && widget.hooks.onRemove) {
            widget.hooks.onRemove(this.$store);
          }
          this.$store.dispatch("removeCard", { card, dashboard: this.dashboard });
        }
      });
    },
    addCard(id) {
      // next tick because cards is updated from props and then needs to wait for the render to have the $ref
      this.$nextTick(() => {
        const element = this.$refs[id];

        if (!element || !element.length) {
          return;
        }

        this.grid.add(element[0].$el);
      });
    }
  }
};
</script>

<style scoped lang="stylus">
#card-grid {
  position: relative;
  flex: 1;
  padding: 0;

  #no-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    justify-content: center;
  }

  #card-container {
    position: relative;
    margin: 0 auto;
    &.has-toolbar {
      margin: 20px auto;
    }
    >>> .muuri-item-placeholder {
      background-color: rgba(0,0,0,0.23);
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      z-index: 0;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
