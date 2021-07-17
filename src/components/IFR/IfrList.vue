<template>
  <table>
    <thead>
    <tr>
      <th>Country</th>
      <th>Infections</th>
      <th>Deaths</th>
      <th>Population</th>
      <th>IFR</th>
      <th>AboveIoannidis</th>
      <th>CFR</th>
      <th>Date</th>
    </tr>
    </thead>
    <tbody>
    <ifr-item
    v-for="item in items"
    :key="item.key"
    :country="item.country"
    :infections="item.infections"
    :deaths="item.deaths"
    :population="item.population"
    :ifr="item.IFR"
    :above-ioannidis="item.aboveIoannidis"
    :cfr="item.CFR"
    :date="item.date">
    </ifr-item>
    </tbody>
  </table>
</template>

<script>
import IfrItem from './IfrItem';

export default {
  components: {
    IfrItem,
  },
  methods: {
    async loadData() {
      await this.$store.dispatch('ifr/getItemCount');
      await this.$store.dispatch('ifr/getItems');
    }
  },
  computed: {
    items() {
      return this.$store.getters['ifr/items'];
    }
  },
  created() {
    this.loadData();
  }
}
</script>