<template>
    <div class="city-container border-b flex flex-col justify-center">
      <div class="city-selector-container flex justify-center items-center">
        <city-selector
          :class="{active: $store.state.currentCity === city.name}" 
          @click="addCity(city.name)" 
          v-for="city in cities" 
          :key="city.key"
          :name="city.name"
        />
      </div>
      <div class="search-container flex flex-col justify-center items-center">
        <city-search />
      </div>
    </div>
    <div v-if="$store.state.currentCity && !$store.state.searchCityInvalid" class="city-card">
      <city-card 
          v-if="forecast"
          :cityData="forecast"
          :name="$store.state.currentCity"
      />
    </div>
    <div v-else class="mt-3">
        <p pt-2>Please select or search for a city</p>
    </div> 
</template>

<script>
import { reactive, provide } from 'vue';
import CitySelector from './CitySelector.vue';
import CityCard from './CityCard.vue';
import CitySearch from './CitySearch.vue';
// import { mapActions } from 'vuex';
let forecast = reactive({});

export default {
    components: {
        CitySelector,
        CityCard,
        CitySearch
    
    },
  methods: {
    addCity(name) {
      this.$store.dispatch('setCurrentCity', name).then(() => {
        this.$store.dispatch('setCurrentForecast', name);
      })
    },
    toggleShown() {
      this.forecastShown = !this.forecastShown;
    }
  },
  computed: {
    cities() {
      return this.$store.getters.getCityList;
    },
    forecast() {
      return this.$store.getters.getForecast;
    }
  },
  setup() {
    provide('forecastData', forecast)
  }
}
</script>

<style scoped>
.city-container > p.active {
  background-color: #15546a;
}
</style>