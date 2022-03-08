<template>
    <div class="city-container">
        <city-selector
          :class="{active: $store.state.currentCity === city.name}" 
          @click="addCity(city.name)" 
          v-for="city in cities" 
          :key="city.key"
          :name="city.name"
        />
    </div>
    <div v-if="$store.state.currentCity" class="city-card">
      <city-card 
          v-if="forecast"
          :cityData="forecast"
          :name="$store.state.currentCity"
      />
    </div>
    <div v-else>
        <p>Please select a city</p>
    </div> 
</template>

<script>
import { reactive, provide } from 'vue';
import CitySelector from './CitySelector.vue';
import CityCard from './CityCard.vue';
// import { mapActions } from 'vuex';
let forecast = reactive({});

export default {
    components: {
        CitySelector,
        CityCard
    
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
.city-container {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
}

.city-container > p {
  margin: 0 5px;
  background-color: #2596be;
  border-radius: 40px;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}

.city-container > p.active {
  background-color: #15546a;
}
</style>