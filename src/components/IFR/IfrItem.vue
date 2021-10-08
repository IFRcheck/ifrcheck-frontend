<template>
  <tr>
    <td>
      <div class="is-hidden-tablet">Country</div>
      <div class="value">{{ country }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">Infetions</div>
      <div class="value">{{ formatInfections }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">Deaths</div>
      <div class="value">{{ formatDeaths }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">Population</div>
      <div class="value">{{ formatPopulation }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">CFR</div>
      <div class="value">{{ cfr }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">
        Above Ioannidis? 
        <button @click="$emit('handle', 'Ioannidis')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
      </div>
      <div class="value" :class="aboveIoannidis ? 'true' : 'false'">
        <span class="icon"
          ><i class="fas" :class="aboveIoannidis ? 'fa-check' : 'fa-times'"></i
        ></span>
      </div>
    </td>
    <td>
      <div class="is-hidden-tablet">
        Pot. IFR
        <button @click="$emit('handle', 'IFR')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
      </div>
      <div class="value">
        {{ ifr }}
      </div>
    </td>
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
