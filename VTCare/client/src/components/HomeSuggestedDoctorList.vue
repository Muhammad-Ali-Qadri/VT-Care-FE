<script setup lang="ts">
import { defineProps } from "vue"; // needed if you don't want an error below
import { BookItem } from "@/types";
import SuggestedDoctorListItem from "@/components/HomeSuggestedDoctorListItem.vue";
const props = defineProps<{
  bookList: BookItem[];
}>();
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
.recom-doc-title {
  margin-top: 0.5em;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}
.recom-doc-title.sub-title {
  font-weight: normal;
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 30px;
}
</style>

<template>
  <h1 class="recom-doc-title">Top-rated primary care providers</h1>
  <h2 class="recom-doc-title sub-title">
    These providers are recommend based on reviews
  </h2>
  <ul>
    <template v-for="book in bookList" :key="book.doctorId">
      <suggested-doctor-list-item :book="book"></suggested-doctor-list-item>
    </template>
  </ul>
</template>
