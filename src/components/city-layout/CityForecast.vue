<template>
    <section>
        <p>3-Day Forecast for {{$store.state.currentCity}}</p>
        <div class="forecast-container">
            <forecast-card 
                v-for="dayForecast in $store.state.threeDayForecast"
                :key="dayForecast.id"
                :id="dayForecast.id"
                :date="dayForecast.date"
                :forecast="dayForecast.day.condition.text"
                :temp="dayForecast.day.avgtemp_f"
                :sunrise="dayForecast.astro.sunrise"
                :sunset="dayForecast.astro.sunset"
            />
        </div>
    </section>
</template>

<script>
import ForecastCard from './ForecastCard.vue';

export default {
    components: {
        ForecastCard
    },
    props: {
        city: {
            type: String,
            required: true
        }
    },
}
</script>

<style scoped>
    .forecast-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
</style>