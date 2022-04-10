import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            currentCity: null,
            currentForecast: null,
            threeDayForecast: null,
            threeDayShown: false,
            forecastShown: false,
            cities: [
                { name: 'Denver', id: 'Denver' },
                { name: 'Helsinki', id: 'Helsinki' },
                { name: 'Berlin', id: 'Berlin' },
                { name: 'Calgary', id: 'Calgary' },
                { name: 'Doha', id: 'Doha' },
            ],
            countries: {
                'United States of America': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/JuUFwILzQRu17HpVNfqY_us.png',
                'Canada': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Y6eqALA6RUyxPwE5nKwM_canada.png',
                'Qatar': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/kWGQGoT9SbaiKEYSf9i3_qatar.png',
                'Germany': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/xphgSoCBRgy9KV0KOZRp_germany.png',
                'Finland': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/HakTuytR49TKez4i38Qw_finland.png'
            }
        }
    },
    mutations: {
        setCurrentCity(state, payload) {
            state.currentCity = payload;
        },
        setCurrentForecast(state, payload) {
            console.log(payload)
            state.currentForecast = payload;
            state.threeDayForecast = payload.forecast.forecastday;
            state.threeDayShown = false;
        },
        showThreeDay(state) {
            state.threeDayShown = !state.threeDayShown;
            console.log(state.threeDayShown)
        }
    },
    actions: {
        showThreeDay(context, payload) {
            context.commit('showThreeDay', payload);
            console.log(this.state.threeDayForecast)
        },
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