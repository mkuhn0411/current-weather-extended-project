import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            currentCity: null,
            currentForecast: null,
            threeDayShown: false,
            cities: [
                { name: 'Denver', id: 'Denver' },
                { name: 'Helsinki', id: 'Helsinki' },
                { name: 'Berlin', id: 'Berlin' },
                { name: 'Calgary', id: 'Calgary' },
                { name: 'Doha', id: 'Doha' },
            ],
        }
    },
    mutations: {
        setCurrentCity(state, payload) {
            state.currentCity = payload;
        },
        setCurrentForecast(state, payload) {
            console.log(payload)
            console.log(payload.location)
            state.currentForecast = payload;
        }
    },
    actions: {
        setCurrentCity(context, payload) {
            context.commit('setCurrentCity', payload);
        },
        async setCurrentForecast(state, payload) {
            const gif = await fetch('http://api.weatherapi.com/v1/forecast.json?key=e85990e0dbe94f858c583246213112&q=' + payload + '&days=3&aqi=no&alerts=no')
            const g = await gif.json();
            state.commit('setCurrentForecast', g);
            
        },
    },
    getters: {
        getCurrentCity(state) {
            return state.currentCity;
        },
        getCityList(state) {
            return state.cities;
        },
        getForecast(state) {
            return state.currentForecast;
        }
    }

});

export default store;