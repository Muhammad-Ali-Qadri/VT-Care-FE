<script lang="ts">

import { defineComponent, onMounted } from 'vue';

export default defineComponent({

    data() {
        return {
            provider: null
        }
    },
    methods: {

    },
    mounted() {
        console.log("now watch this drive.");
        console.log(this.$store.getters['AppointmentModule/getAppointment']);
    }
});

</script>

<style>

</style>

<template>
    <div></div>
</template>