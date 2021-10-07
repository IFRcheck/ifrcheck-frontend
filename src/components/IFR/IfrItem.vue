<template>
  <tr>
    <td>{{ country }}</td>
    <td>{{ formatInfections }}</td>
    <td>{{ formatDeaths }}</td>
    <td>{{ formatPopulation }}</td>
    <td>{{ cfr }}</td>
    <td>
      <div :class="aboveIoannidis ? 'true' : 'false'">
        <span class="icon"
          ><i class="fas" :class="aboveIoannidis ? 'fa-check' : 'fa-times'"></i
        ></span>
      </div>
    </td>
    <td>{{ ifr }}</td>
  </tr>
</template>

<script>
export default {
  props: [
    'country',
    'infections',
    'deaths',
    'population',
    'ifr',
    'aboveIoannidis',
    'cfr',
    'date'
  ],
  methods: {
    formatNumber(arg) {
      arg = arg.toLocaleString();
      return arg;
    }
  },
  computed: {
    formatInfections() {
      return this.formatNumber(this.infections);
    },
    formatDeaths() {
      return this.formatNumber(this.deaths);
    },
    formatPopulation() {
      return this.formatNumber(this.population);
    },
  },
};
</script>
