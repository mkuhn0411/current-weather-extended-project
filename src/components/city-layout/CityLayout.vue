<template>
    <div class="city-container">
        <city-selector
          :class="{active: activeCity === city.name}" 
          @click="setActiveCity(city.name)" 
          v-for="city in cities" 
          :key="city.key"
          :name="city.name"
        />
    </div>
    <div v-if="activeCity" class="city-card">
    <city-card 
        v-if="cityData"
        :city-data="cityData"
        :city-name="cityName" 
        :active-city="activeCity"
        :forecast-shown="forecastShown"
        @toggle-forecast="toggleShown"
    />
    </div>
    <div v-else>
        <p>Please select a city</p>
    </div> 
</template>

<script>
import { reactive, provide } from 'vue';
import CitySelector from './CitySelector.vue'
let forecast = reactive({});

export default {
    components: {
        CitySelector
    },
    data() {
    return {
      cities: [
        { name: 'Denver', id: 'Denver' },
        { name: 'Helsinki', id: 'Helsinki' },
        { name: 'Berlin', id: 'Berlin' },
        { name: 'Calgary', id: 'Calgary' },
        { name: 'Doha', id: 'Doha' },
      ],
      activeCity: null,
      cityData: null,
      cityName: '',
      forecastShown: false,
      forecastData: null
    }
  },
  methods: {
    setActiveCity(city) {
      this.activeCity = city;
      this.getWeatherData(this.activeCity);
      
      this.forecastShown = false;
    },
    getWeatherData(city) {
      fetch('http://api.weatherapi.com/v1/forecast.json?key=e85990e0dbe94f858c583246213112&q=' + city + '&days=3&aqi=no&alerts=no')
      .then(function(resp) { return resp.json() })
      .then(data => {
        console.log(data);
        this.cityData = data;
        this.cityName = city;
        Object.assign(forecast, data.forecast.forecastday);
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    toggleShown() {
      this.forecastShown = !this.forecastShown;
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