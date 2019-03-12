<template>
  <v-container id="home" fluid>
    <div id="card-container" ref="container">
      <card v-resize v-for="card in cards" :ref="card.name" :card="card.component" :id="card.name" :key="card.name" @deleted="removeCard(card.name)"/>
    </div>
  </v-container>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";
import Muuri from "muuri";
import Card from "@/components/Card.vue";
import Modules from "@/modules";

export default {
  name: "home",
  components: {
    Card
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
      unbind(el) {
        this.ro.unobserve(el);
      },
    },
  },
  computed: {
    cards() {
      const { cards } = this.$store.state.card;

      // TODO: Be able to distinct settings from main component
      return cards
        .map(card => Modules.get(card)).filter(Boolean)
        .map(module => ({
          component: module.components[0],
          name: module.name
        }));
    }
  },
  data: () => ({
    ro: undefined,
    grid: undefined,
  }),
  methods: {
    initGrid() {
      this.grid = new Muuri(this.$refs.container, {
        items: '.card',
        dragEnabled: true,
        dragPlaceholder: true,
        layout: { fillGaps: true },
        dragStartPredicate: { handle: '.head-drag' },
        dragSortInterval: 0,
        layoutOnInit: false,
        sortData: {
          index: (item, el) => {
            this.cards.indexOf(el.id)
          },
        },
      });
      if (this.cards.length) {
        this.grid.sort('index', { layout: 'instant' });
      }
      this.grid.on('dragEnd', this.onDrag);
    },
    onResize(entries) {
      if (!this.grid) return;

      for (let i = 0; i < entries.length; i += 1) {
        this.grid.refreshItems(entries[i].target);
      }

      this.grid.layout(true);
    },
    onDrag() {
      const cards = this.grid.getItems()
        .filter(f => f.isActive())
        .map(f => f.getElement().id);
    },
    removeCard(name) {
      const element = this.$refs[name];

      if (!element || !element.length) {
        return;
      }

      this.grid.hide(element[0].$el, {
        onFinish: () => {
          this.$store.dispatch('removeCard', name);
        }
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

  #card-container {
    position: relative;
    margin: 0 auto;
    &.has-toolbar {
      margin: 20px auto;
    }
    &.placeholder {
      padding: 15px 0;
      column-gap: 15px;
    }
    .placeholder-item {
      width: 400px;
      margin-bottom: 30px;
      page-break-inside: avoid;
      will-change: transform;
      break-inside: avoid;
      background-color: rgba(164, 163, 164, .35);
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
}
</style>
