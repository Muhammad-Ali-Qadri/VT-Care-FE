<script>

import ProviderProfileItem from "@/components/providerProfileItem.vue";
import PatientProfileItem from "@/components/patientProfileItem.vue";
export default {
  components: {
    ProviderProfileItem,
    PatientProfileItem,
  }
}


</script>

<style scoped>
</style>

<template>
  <section v-if="this.$store.getters['UserModule/getUserType'] === 'Provider'">
    <ProviderProfileItem></ProviderProfileItem>
  </section>
  <section v-else>
    <PatientProfileItem></PatientProfileItem>
  </section>
</template>