<template>
    <header class="flex justify-center items-center bg-cover bg-center text-white mb-4">
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
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Vh3l64DySnaR74t7jUP4_thunderstorm-gc5f75355b_1920.jpg);
    font-size: 2.0em;
}

</style>