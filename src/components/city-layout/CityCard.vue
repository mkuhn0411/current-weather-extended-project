<template>
    <section class="flex items-center flex-col">
        <div class="card-container w-full flex justify-start items-center mt-8">
            <div class="row row-1 h-full flex-initial"> 
                <p class="city flex justify-center justify-center py-1 bg-purple"> {{ name }} <img class="country ml-1 bg-contain bg-no-repeat" :src="$store.state.countries[cityData.location.country]"> </p>
                <div 
                    class="image bg-cover bg-center"
                    :class="weatherClass"
                >&nbsp;</div>
            </div>
            <div class="row row-2 flex items-start justify-center flex-col flex-1">
                <p><strong> Current Forecast:</strong> {{ cityData.current.condition.text }} </p>
                <p><strong> Current Temperature:</strong> {{ cityData.current.temp_f }}° </p>
                <p><strong> Feels Like:</strong> {{ cityData.current.feelslike_f }}° </p>
                <div class="additional-info-container flex justify-center justify-center items-center">
                    <div class="time-container set-sub-container flex justify-center justify-center items-center">
                        <img class="additional-icon" src="https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/6kh83VyqRxS33wdzf6x5_time.png">
                        <p class="additional-info my-5 time">{{ cityData.location.localtime.split(' ')[1] }}&nbsp;{{ checkDaytime }}</p>
                    </div>
                    <div class="wind-container set-sub-container flex items-center justify-center">
                        <img class="additional-icon" src="https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/21Mlhs8mShGPEfDLivvg_wind.png">
                        <p class="additional-info wind">{{ cityData.current.wind_dir + ' ' + cityData.current.wind_mph + 'mph' }}</p>
                    </div>
                </div>
            </div>
        </div>
          <div>
            <button 
                v-show="$store.state.currentCity" 
                @click="toggleThreeDay"
                class="showForecast mt-5 border-black border-solid border-1 px-4 py-2 rounded-none"
                :class="{active: $store.state.threeDayShown}" 
            >{{instruction}} 3-Day Forecast</button>
            <div v-if="$store.state.threeDayShown" >
                <city-forecast />
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
        name: {
            type: String,
            required: true
        },
        cityData: {
            type: Object,
            required: true
        },

    },
    methods: {
        toggleThreeDay() {
            this.$store.dispatch('showThreeDay');
        }
    },
    computed: {
        instruction() {
            const instructionText = this.$store.state.threeDayShown ? 'Hide' : 'Show'
            return instructionText; 
        },
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
                snowy: cityForecast.match(/snow/i),
                fog: cityForecast.match(/fog/i)
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
}
</script>

<style scoped>
    .card-container {
        height: 200px;
        max-width: 500px;
        border: 1px solid rgba(0,0,0,.5);
    }
    
    .image {
        height: calc(100% - 32px);
    }

    .row-2 p,
    .additional-info-container {
        margin: 5px 0 5px 10px;
    }

    .row-2 .additional-info {
        font-size: 0.8em;
    }

    .showForecast.active {
        background-color: #000;
        color: #fff;
    }

    .city {
        color: #fff;
        width: 200px;
    }

    .country {
        height: 20px;
    }

    .additional-icon {
        height: 20px;
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

    .fog {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/ydl9lrCQQROBMetgqbWq_Screen_Shot_2022-10-30_at_7.46.23_PM.png)
    }

    .asterisk {
        font-size: 0.7em;
    }

</style>