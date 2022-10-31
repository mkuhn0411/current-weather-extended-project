<template>
    <p>Or, search for a city...</p>
    <input 
        v-model="citySearch" 
        class="city-search my-3" 
        name="citySearch" 
        ref="searchInput"
        placeholder="Search for a city..."
        @input="handleErrorRemoval"
    />
    <button 
        class="search-button bg-purple text-white rounded-full px-5 py-1 mb-4"
        @click="searchCity(this.citySearch)"
     >Search</button>
     <p v-if="$store.state.searchCityInvalid" class="mb-3 text-error-red">This city does not exist. Try again</p>
</template>

<script>
export default {
  data() {
    return {
      citySerarch: '',
    }
  }, 
  methods: {
        searchCity(name) {
            this.$store.dispatch('setCurrentCity', name).then(() => {
                this.$refs.searchInput.value = null;
                this.citySearch = '';
                this.$store.dispatch('setCurrentForecast', name);
            })
        },
        handleErrorRemoval() {
            if (this.$store.state.searchCityInvalid) {
                this.$store.dispatch('checkCityValid', false);
                this.$store.dispatch('setCurrentCity', null);
            }
        }
  }
}
</script>

<style scoped>
.city-search {
    border: 1px solid #555;
    height: 40px;
    width: 250px;
}

::placeholder {
    padding: 0 0 0 10px;
}
</style>