<template>
  <div class="container is-fullhd">
    <div class="columns is-vcentered is-centered">
      <div class="column">
        <h1 class="is-size-1 is-size-3-touch has-text-primary">IFR-CHECK</h1>
        <div ref="ifrList">
          <ifr-list />
        </div>
      </div>
    </div>
    <div ref="toTop" id="toTop" :class="toTopClass">
      <a id="toTopAnchor" @click=toTopClick()>
        <i class="fas fa-arrow-up"></i>
      </a>
    </div>
  </div>
</template>

<script>
import IfrList from './components/IFR/IfrList';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    IfrList
  },
  data() {
    return {
      scrollingLocked: false,
      toTopClass: 'hide'
    };
  },
  methods: {
    isOutOfViewport(elem) {
      var bounding = elem.getBoundingClientRect();
      return (
        bounding.bottom >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    showScrollTop() {
      const currentScroll = window.scrollY;
      if (currentScroll > 800) {
        this.toTopClass = 'show';
      } else if (currentScroll < 800) {
        this.toTopClass = 'hide';
      }
    },
    toTopClick() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    handleScrolling() {
      this.showScrollTop();
      const contentBottom = this.ifrList.getBoundingClientRect().bottom;
      const winInnerHeight = window.innerHeight;
      if (contentBottom < winInnerHeight && !this.scrollingLocked) {
        this.scrollingLocked = true;
        this.loadNewData();
      } else if (contentBottom > winInnerHeight) {
        this.scrollingLocked = false;
      }
    },
    async loadNewData() {
      await this.$store.dispatch('ifr/getItems', false);
    }
  },
  setup() {
    const ifrList = ref(null);
    return { ifrList };
  },
  created() {
    window.addEventListener('scroll', this.handleScrolling);
  },
  async mounted() {
    //let isOut = this.isOutOfViewport(this.ifrList);
    //console.log(isOut);
    /*while (!isOut) {
      await this.loadNewData();
      isOut = this.isOutOfViewport(this.ifrList);
    }*/
  }
};
</script>

<style lang="scss">
@import 'src/assets/sass/variables';
</style>
