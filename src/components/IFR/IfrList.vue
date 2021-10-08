<template>
  <div>
    <div class="b-table">
      <div class="field table-mobile-sort">
        <div class="field has-addons">
          <div class="control is-expanded">
            <span class="select is-fullwidth">
              <select>
                <option>Country</option>
                <option selected>Infections</option>
                <option>Deaths</option>
                <option>Population</option>
                <option>CFR</option>
                <option>Above Ioannidis?</option>
                <option>IFR</option>
              </select>
            </span>
          </div>
          <div class="control">
            <button class="button is-primary">
              <span class="icon is-small"><i class="fas fa-arrow-up"></i></span>
            </button>
          </div>
        </div>
      </div>
      <div class="table-wrapper has-mobile-cards">
        <table class="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th>Country</th>
              <th>Infections</th>
              <th>Deaths</th>
              <th>Population</th>
              <th>CFR</th>
              <th class="ioannidis">
                Above Ioannidis? 
                <button @click="openModal('Ioannidis')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
              </th>
              <th>
                Pot. IFR 
                <button @click="openModal('IFR')" class="button is-primary is-outlined is-small"><i class="fas fa-info"></i></button>
              </th>
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
              @handle="openModal"
            >
            </ifr-item>
          </tbody>
        </table>
      </div>
    </div>
    <click-modal :isActive="isActive" @handle="openModal">
      <div v-if="mode === 'IFR'" :class="{mode}">
        Test IFR
      </div>
      <div v-else-if="mode === 'Ioannidis'" :class="{mode}">
        Test Ioannidis
      </div>
    </click-modal>
  </div>
</template>

<script>
	import IfrItem from './IfrItem';
	import ClickModal from '../ClickModal';

	export default {
		data() {
			return {
				isActive: false,
        mode: ""
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
			openModal(mode) {
				this.isActive = !this.isActive;
        if(mode) {
          this.mode = mode;
        } else {
          this.mode = "";
        }
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
