import { createApp } from 'vue';
import CityCard from './components/CityCard.vue';
import App from './App.vue';


const app = createApp(App);
app.component('city-card', CityCard);


app.mount('#app');

