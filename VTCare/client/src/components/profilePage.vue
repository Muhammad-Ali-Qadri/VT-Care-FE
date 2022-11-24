<script lang="ts">
import { Appointment, Provider } from '@/types';
import { defineComponent } from 'vue';
import moment from 'moment';
import appointment from '@/services/appointment';

export default defineComponent({
  data() {
    return {

      isInSession: false,
      isPatientLogin: this.$store.getters["UserModule/getUserType"] === "Patient",

      user: {} as Provider,

      editEmailVal: "",
      editEmail: false,

      editDateOfBirthVal: "",
      editDateOfBirth: false,

      editContactVal: "",
      editContact: false,

      editAddressVal: "",
      editAddress: false,

      editSpecializationVal: "",
      editSpecialization: false,

      editYoeVal: "",
      editYoe: false,
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
      } else {
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
      } else {
        this.editDateOfBirth = false;
        this.user.dateOfBirth = this.editDateOfBirthVal;
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
      } else {
        this.editContact = false;
        this.user.contact = this.editContactVal
      }
    },

    edit_specia: function () {
      this.editSpecialization = true;
    },
    cancel_edit_specia: function () {
      this.editSpecialization = false;
    },
    save_specia: function () {
      if (this.editSpecializationVal === "") {
        alert("Specialization could not be empty")
      } else {
        this.editSpecialization = false;
        this.user.specialization = this.editSpecializationVal
      }
    },

    edit_yoe: function () {
      this.editYoe = true;
    },
    cancel_edit_yoe: function () {
      this.editYoe = false;
    },
    save_yoe: function () {
      if (this.editYoeVal === "") {
        alert("Year of experience could not be empty")
      } else {
        this.editYoe = false;
        this.user.yearsOfExperience = parseInt(this.editYoeVal);
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
      } else {
        this.editAddress = false;
        this.user.address = this.editAddressVal
      }
    },

    getFormattedDate(date: Date | string) {
      return moment(date).format("DD MMM YYYY");
    },

    getFormattedTime(time: string) {
      return moment(time, "hh:mm:ss").format("hh:mm A");
    },

    isPastDate(appt: Appointment) {
      let minDate = moment(), inDate = moment(appt.date);
      minDate.add(-30, 'minutes');
      return inDate.isBefore(minDate) || appt.status === 'COMPLETED';
    },

    showMeetingAttend(appt: Appointment) {
      if (this.isPastDate(appt)) {
        return false;
      }

      return appt.status == 'PROCEEDING' || !this.isPatientLogin;
    },

    async openMeeting(appt: Appointment) {
      await appointment.updateAppointmentStatus(appt.id, 'PROCEEDING');

      const win = window.open(appt.url);

      if (this.isPatientLogin) {
        this.isInSession = true;

        const closeMask = () => this.isInSession = false;
        var timer = setInterval(function () {
          if (win?.closed) {
            clearInterval(timer);
            closeMask();
          }
        }, 500);
      }
      else{
        //TODO: Add logic here to show meeting notes popup.
      }
    },

    //TODO: Call when notes popup is submitted. 
    async completeAppointment(apptId: number){
      await appointment.updateAppointmentStatus(apptId, 'COMPLETED'); 
    }
  },

  async created(){
    //Get new list of appointments on reload.
    await this.$store.dispatch("UserModule/refreshAppointments");
    this.user = this.$store.getters["UserModule/getUser"];
  }
});
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: row;
  background: #fafafa;
}

.profile-sec {
  text-align: initial;
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

.user-title-3 {
  font-size: 18px;
  line-height: 3em;
}

.each-div {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  padding: 1em 1em 2em 0;
  width: 30em;
}

.main-sec {
  margin-left: 15em;
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

.appointment-section {
  margin-left: 5em;
  margin-top: 2.5em;
  margin-bottom: 5em;
  text-align: initial;
  display: flex;
  flex-direction: column;
}

.appointment-title {
  font-size: 25px;
  font-weight: bold;
  line-height: 2em;
}

.no-show {
  color: rgb(102, 115, 133);
  opacity: 0.5;
}

.appointment-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 35em;
  height: 60em;
  border: #2c5049;
  border-radius: 1em;
  border-width: 1em;
}

.appointment-options {
  visibility: hidden;
}

.appointment-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em;
  width: 100%;
  height: 3em;
}

.appointment-list-item:hover {
  background-color: blanchedalmond;
}

.past-appointment {
  color: gray;
}

