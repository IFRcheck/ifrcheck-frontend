<template>
  <div>
    <div class="b-table">
      <div class="field table-mobile-sort">
        <div class="field has-addons">
          <div class="control is-expanded">
            <span class="select is-fullwidth">
              <select id="selectbox" v-model="selected" @change="sort(this.selected, this.orderBy)">
                <option disabled value="">Please pick one to sort by</option>
                <option value="country">Country</option>
                <option value="infections">Infections</option>
                <option value="deaths">Deaths</option>
                <option value="population">Population</option>
                <option value="cfr">CFR</option>
                <option value="aboveIoannidis">Above Ioannidis?</option>
                <option value="ifr">IFR</option>
              </select>
            </span>
          </div>
          <div class="control">
            <button @click="sort(this.selected)" class="button is-primary">
              <span class="icon is-small"><i class="fas" :class="this.order ? 'fa-arrow-up' : 'fa-arrow-down'"></i></span>
            </button>
          </div>
        </div>
      </div>
      <div class="table-wrapper has-mobile-cards">
        <table class="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th class="country">
                <span @click="sort('country')" :class="selected === 'country' ? 'active' : ''">
                  <span>Country / Total</span>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
              </th>
              <th class="infections">
                <span @click="sort('infections')" :class="selected === 'infections' ? 'active' : ''">
                  <span>Infections</span>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
              </th>
              <th class="deaths">
                <span @click="sort('deaths')" :class="selected === 'deaths' ? 'active' : ''">
                  <span>Deaths</span>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
              </th>
              <th class="population">
                <span @click="sort('population')" :class="selected === 'population' ? 'active' : ''">
                  <span>Population</span>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
              </th>
              <th class="cfr">
                <span @click="sort('cfr')" :class="selected === 'cfr' ? 'active' : ''">
                  <abbr title="Case Fatality Rate">CFR</abbr>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
              </th>
              <th class="ifr">
                <span @click="sort('ifr')" :class="selected === 'ifr' ? 'active' : ''">
                  <abbr title="Minimum Infection Fatality Rate">Min. IFR</abbr>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
                <button @click="openModal('IFR')" class="button is-primary is-outlined is-small">
                  <i class="fas fa-info"></i>
                </button>
              </th>
              <th class="aboveIoannidis">
                <span @click="sort('aboveIoannidis')" :class="selected === 'aboveIoannidis' ? 'active' : ''">
                  <span>Above Ioannidis?</span>
                  <span class="icon is-small">
                    <i class="fas" :class="this.order ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'"></i>
                  </span>
                </span>
                <button @click="openModal('Ioannidis')" class="button is-primary is-outlined is-small">
                  <i class="fas fa-info"></i>
                </button>
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
      <div v-if="mode === 'IFR'" class="content" :class="{mode}">
        <h3 class="is-size-3">What is the minimum IFR?</h3>
        <p>Well, that is a good question, and I will try my best to explain it as easy as possible.</p>
        <p>The infection fatality rate is the possibility to die from an infection. This number is likely lower than the case fatality rate (CFR) which only includes reported cases (tested).</p>
        <p>But the estimated number of unreported cases is most of the times way higher than the reported cases.</p>
        <h4 class="is-size-4">But what is the minimum IFR now?</h4>
        <p>Yeah, let me explain: I came up with a thought experiment.</p> 
        <blockquote>What would be the IFR if all of our residents were already infected?</blockquote>
        <p>And yeah.. thats simply it. I just assume every human being has been infected.</p>
        <pre>minimum IFR = total Deaths / (total Population / 100)</pre>
      </div>
      <div v-else-if="mode === 'Ioannidis'" class="content" :class="{mode}">
        <h3 class="is-size-3">What does this even mean?</h3>
        <p>I have to be very cautious now, because I don't want to offend anyone speficially. But some people came up with studies<sup><a href="https://doi.org/10.1101/2020.05.13.20101253" target="_blank">[1]</a><a href="https://doi.org/10.1111/eci.13554" target="_blank">[2]</a></sup> from <a href="https://en.wikipedia.org/wiki/John_Ioannidis" target="_blank">John P. Ioannidis</a> where Ioannidis came to the conclusion that the median and/or average <abbr title="Infection Fatality Rate">IFR</abbr> of COVID-19 would be around 0.04% and 0.15%.</p>
        <h4 class="is-size-4">And why is this important?</h4>
        <p>Well... some people tried to play down the dangerousness of COVID-19 with this studies and I wanted to show which countries as a whole are already above that threshhold if you assume that the whole population was already infected (which is mostly not the case).</p>
        <p>So everywhere where you see a green checkmark (<span class="icon is-small has-text-success"><i class="fas fa-check"></i></span>) the <abbr title="Infection Fatality Rate">IFR</abbr> is above 0.15. Everywhere where you see a cross (<span class="icon is-small has-text-danger"><i class="fas fa-times"></i></span>) the treshhold is not yet reached.</p>
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
        mode: "",
        orderBy: "DESC",
        order: false,
        selected: this.$store.getters['ifr/getSortBy']
			};
		},
		components: {
			IfrItem,
			ClickModal
		},
		methods: {
			async loadData() {
				await this.$store.dispatch('ifr/getItemCount');
				await this.$store.dispatch('ifr/getItems', true);
			},
			openModal(mode) {
				this.isActive = !this.isActive;
        if(mode) {
          this.mode = mode;
        } else {
          this.mode = "";
        }
        document.querySelector("html").classList.toggle("is-clipped");
      },
      async sort(sort, ordering) {
        if(ordering) {
          this.orderBy = ordering;
          if(this.orderBy === "DESC") {
            this.order = false;
          } else {
            this.order = true;
          }
          this.selected = sort;
          this.$store.dispatch('ifr/setSortBy', sort);
          this.$store.dispatch('ifr/setSortOrder', this.orderBy);
          this.$store.dispatch('ifr/getItems', true);
        } else {
          if(this.orderBy === "DESC") {
            this.orderBy = "ASC";
            this.order = true;
            this.selected = sort;
            this.$store.dispatch('ifr/setSortBy', sort);
            this.$store.dispatch('ifr/setSortOrder', this.orderBy);
            this.$store.dispatch('ifr/getItems', true);
          } else {
            this.orderBy = "DESC";
            this.order = false;
            this.selected = sort;
            this.$store.dispatch('ifr/setSortBy', sort);
            this.$store.dispatch('ifr/setSortOrder', this.orderBy);
            this.$store.dispatch('ifr/getItems', true);
          }
        }
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
