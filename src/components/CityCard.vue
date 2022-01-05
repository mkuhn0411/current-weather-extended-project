<template>
    <section>
        <div class="card-container">
            <div class="row row-1">
                <p class="city"> {{ cityName }} <img class="country" :src="countries[cityData.location.country]"> </p>
                <div 
                    class="image"
                    :class="weatherClass"
                >&nbsp;</div>
            </div>
            <div class="row row-2">
                <p><strong> Current Forecast:</strong> {{ cityData.current.condition.text }} </p>
                <p><strong> Current Temperature:</strong> {{ cityData.current.temp_f }}° </p>
                <p><strong> Feels Like:</strong> {{ cityData.current.feelslike_f }}° </p>
                <div class="additional-info-container">
                    <div class="time-container set-sub-container">
                        <img class="additional-icon" src="https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/6kh83VyqRxS33wdzf6x5_time.png">
                        <p class="additional-info time">{{ cityData.location.localtime.split(' ')[1] }}&nbsp;{{ checkDaytime }}</p>
                    </div>
                    <div class="wind-container set-sub-container">
                        <img class="additional-icon" src="https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/21Mlhs8mShGPEfDLivvg_wind.png">
                        <p class="additional-info wind">{{ cityData.current.wind_dir + ' ' + cityData.current.wind_mph + 'mph' }}</p>
                    </div>
                </div>
            </div>
        </div>
          <div>
            <button 
                v-show="activeCity" 
                @click="$emit('toggle-forecast')"
                class="showForecast"
                :class="{active: forecastShown}" 
            >Show 3-Day Forecast</button>
            <div>
                <city-forecast 
                    v-if="forecastShown" 
                    :city="activeCity"
                />
            </div>
        </div>
    </section>
</template>

<script>
import CityForecast from './CityForecast.vue';

export default {
    components: {
        CityForecast
    },
    props: {
        cityName: {
            type: String,
            required: true
        },
        cityData: {
            type: Object,
            required: true
        },
        activeCity: {
            type: Boolean,
            required: true
        },
        forecastShown: {
            type: Boolean,
            required: true
        },
        forecastData: {
            type: Object,
            required: true
        }
    },
    emits: ['toggle-forecast'],
    data() {
        return {
            showForecast: this.forecastShown,
             countries: {
                 'United States of America': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/JuUFwILzQRu17HpVNfqY_us.png',
                 'Canada': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Y6eqALA6RUyxPwE5nKwM_canada.png',
                 'Qatar': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/kWGQGoT9SbaiKEYSf9i3_qatar.png',
                 'Germany': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/xphgSoCBRgy9KV0KOZRp_germany.png',
                 'Finland': 'https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/HakTuytR49TKez4i38Qw_finland.png'
             }
        }
    },
    computed: {
        weatherClass() {
            let cityForecast = this.cityData.current.condition.text;

            return {
                clear: cityForecast.match(/clear/i), 
                cloudy: cityForecast.match(/overcast/i) || cityForecast.match(/cloud/i), 
                misty: cityForecast.match(/mist/i), 
                drizzle: cityForecast.match(/drizzle/i),
                rainy: cityForecast.match(/rain/i),
                ice: cityForecast.match(/ice/i),
                sunny: cityForecast.match(/sunny/i),
                snowy: cityForecast.match(/snow/i)
            }
        },
        checkDaytime() {
            const toNum = parseInt(this.cityData.current.is_day);

            if (this.cityDay === 0) {
                if (toNum < 12) {
                    return 'AM'
                } else {
                    return 'PM'
                }
            } else {
                if (toNum < 12) {
                    return 'AM'
                } else {
                    return 'PM'
                }
            }
        }
    },
    provide() {
        return {
            forecastData: this.forecastData
        }
    },
}
</script>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .city-card,
    .additional-info-container,
    .set-sub-container {
        display: flex;
        align-items: center;
        justify-content: center
    }

    .card-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        width: 100%;
        max-width: 500px;
        margin: 40px 0 0;
        border: 1px solid rgba(0,0,0,.5);
    }

    .row {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .row-1 {
        flex: 1;
    }

    .row-2 {
        flex: 2;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .row-2 p {
        margin: 5px 0 5px 10px;
    }

    .row-2 .additional-info {
        margin: 5px 0 5px 3px;
        font-size: 0.8em;
    }

    .showForecast.active {
        background-color: #0066cc;
    }

    .city {
        background-color: #9966ff;
        color: #fff;
        width: 200px;
        flex: 1;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .country {
        height: 20px;
        width: auto;
        margin: 0 0 0 3px;
    }

    .image {
        flex: 4;
        background-size: cover;
        background-position: center;
        width: 100%;
    }

    .additional-icon {
        height: 20px;
        width: auto;
        margin: 0 0 0 10px;
    }

    .wind-container .additional-icon {
        height: 30px;
    }

    .clear {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/TXvMDjljR0e3grclU4k3_clear-2.png);
    }

    .cloudy {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/UFjrWZXmReOVIXzhCm2Z_clouds.jpeg);
    }

    .misty {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/ffdcayLAQJKL927Nqqgx_misty.jpeg);
    }

    .brokenClouds {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/j9joPihTmCB3NmK6GLUt_broken-clouds.jpeg);
    }

    .drizzle {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/cfhsdweQE6DGguoPSfxK_drizzle-2.jpeg);
    }
    
    .rainy {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/k7hxRVhTQxawXMsOCQ3h_light-rain.png);
        background-color: #0066ff;
        background-position: top;
    }

    .ice {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/1D8Aw0hTxagM3XE90LZt_ice.gif);
        background-color: #0066ff;
    }

    .sunny {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Vxnn0IrQQBuXpgog8LaO_sunny.jpeg);
    }

    .snowy {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/CjccJQ2Q0GkZ3uiZX3ON_snow.jpeg)
    }

    .asterisk {
        font-size: 0.7em;
    }

</style>