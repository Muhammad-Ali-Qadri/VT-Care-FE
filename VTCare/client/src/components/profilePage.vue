<script lang="ts">

import ProviderProfileItem from "@/components/providerProfileItem.vue";
import PatientProfileItem from "@/components/patientProfileItem.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
    return {
      userType:this.$store.getters['UserModule/getUserType'],
    }
  },

  components: {
    ProviderProfileItem,
    PatientProfileItem,
  }
})


</script>

<style scoped>
</style>

<template>
  <section v-if="userType === 'Provider'">
    <ProviderProfileItem></ProviderProfileItem>
  </section>
  <section v-else>
    <PatientProfileItem></PatientProfileItem>
  </section>
</template>