<template>
  <tr>
    <td>
      <div class="is-hidden-tablet">Country / Total</div>
      <div class="value">{{ country }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">Infections</div>
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
      <div class="is-hidden-tablet"><abbr title="Case Fatality Rate">CFR</abbr></div>
      <div class="value">{{ cfr }}</div>
    </td>
    <td>
      <div class="is-hidden-tablet">
        <abbr title="Minimum Infection Fatality Rate">Min. IFR</abbr>
        <button aria-label="ifrExplanation" @click="$emit('handle', 'IFR')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
      </div>
      <div class="value">
        {{ ifr }}
      </div>
    </td>
    <td>
      <div class="is-hidden-tablet">
        <span>Above Ioannidis?</span>
        <button aria-label="ioannidisExplanation" @click="$emit('handle', 'Ioannidis')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
      </div>
      <div class="value" :title="aboveIoannidis ? 'This country has reached Ioannidis estimate and is proving him wrong.' : 'This country has not yet reached Ioannidis estimate.'">
        <span class="icon is-hidden-touch is-medium"
          ><i class="fas fa-lg" :class="aboveIoannidis ? 'fa-check' : 'fa-times'"></i
        ></span>
        <span class="icon is-hidden-desktop"
          ><i class="fas" :class="aboveIoannidis ? 'fa-check' : 'fa-times'"></i
        ></span>
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
