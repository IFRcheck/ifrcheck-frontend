<template>
  <div>
    <h1>IFR-CHECK</h1>
    <ifr-list />
  </div>
</template>

<script>
import IfrList from './components/IFR/IfrList';

export default {
  name: 'App',
  components: {
    IfrList
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
