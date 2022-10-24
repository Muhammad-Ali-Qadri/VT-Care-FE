<script setup lang="ts">
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { provide } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div id="app" :class="{ appHero: route.name === 'home-view' }">
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
