<template>
    <header>
        <p v-if="city">{{ city }} weather</p>
        <p v-else>What's the weather?</p>
    </header>   
</template>

<script>
export default {
    props: {
        city: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>
header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Vh3l64DySnaR74t7jUP4_thunderstorm-gc5f75355b_1920.jpg);
    background-size: cover;
    font-size: 2.0em;
    margin: 0 0 40px 0;
}

</style>