.past-appointment>.attend-meeting {
  display: none;
}

.appointment-list-item:hover>.appointment-options {
  visibility: visible;
}

.dropdown {
  position: absolute;
  display: none;
  z-index: 100;
  background-color: #d5d5d5;
  border-radius: 1em;
  padding: 0.5em;
  margin-top: 0.7em;
  margin-left: 30em;
  border: 1px solid #2c5049;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
}

.appointment-options:hover+.dropdown,
.dropdown:hover {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dropdown>li:not(:last-child) {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

.mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(83, 79, 79, 0.5);
  display: table;
}
</style>

<template>
  <div class="mask" v-if="isInSession"></div>
  <div class="profile-container">
    <section class="profile-sec" v-if="!isPatientLogin">

      <div class="main-sec">
        <h1 class="user-title-1"> Profile</h1>
        <div class="each-div">
          <h3 class="user-title-2"> Name</h3>
          <h3 id="name"> {{ user.name }}</h3>
        </div>
        <div class="each-div">
          <h3 class="user-title-2"> Gender</h3>
          <h3 id="gender"> {{ user.gender }}</h3>
        </div>
        <div class="each-div">
          <h3 class="user-title-2">Date of Birth</h3>
          <div v-if="editDateOfBirth === false">
            <a style="float: right;text-decoration: underline;" @click="edit_dob">Edit</a>
            <h3 id="date"> {{ user.date }}</h3>
          </div>
          <div v-else>
            <a style="float: right;text-decoration: underline;" @click="cancel_edit_dob">Cancel</a>
            <h2 class="user-title-3">Date of Birth</h2>
            <form @submit.prevent="save_dob">
              <input class="modify-input" v-model="editDateOfBirthVal" type="date" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>
        </div>

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
              <input class="modify-input" v-model="editEmailVal" type="email" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>


        </div>
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
              <input class="modify-input" v-model="editContactVal" type="text" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>
        </div>

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
              <input class="modify-input" v-model="editAddressVal" type="text" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>
        </div>
        <div class="each-div">
          <h3 class="user-title-2">Specialization</h3>
          <div v-if="editSpecialization === false">
            <a style="float: right;text-decoration: underline;" @click="edit_specia">Edit</a>
            <h3 id="specialization"> {{ user.specialization }}</h3>
          </div>
          <div v-else>
            <a style="float: right;text-decoration: underline;" @click="cancel_edit_specia">Cancel</a>
            <h2 class="user-title-3">Specialization</h2>
            <form @submit.prevent="save_specia()">
              <input class="modify-input" v-model="editSpecializationVal" type="text" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>
        </div>
        <div class="each-div">
          <h3 class="user-title-2">Years of Experience</h3>
          <div v-if="editYoe === false">
            <a style="float: right;text-decoration: underline;" @click="edit_yoe">Edit</a>
            <h3 id="yoe"> {{ user.yearsOfExperience }}</h3>
          </div>
          <div v-else>
            <a style="float: right;text-decoration: underline;" @click="cancel_edit_yoe">Cancel</a>
            <h2 class="user-title-3">Years of Experience</h2>
            <form @submit.prevent="save_yoe()">
              <input class="modify-input" v-model="editYoeVal" type="number" min="0" max="40" />
              <input class="save-btn" type="submit" value="Save">
            </form>
          </div>

        </div>
      </div>
    </section>
    <section class="profile-sec" v-else>
      this is patient profile
    </section>
    <section class="appointment-section">
      <h1 class="appointment-title"> Appointments</h1>
      <div class="appointment-list" v-if="user.upcomingAppointments?.length > 0">
        <div class="appointment-list-item" v-for="appt in user.upcomingAppointments" :key="appt"
          v-bind:class="(isPastDate(appt)) ? 'past-appointment' : ''">
          <b>{{ getFormattedDate(appt.date) }}</b>
          <span>At <b>{{ getFormattedTime(appt.time) }}</b></span>
          <span>With <b>{{ appt.patientName }}</b></span>
          <a class="appointment-options"><i class="fa-solid fa-ellipsis-vertical"></i></a>
          <ul class="dropdown">
            <li v-if="showMeetingAttend(appt)"><a @click="openMeeting(appt)">Attend Meeting</a></li>
            <li><a>View Patient History</a></li>
          </ul>

        </div>
      </div>
      <h1 class="appointment-title no-show" v-else> No appointments to show</h1>
    </section>
  </div>
</template>