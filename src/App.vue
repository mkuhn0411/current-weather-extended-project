<template>
  <section>
    <the-header :city="activeCity"/>
    <city-layout />
  </section>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import CityLayout from './components/city-layout/CityLayout.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    CityLayout
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

 button {
  border: none;
  background-color: dodgerblue;
  margin: 20px 0 0 5px;
  color: #fff;
  border-radius: 20px;
  padding: 8px 10px;
}

</style>
