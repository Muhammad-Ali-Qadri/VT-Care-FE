<style scoped>
.header-class {
  padding: 0.6rem;
  text-align: initial;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.title-and-logo {
  text-align: left;
}

.text-logo {
  text-decoration: none;
  font-weight: bolder;
  font-size: 30px;
  font-family: "Bodoni MT", serif;
  display: inline-block;
}

.logo {
  float: left;
  width: 20px;
  /*margin-left: 250px*/
}

.sign-up {
  margin-left: 60px;
  text-align: center;
  display: inline-block;
  background-color: #2c5049;
  color: white;
  padding: 0.3em 1em;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: none;
}

.sign-up:visited,
.sign-up:hover {
  background-color: #3d6e64;
}

.two-things {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.meet-button {
  margin-top: 0.5em;
}

.user-name {
  margin-top: 0.5em;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}

.logout-btn {
  margin-top: 0.8em;
  background: none;
  border: none;
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: "AppHeader",
  created() {
    return;
  },
  methods: {
    logout: function () {
      this.$store.dispatch("UserModule/logout");
    }
  }
});
</script>

<template>
  <header class="header-class">
    <!-- this is the title and logo -->
    <div class="title-and-logo">
      <router-link to="/"><img class="logo" src="@/assets/Image/logo.png" /></router-link>
      <h1 class="text-logo">
        <router-link to="/" style="color: #2c5049">VT Care</router-link>
      </h1>
    </div>
    <!--
      <h1 class="login-button">
        <router-link to="/register" style="color: #2c5049"
          >REGISTER / LOGIN</router-link
        >
      </h1>
      -->
    <div class="two-things">
      <div>
        <h1 class="user-name">
          <router-link v-if="$store.state.UserModule.userObj === null" class="button selected-category-button"
            :to="{ name: 'register' }">
            register/login
          </router-link>
          <router-link style="font-weight: bold" v-else :to="{ name: 'home' }">
            {{ $store.state.UserModule.userObj.name }}
          </router-link>
        </h1>
      </div>
      <div v-if="$store.state.UserModule.userObj" class="logout-button" @click="logout">
        <button class="logout-btn"><i class="fa-solid fa-right-from-bracket fa-xl"></i></button>
      </div>
      <div class="meet-button">
        <button class="sign-up">meet with a therapist</button>
      </div>

    </div>

    <!-- this is the login and sign up -->
  </header>
</template>
