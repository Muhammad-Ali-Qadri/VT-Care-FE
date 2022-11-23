<script>

export default {
  data() {
    return {

      user: this.$store.getters["UserModule/getUser"],

      editEmailVal: "",
      editEmail: false,

      editDateOfBirthVal: "",
      editDateOfBirth: false,

      editContactVal: "",
      editContact: false,

      editAddressVal: "",
      editAddress: false,

    }
  },

  methods: {
    edit_email: function () {
      this.editEmail = true;
    },
    cancel_edit_email: function () {
      this.editEmail = false;
    },
    save_email: function () {
      if (this.editEmailVal === "") {
        alert("Email could not be empty")
      }else {
        this.editEmail = false;
        this.user.email = this.editEmailVal
      }
    },

    edit_dob: function () {
      this.editDateOfBirth = true;
    },
    cancel_edit_dob: function () {
      this.editDateOfBirth = false;
    },
    save_dob: function () {
      if (this.editDateOfBirthVal === "") {
        alert("Date of Birth could not be empty")
      }else {
        this.editDateOfBirth = false;
        this.user.dateOfBirth = this.editDateOfBirthVal
      }
    },

    edit_contact: function () {
      this.editContact = true;
    },
    cancel_edit_contact: function () {
      this.editContact = false;
    },
    save_contact: function () {
      if (this.editContactVal === "") {
        alert("Phone number could not be empty")
      }else {
        this.editContact = false;
        this.user.contact = this.editContactVal
      }
    },

    edit_address: function () {
      this.editAddress = true;
    },
    cancel_edit_address: function () {
      this.editAddress = false;
    },
    save_address: function () {
      if (this.editAddressVal === "") {
        alert("Address could not be empty")
      }else {
        this.editAddress = false;
        this.user.address = this.editAddressVal
      }
    },

  },
};
</script>

<style scoped>
.profile-sec {
  text-align: initial;
  display: flex;
  background: #fafafa;
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
.user-title-3 {
  font-size: 18px;
  line-height: 3em;
}
.each-div {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  padding: 1em 1em 2em 0;
  width: 50em;
}
.main-sec {
  margin-left: 20em;
  margin-top: 3em;
  margin-bottom: 5em;
}
.modify-input {
  width: 100%;
  border: rgba(0, 0, 0, 0.1) solid 1px;
  padding: 1em;
}
.save-btn {
  margin-top: 1.5em;
  padding: 1em 2em;
  background: #2c5049;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

<template>
  <section class="profile-sec">

    <div class="main-sec">
      <h1 class="user-title-1"> Profile</h1>
      <!-- Name div -->
      <div class="each-div">
        <h3 class="user-title-2"> Name</h3>
        <h3 id="name"> {{ user.name }}</h3>
      </div>
      <!-- Gender div -->
      <div class="each-div">
        <h3 class="user-title-2"> Gender</h3>
        <h3 id="gender"> {{ user.gender }}</h3>
      </div>
      <!-- Date of Birth div -->
      <div class="each-div">
        <h3 class="user-title-2">Date of Birth</h3>
        <div v-if="editDateOfBirth === false">
          <a style="float: right;text-decoration: underline;" @click="edit_dob">Edit</a>
          <h3 id="date"> {{ user.dateOfBirth }}</h3>
        </div>
        <div v-else>
          <a style="float: right;text-decoration: underline;" @click="cancel_edit_dob">Cancel</a>
          <h2 class="user-title-3">Date of Birth</h2>
          <form @submit.prevent="save_dob">
            <input class="modify-input"
                   v-model="editDateOfBirthVal"
                   type="date"
            />
            <input class="save-btn" type="submit" value="Save">
          </form>
        </div>
      </div>
      <!-- Email Address div -->
      <div class="each-div">
        <h3 class="user-title-2"> Email Address</h3>
        <div v-if="editEmail === false">
          <a style="float: right;text-decoration: underline;" @click="edit_email">Edit</a>
          <h3 id="email"> {{ user.email }}</h3>
        </div>
        <div v-else>
          <a style="float: right;text-decoration: underline;" @click="cancel_edit_email">Cancel</a>
          <h2 class="user-title-3">Email Address</h2>
          <form @submit.prevent="save_email()">
            <input class="modify-input"
                   v-model="editEmailVal"
                   type="email"
            />
            <input class="save-btn" type="submit" value="Save">
          </form>
        </div>


      </div>
      <!-- Phone number div -->
      <div class="each-div">
        <h3 class="user-title-2">Phone Number</h3>
        <div v-if="editContact === false">
          <a style="float: right;text-decoration: underline;" @click="edit_contact">Edit</a>
          <h3 id="phone"> {{ user.contact }}</h3>
        </div>
        <div v-else>
          <a style="float: right;text-decoration: underline;" @click="cancel_edit_contact">Cancel</a>
          <h2 class="user-title-3">Phone Number</h2>
          <form @submit.prevent="save_contact()">
            <input class="modify-input"
                   v-model="editContactVal"
                   type="text"
            />
            <input class="save-btn" type="submit" value="Save">
          </form>
        </div>
      </div>
      <!-- Address div -->
      <div class="each-div">
        <h3 class="user-title-2">Address</h3>
        <div v-if="editAddress === false">
          <a style="float: right;text-decoration: underline;" @click="edit_address">Edit</a>
          <h3 id="address"> {{ user.address }}</h3>
        </div>
        <div v-else>
          <a style="float: right;text-decoration: underline;" @click="cancel_edit_address">Cancel</a>
          <h2 class="user-title-3">Address</h2>
          <form @submit.prevent="save_address()">
            <input class="modify-input"
                   v-model="editAddressVal"
                   type="text"
            />
            <input class="save-btn" type="submit" value="Save">
          </form>
        </div>
      </div>
    </div>
  </section>
</template>