<script setup lang="ts">
import RegisterFormItem from "@/components/RegisterFormItem.vue";
</script>

<style scoped>
.register-form {
  text-align: initial;
}
.regis-title {
  font-size: 35px;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 1050px;
}
.login-title {
  margin-left: 1050px;
  text-decoration-line: underline;
}
</style>

<template>
  <div class="register-form">
    <div class="registration-header">
      <P class="regis-title">let's Get Started</P>

      <p class="login-title">
        <router-link to="/login">Already have one? Log in.</router-link>
      </p>
    </div>
    <div class="register-question">
      <register-form-item></register-form-item>
    </div>
  </div>
</template>
