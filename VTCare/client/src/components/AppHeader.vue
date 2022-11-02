<style scoped>
.header-class {
  padding: 0.6rem;
  text-align: initial;
}
.title-and-logo {
  display: inline-block;
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
  margin-left: 250px;
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

.login-button {
  display: inline-block;
  margin-left: 400px;
}
.login-button:visited,
.login-button:hover {
  color: #3d6e64;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="header-class">
    <!-- this is the title and logo -->
    <div class="title-and-logo">
      <router-link to="/"
        ><img class="logo" src="@/assets/Image/logo.png"
      /></router-link>
      <h1 class="text-logo">
        <router-link to="/" style="color: #2c5049">VT Care</router-link>
      </h1>
      <h1 class="login-button">
        <router-link to="/register" style="color: #2c5049"
          >REGISTER / LOGIN</router-link
        >
      </h1>
      <button class="sign-up">meet with a therapist</button>
    </div>

    <!-- this is the login and sign up -->
  </header>
</template>
