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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>

<style scoped>
.hero {
  text-align: center;
  background-color: beige;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body {
  background-color: #2c5049;
}

.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 5px 0;
  font-size: 40px;
  margin-top: 20px;
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
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 10px 20px 10px 20px;
  font-size: 0.8rem;
  border: none;
}
.banner-button:visited,
.banner-button:hover {
  background-color: #c0e5dd;
}
</style>
