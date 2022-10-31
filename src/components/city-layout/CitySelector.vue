<template>
    <p class="mb-4 mx-1 px-5 py-1 rounded-full cursor-pointer bg-medium-blue text-white">{{name}}</p>   
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: false
        }
    }
}
</script>