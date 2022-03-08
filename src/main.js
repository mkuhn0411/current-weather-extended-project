import { createApp } from 'vue';
// import CityCard from './components/CityCard.vue';
import App from './App.vue';
import store from './store/index.js';


const app = createApp(App);
// app.component('city-card', CityCard);
app.use(store);
app.mount('#app');

