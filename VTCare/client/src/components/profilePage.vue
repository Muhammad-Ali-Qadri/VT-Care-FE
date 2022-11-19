<script lang="ts">
</script>

<style scoped>
.profile-sec {
  text-align: initial;
  margin: 3em 0 10em 20em;
  /*margin-top: 3em;*/
  /*margin-bottom: 10em;*/
  display: flex;
}
.user-title-1 {
  font-size: 25px;
  font-weight: bold;
  line-height: 2em;
}
.user-title-2 {
  font-size: 20px;
  font-weight: bold;
  line-height: 3em;
}
.each-div {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  padding: 1em 1em 2em 0;
  width: 50em;
}
.profile-select {
  padding: 0 10em 2em 3em;
}
.select-text {
  line-height: 3em;
  font-weight: bold;
  border: none;
  background: none;
  text-align: left;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  width: 10em;
  cursor: pointer;
  color: #2c3e50;
  font-size: 15px;
}

</style>

<template>
  <section class="profile-sec" v-if="this.$store.state.userObj.providerId">

<!--    <div class="profile-select">-->
<!--      <router-link class="router-link-select" to="/profile">-->
<!--        <button class="select-text">Profile</button>-->
<!--      </router-link><br>-->
<!--      <router-link to="/profile">-->
<!--        <button class="select-text">Login & Security</button>-->
<!--      </router-link><br>-->
<!--      <router-link to="/">-->
<!--        <button class="select-text">Insurance</button>-->
<!--      </router-link>-->
<!--    </div>-->

    <div>
      <h1 class="user-title-1"> Profile</h1>
      <div class="each-div">
        <h3 class="user-title-2"> Name</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.name }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Gender</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.gender }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Date of Birth</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.date }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Email</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.email }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Phone number</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.contact }}</h3>
      </div>

      <div class="each-div">
        <h3 class="user-title-2"> Address</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.address }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Specialization</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.specialization }}</h3>
      </div>
      <div class="each-div">
        <h3 class="user-title-2"> Years of Experience</h3>
        <h3 class="user-content"> {{ this.$store.state.userObj.yearsOfExperience }}</h3>
      </div>
    </div>
  </section>
  <section class="profile-sec" v-else>
    this is patient profile
  </section>
</template>