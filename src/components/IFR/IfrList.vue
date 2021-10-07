<template>
  <div>
    <table class="table is-fullwidth is-hoverable is-striped">
      <thead>
        <tr>
          <th>Country</th>
          <th>Infections</th>
          <th>Deaths</th>
          <th>Population</th>
          <th>CFR</th>
          <th class="ioannidis">Above Ioannidis? (<span class="clickable">*</span>)</th>
          <th>Pot. IFR (<span class="clickable" @click="openModal()">**</span>)</th>
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
          :date="item.date"
        >
        </ifr-item>
      </tbody>
    </table>
    <click-modal :isActive="isActive" @close="openModal()">
      <p>Na du Hurensohn</p>
    </click-modal>
  </div>
</template>

<script>
	import IfrItem from './IfrItem';
	import ClickModal from '../ClickModal';

	export default {
		data() {
			return {
				isActive: false
			};
		},
		components: {
			IfrItem,
			ClickModal
		},
		methods: {
			async loadData() {
				await this.$store.dispatch('ifr/getItemCount');
				await this.$store.dispatch('ifr/getItems');
			},
			openModal() {
				this.isActive = !this.isActive;
        document.querySelector("html").classList.toggle("is-clipped");
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
	};

</script>
