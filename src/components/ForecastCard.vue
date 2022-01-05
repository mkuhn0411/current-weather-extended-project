<template>
    <section>
        <div class="forecast-card-container">
            <p class="date">{{ handleDate }}</p>
            <p>Forecast: {{ forecast }}</p>
            <div class="forecast-icon" :class="forecastClass">&nbsp;</div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        date: {
            type: String,
            required: true
        },
        forecast: {
            type: String,
            required: true
        }
    },
    computed: {
        handleDate() {
            const match = {
                '01': 'January',
                '02': 'February',
                '03': 'March',
                '04': 'April',
                '05': 'May',
                '06': 'June',
                '07': 'July',
                '08': 'August',
                '09': 'September',
                '10': 'October',
                '11': 'November',
                '12': 'December'
            }

            let month = match[this.date.split('-')[1]]
            return month + " " + this.date.split('-')[2] + ", " + this.date.split('-')[0];
        },
        forecastClass() {
            return {
                sun: this.forecast.match(/sunny/i),
                snow: this.forecast.match(/snow/i),
                rain: this.forecast.match(/rain/i),
                cloud: this.forecast.match(/cloudy/i) || this.forecast.match(/clouds/i)
            }
        }
    }
}
</script>

<style scoped>
    .forecast-card-container {
        border: 1px solid rgba(0,0,0,.5);
        margin: 0 5px;
        width: 200px;
    }

    .forecast-card-container p {
        margin: 5px 0;
    }

    .forecast-card-container .date {
        background-color: #9966ff;
        color: #fff;
        margin: 0;
        padding: 5px 0;
    }

    .forecast-icon {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: 50px;
    }

    .sun {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Gpn3IQtfTEKz0OMcj54h_sun-icon.png)
    }

    .snow {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/RxmeuGK6RUSG9pQe0Fn1_snow-icon.png)
    }

    .rain {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/zcjD7AQ7SDmWxgIxdz6Q_rain.jpeg)
    }

    .cloud {
        background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/limUXpxRkuD6qy2M5MWK_cloud.png)
    }
</style>