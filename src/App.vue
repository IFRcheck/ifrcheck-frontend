<template>
  <h1>IFR-CHECK</h1>
  <div ref="ifrList">
  <ifr-list/>
  </div>
</template>

<script>
import IfrList from './components/IFR/IfrList';
import { ref } from 'vue'

export default {
  name: "App",
  components: {
    IfrList
  },
  data() {
    return {
      scrollingLocked: false
    }
  },
  methods: {
    isOutOfViewport(elem) {
      var bounding = elem.getBoundingClientRect();
      return bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    },
    handleScrolling() {
      const contentBottom = this.ifrList.getBoundingClientRect().bottom;
      const winInnerHeight = window.innerHeight;

      if(contentBottom < winInnerHeight && !this.scrollingLocked){
        this.scrollingLocked = true;
        this.loadNewData();
      }
      else if (contentBottom > winInnerHeight){
        this.scrollingLocked = false;
      }
    },
    async loadNewData() {
      await this.$store.dispatch('ifr/getItems');
    }
  },
  setup() {
    const ifrList = ref(null);
    return {ifrList };
  },
  created() {
    window.addEventListener("scroll", this.handleScrolling)
  },
  async mounted() {
    let isOut = this.isOutOfViewport(this.ifrList);
    while(!isOut){
      await this.loadNewData();
      console.log('loading new data because not out of view')
      isOut = this.isOutOfViewport(this.ifrList);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
