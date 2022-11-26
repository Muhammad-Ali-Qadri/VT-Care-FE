<script lang="ts">
import RegisterFormItem from "@/components/RegisterFormItem.vue";
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    "register-form-item" : RegisterFormItem,
  }
});

</script>

<style scoped>
.register-form {
  text-align: initial;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
.registration-header{
  font-size: 1.1em;
  margin-left: 37em;
}

.register-question{
  margin-left: 40em;
}


.regis-title {
  font-size: 1.5em;
  font-weight: bold;

}
.login-title {
  text-decoration-line: underline;
}

@media (max-width: 1000px) {
  .registration-header {
    margin-left: 1em;
  }
  .register-question{
    margin-left: 1em;
  }
}

</style>

<template>
  <div class="register-form">
    <div class="registration-header">
      <p class="regis-title">Let's Get Started</p>

      <p class="login-title">
        <router-link to="/login">Already have one? Log in.</router-link>
      </p>
    </div>
    <div class="register-question">
      <register-form-item></register-form-item>
    </div>
  </div>
</template>
