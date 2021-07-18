<template>
  <div class="container is-fullhd">
    <div class="columns is-vcentered is-centered">
      <div class="column">
        <h1 class="is-size-1">IFR-CHECK</h1>
        <ifr-list />
      </div>
    </div>
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
</style>
