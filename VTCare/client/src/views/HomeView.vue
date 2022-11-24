<script setup lang="ts">
import { defineComponent } from "vue";
import { BookItem } from "@/types";
import SearchBar from "@/components/SearchBar.vue";
import HomeSuggestedDoctorList from "@/components/HomeSuggestedDoctorList.vue";
import provider from "@/services/provider";

// export default defineComponent({
//   name: "HomeView",
//   components: { HomeSuggestedDoctorList, SearchBar },
// });

const Providers = provider.getProviders();

const bookList: BookItem[] = [
  {
    doctorId: 1001,
    name: "Doctor1",
    author: "Primary Doctor",
    price: 873,
    isPublic: true,
    isSuggested: true,
  },
  {
    doctorId: 1002,
    name: "Doctor2",
    author: "Primary Doctor",
    price: 363,
    isPublic: false,
    isSuggested: true,
  },
  {
    doctorId: 1003,
    name: "Doctor3",
    author: "Primary Doctor",
    price: 623,
    isPublic: false,
    isSuggested: true,
  },
  {
    doctorId: 1004,
    name: "Doctor4",
    author: "Primary Doctor",
    price: 714,
    isPublic: true,
    isSuggested: true,
  },
  {
    doctorId: 1005,
    name: "Doctor5",
    author: "Primary Doctor",
    price: 944,
    isPublic: true,
    isSuggested: true,
  },
];
</script>

<template>
  <div class="home">
    <!-- The hero image with browse button -->
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            It's your battle, but you don't need to fight alone.
          </h1>
          <h2 class="subtitle">
            Online or in-person, licensed providers can help you manage your
            mental health.
          </h2>
          <div class="button-block">
            <button class="banner-button">meet with a therapist</button>
          </div>
        </div>
      </div>
    </section>

    <!-- This is the search bar for finding doctors -->
    <section>
      <search-bar></search-bar>
    </section>

    <!-- This is the recommended doctors on the home page -->
    <section>
      <home-suggested-doctor-list
        :book-list="bookList"
      ></home-suggested-doctor-list>
    </section>
  </div>

  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Connect with a licensed therapist for online video or in-person
          therapy sessions.
        </h1>
        <div class="button-block">
          <button class="banner-button">meet with a therapist</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  background-color: beige;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 22em;
}

.hero-body {
  background-color: #2c5049;
}

.hero-body .title {
  text-shadow: 0.1em 0.1em 0.1em rgba(0, 0, 0, 0.6);
  font-size: 2em;
  margin-top: 0.1em;
  align-self: center;
  font-weight: bold;
  max-width: 50%;
  display: -webkit-inline-flex;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 20px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -70px;
}

.banner-button {
  background-color: #9ad5c9;
  color: black;
  cursor: pointer;
  border-radius: 0.1em;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 1em 2em 1em 2em;
  font-size: 0.8rem;
  border: none;
}
.banner-button:visited,
.banner-button:hover {
  background-color: #c0e5dd;
}
</style>
