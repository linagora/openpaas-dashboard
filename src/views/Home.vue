<template>
  <v-container id="home" fluid>
    <div id="card-container" ref="container">
      <card v-resize v-for="card in cards" :ref="card.name" :card="card.main" :id="card.name" :key="card.name" @deleted="removeCard(card.name)"/>
    </div>
    <transition name="fade">
      <div v-if="!cards || !cards.length" id="no-cards">
        <v-icon color="primary" size="80px" dark>widgets</v-icon>
        <span class="pt-2 text-xs-center grey--text">There are no cards, please add some by clicking the button below</span>
      </div>
    </transition>
    <widget-store @add="addCard"/>
  </v-container>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";
import Muuri from "muuri";
import WidgetStore from "@/views/WidgetStore.vue";
import Card from "@/components/Card.vue";
import Widgets from "@/widgets";

export default {
  name: "home",
  components: {
    Card,
    WidgetStore
  },
  created() {
    this.ro = new ResizeObserver(this.onResize);
  },
  mounted() {
    this.initGrid();
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
  computed: {
    cards() {
      const { cards } = this.$store.state.card;

      // TODO: Be able to distinct settings from main component
      return cards
        .map(card => Widgets.get(card))
        .filter(Boolean)
        .map(widget => ({
          main: widget.components.main,
          name: widget.name
        }));
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
          index: (item, el) => this.cards.findIndex(element => element.name === el.id)
        }
      });
      if (this.cards.length) {
        this.grid.sort("index", { layout: "instant" });
      }
      this.grid.on("dragEnd", this.onDrag);
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

      this.$store.dispatch("setCards", cards);
    },
    removeCard(name) {
      const element = this.$refs[name];

      if (!element || !element.length) {
        return;
      }

      this.grid.hide(element[0].$el, {
        onFinish: () => {
          const widget = Widgets.get(name);

          if (widget && widget.hooks && widget.hooks.onRemove) {
            widget.hooks.onRemove(this.$store);
          }
          this.$store.dispatch("removeCard", name);
        }
      });
    },
    addCard(name) {
      this.$store.dispatch("addCard", name);
      this.$nextTick(() => {
        const element = this.$refs[name];

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
#home {
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

  // While waiting for a muuri update this is the easiest way to center the cards.
  @media (max-width: 859px) {
    #card-container {
      width: 430px;
      &.placeholder {
        column-count: 1;
      }
    }
  }
  @media (min-width: 860px) and (max-width: 1289px) {
    #card-container {
      width: 860px;
      &.placeholder {
        column-count: 2;
      }
    }
  }
  @media (min-width: 1290px) and (max-width: 1719px) {
    #card-container {
      width: 1290px;
      &.placeholder {
        column-count: 3;
      }
    }
  }
  @media (min-width: 1720px) and (max-width: 2149px) {
    #card-container {
      width: 1720px;
      &.placeholder {
        column-count: 4;
      }
    }
  }
  @media (min-width: 2150px) {
    #card-container {
      width: 2150px;
      &.placeholder {
        column-count: 5;
      }
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
