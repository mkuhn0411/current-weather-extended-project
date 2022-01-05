<template>
    <section>
        <p>3-Day for {{city}}</p>
        <div class="forecast-container">
            <forecast-card 
                v-for="dayForecast in forecast"
                :key="dayForecast.id"
                :id="dayForecast.id"
                :date="dayForecast.date"
                :forecast="dayForecast.day.condition.text"
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
    data() {
        return {
            currentCity: this.city,
            forecast: null
        }
    },
    props: {
        city: {
            type: String,
            required: true
        }
    },
    inject: ['forecastData'],
    mounted() {
        this.forecast = this.forecastData();
    },
}
</script>

<style scoped>
    .forecast-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>