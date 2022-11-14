<script setup lang="ts"></script>

<style scoped>
.search-bar-section {
  background-color: #ececec;
  padding: 20px;
}
.search-bar {
  width: 700px;
  padding: 8px 5px;
  border-radius: 3px;
  border: none;
  outline-width: 0;
}
.search-button {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  margin-left: -25px;
}
</style>

<template>
  <div class="search-bar-section">
    <form action="/providerlist">
      <input type="text" class="search-bar" placeholder="City, Zip or Name" />
      <button type="submit" class="search-button" value="Search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </div>
</template>
