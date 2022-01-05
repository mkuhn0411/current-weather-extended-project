<template>
  <section>
    <header>
      <h1>What's the Weather Right Now?</h1>
      <div class="city-container">
        <p 
          :class="{active: activeCity === city.name}" 
          @click="setActiveCity(city.name)" 
          v-for="city in cities" 
          :key="city.key"
        >{{city.name}}</p>
      </div>
      <div v-if="activeCity" class="city-card">
        <city-card 
          v-if="cityData"
          :city-data="cityData"
          :city-name="cityName" 
          :active-city="activeCity"
          :forecast-shown="forecastShown"
          :forecast-data="forecastData"
          @toggle-forecast="toggleShown"
        />
      </div>
      <div v-else>
        <p>Please select a city</p>
      </div>
    </header>
  </section>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      cities: [
        { name: 'Denver', key: 1 },
        { name: 'Helsinki', key: 2 },
        { name: 'Berlin', key: 3 },
        { name: 'Calgary', key: 4 },
        { name: 'Doha', key: 5 },
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
        this.forecastData = data.forecast.forecastday;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    toggleShown() {
      this.forecastShown = !this.forecastShown;
    }
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

 button {
    border: none;
    background-color: dodgerblue;
    margin: 20px 0 0 5px;
    color: #fff;
    border-radius: 20px;
    padding: 8px 10px;
  }

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

.country {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center
}

.US {
  background-image: url(https://img.freeflagicons.com/thumb/round_icon/united_states_of_america/united_states_of_america_640.png)
}
</style>
