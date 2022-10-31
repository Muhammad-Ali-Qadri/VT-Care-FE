<script>
export default {
  data() {
    return {
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
      gender: "",
      role: "",
      formSubmitted: false,
      isValidName: true,
      isValidDate: true,
      isValidPassword: true,
      isValidEmail: true,
      isValidGender: true,
      isValidRole: true,
    };
  },
  methods: {
    submitForm: function () {
      if (
        this.email === "" ||
        this.password === "" ||
        this.name === "" ||
        this.dateOfBirth === "" ||
        this.gender === "" ||
        this.role === ""
      ) {
        this.formSubmitted = false;
        if (this.name === "") {
          this.isValidName = false;
        }
        if (this.dateOfBirth === "") {
          this.isValidDate = false;
        }
        if (this.email === "") {
          this.isValidEmail = false;
        }
        if (this.password === "") {
          this.isValidPassword = false;
        }
        if (this.gender === "") {
          this.isValidGender = false;
        }
        if (this.role === "") {
          this.isValidRole = false;
        }
      } else {
        this.isValidRole = true;
        this.isValidGender = true;
        this.isValidPassword = true;
        this.isValidEmail = true;
        this.isValidName = true;
        this.isValidDate = true;
        this.formSubmitted = true;
        alert("You are now registered");
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 10px;
  margin-left: 1040px;
  display: inline-block;
}

.info-sec {
  margin-top: 15px;
}

input {
  padding: 6px 8px;
  margin: 4px;
}
.spe-input {
  width: 400px;
}
.err-input {
  border-color: red;
}

span {
  font-size: 18px;
  margin: 4px;
  font-weight: 500;
}

.submit {
  font-size: 20px;
  color: #fff;
  background: #2c5049;
  padding: 6px 12px;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 5px;
  width: 400px;
  margin-bottom: 200px;
}
.error-msg {
  color: red;
  font-size: 10px;
}
</style>

<template>
  <div>
    <form @submit.prevent="submitForm" v-if="!formSubmitted">
      <div class="info-sec">
        <!-- Full name -->
        <span>Full Name</span><br />
        <input
          v-bind:class="isValidName ? 'spe-input' : 'spe-input err-input'"
          v-model="name"
          type="text"
          placeholder="Enter your name"
        /><br />
        <h1 class="error-msg" v-if="!isValidName">Name could not be empty</h1>
      </div>

      <div class="info-sec">
        <!-- Date of Birth -->
        <span>Date of birth</span><br />
        <input
          v-bind:class="isValidDate ? 'spe-input' : 'spe-input err-input'"
          v-model="dateOfBirth"
          type="date"
        /><br />
        <h1 class="error-msg" v-if="!isValidDate">Please choose a date</h1>
      </div>

      <div class="info-sec">
        <!-- Gender -->
        <span>Gender</span><br />
        <input type="radio" v-model="gender" value="Male" />
        <label style="margin-right: 10px">Male</label>
        <input type="radio" v-model="gender" value="Female" />
        <label>Female</label><br />
        <h1 class="error-msg" v-if="!isValidGender">Please select a gender</h1>
      </div>

      <div class="info-sec">
        <!-- Email address -->
        <span>Email</span><br />
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          v-bind:class="isValidEmail ? 'spe-input' : 'spe-input err-input'"
        /><br />
        <h1 class="error-msg" v-if="!isValidEmail">Email could not be empty</h1>
      </div>

      <div class="info-sec">
        <!-- Password -->
        <span>Password</span><br />
        <input
          v-bind:class="isValidPassword ? 'spe-input' : 'spe-input err-input'"
          v-model="password"
          type="password"
          class="spe-input"
        /><br />
        <h1 class="error-msg" v-if="!isValidPassword">
          Password could not be empty
        </h1>
      </div>

      <div class="info-sec">
        <!-- role -->
        <span>You are registered as</span><br />
        <input type="radio" v-model="role" value="Provider" />
        <label style="margin-right: 10px">Provider</label>
        <input type="radio" v-model="role" value="Patient" />
        <label>Patient</label><br />
        <h1 class="error-msg" v-if="!isValidRole">Please select a role</h1>
      </div>

      <input class="submit" type="submit" value="submit" />
    </form>
    <br />

    <!-- test for successfully submitting the form-->
    <div v-if="formSubmitted">
      <h3>Form Submitted</h3>
      <p>Name: {{ name }}</p>
      <p>dateOfBirth: {{ dateOfBirth }}</p>
      <p>Email: {{ email }}</p>
      <p>Password: {{ password }}</p>
      <p>Gender: {{ gender }}</p>
      <p>Role: {{ role }}</p>
    </div>
  </div>
</template>
