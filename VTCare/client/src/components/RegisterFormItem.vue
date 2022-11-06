<script>
import provider from "@/services/provider";

export default {
  data() {
    return {
      // fields data
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
      contact: "",
      address: "",
      gender: "",
      role: "",
      experience: "",
      specialization: "",
      // check if fields are valid
      isValidName: true,
      isValidDate: true,
      isValidPassword: true,
      isValidEmail: true,
      isValidAddress: true,
      isValidContact: true,
      isValidGender: true,
      isValidRole: true,
      isValidExp: true,
      isValidSpe: true,
    };
  },

  methods: {
    submitForm: function () {
      if (
          this.email === "" ||
          this.password === "" ||
          this.contact === "" ||
          this.address === "" ||
          this.name === "" ||
          this.dateOfBirth === "" ||
          this.gender === "" ||
          this.role === ""
      )
      {
        this.isValidName = this.name !== "";
        this.isValidDate = this.dateOfBirth !== "";
        this.isValidEmail = this.email !== "";
        this.isValidPassword = this.password !== "";
        this.isValidAddress = this.address !== "";
        this.isValidContact = this.contact !== "";
        this.isValidGender = this.gender !== "";
        this.isValidRole = this.role !== "";
        this.isValidExp = this.experience !== "";
        this.isValidSpe = this.specialization !== "";
      }
      else
      {
        this.isValidRole = true;

        // TODO: Patient register
        if (this.role === "Patient"){
          this.$router.push({ name:"about" })
        }

        // Provider register
        if (this.role === "Provider"){
          if (this.experience === "" || this.specialization === "")
          {
            this.isValidExp = this.experience !== "";
            this.isValidSpe = this.specialization !== "";
          }
          else {
            this.isValidSpe = true;
            this.isValidExp = true;

            provider.registerProvider({
              name: this.name,
              email: this.email,
              password: this.password,
              gender: this.gender,
              dob: this.dateOfBirth,
              address: this.address,
              contact: this.contact,
              experience: this.experience,
              specialization: this.specialization,
            });
            this.$router.push({ name: "login" })
          }
        }
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 10px;
  display: flex;
  flex-flow: column wrap;
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
  font-size: 1.2em;
  color: #fff;
  background: #2c5049;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 5px;
  width: 10em;
  margin-bottom: 4em;
}

.error-msg {
  color: red;
  font-size: 10px;
}
</style>

<template>
  <div>
    <form @submit.prevent="submitForm()">
      <!-- Full name -->
      <div class="info-sec">
        <div><span>Full Name</span><br /></div>
        <div>
          <input
            v-bind:class="isValidName ? 'spe-input' : 'spe-input err-input'"
            v-model="name"
            type="text"
            placeholder="Enter your name"
        /><br />
          <h1 class="error-msg" v-if="!isValidName">Name could not be empty</h1></div>

      </div>

      <!-- Date of Birth -->
      <div class="info-sec">
        <span>Date of birth</span><br />
        <input
            v-bind:class="isValidDate ? 'spe-input' : 'spe-input err-input'"
            v-model="dateOfBirth"
            type="date"
        /><br />
        <h1 class="error-msg" v-if="!isValidDate">Please choose a date</h1>
      </div>

      <!-- Gender -->
      <div class="info-sec">
        <span>Gender</span><br />
        <input type="radio" v-model="gender" value="Male" />
        <label style="margin-right: 10px">Male</label>
        <input type="radio" v-model="gender" value="Female" />
        <label>Female</label><br />
        <h1 class="error-msg" v-if="!isValidGender">Please select a gender</h1>
      </div>

      <!-- Email address -->
      <div class="info-sec">
        <span>Email</span><br />
        <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            v-bind:class="isValidEmail ? 'spe-input' : 'spe-input err-input'"
        /><br />
        <h1 class="error-msg" v-if="!isValidEmail">Email could not be empty</h1>
      </div>

      <!-- Password -->
      <div class="info-sec">
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

      <!-- Address -->
      <div class="info-sec">
        <span>Address</span><br />
        <input
            v-model="address"
            type="text"
            placeholder="Enter your address"
            v-bind:class="isValidAddress ? 'spe-input' : 'spe-input err-input'"
        /><br />
        <h1 class="error-msg" v-if="!isValidAddress">Address could not be empty</h1>
      </div>

      <!-- Contact -->
      <div class="info-sec">
        <span>Phone Number</span><br />
        <input
            v-model="contact"
            type="text"
            placeholder="xxx-xxx-xxxx"
            v-bind:class="isValidContact ? 'spe-input' : 'spe-input err-input'"
        /><br />
        <h1 class="error-msg" v-if="!isValidContact">Phone number could not be empty</h1>
      </div>

      <!-- role -->
      <div class="info-sec">
        <span>You are registered as</span><br />
        <input type="radio" v-model="role" value="Provider" />
        <label style="margin-right: 10px">Provider</label>
        <input type="radio" v-model="role" value="Patient" />
        <label>Patient</label><br />
        <h1 class="error-msg" v-if="!isValidRole">Please select a role</h1>
      </div>

      <!-- Provider extra fields -->
      <div v-if="this.role === 'Provider'">
        <!-- Year of Experience -->
        <div class="info-sec">
          <span>Years of Experience</span><br />
          <input
              v-model="experience"
              type="text"
              placeholder="Enter the number of years "
              v-bind:class="isValidExp ? 'spe-input' : 'spe-input err-input'"
          /><br />
          <h1 class="error-msg" v-if="!isValidExp">Years of Experience could not be empty</h1>
        </div>

        <!-- Specialization -->
        <div class="info-sec">
          <span>Specialization</span><br />
          <input
              v-model="specialization"
              type="text"
              v-bind:class="isValidSpe ? 'spe-input' : 'spe-input err-input'"
          /><br />
          <h1 class="error-msg" v-if="!isValidSpe">Specialization could not be empty</h1>
        </div>
      </div>

      <div>
        <input class="submit" type="submit" value="submit" />
      </div>
    </form>
    <br />
  </div>
</template>
