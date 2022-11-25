<script lang="ts">

import ProviderProfileItem from "@/components/providerProfileItem.vue";
import PatientProfileItem from "@/components/patientProfileItem.vue";
import { defineComponent } from "vue";
import { Appointment, User } from '@/types';
import moment from 'moment';
import appointment from '@/services/appointment';
export default defineComponent({
  components: {
    ProviderProfileItem,
    PatientProfileItem,
  },

  data() {
    return {
      userType: this.$store.getters['UserModule/getUserType'],
      isInSession: false,
      appointmentList: [] as {
        appt: Appointment,
        isCancelled: boolean,
        isPast: boolean,
        showAttend: boolean
      }[]
    }
  },

  methods: {
    getFormattedDate(date: Date | string) {
      return moment(date).format("DD MMM YYYY");
    },

    getFormattedTime(time: string) {
      return moment(time, "hh:mm:ss").format("hh:mm A");
    },

    getShownName(appt: Appointment) {
      if (this.userType !== "Patient") {
        return appt.patientName;
      }
      else {
        return "Dr. " + appt.providerName;
      }
    },

    isPastDate(appt: Appointment) {
      let minDate = moment(), inDate = moment(appt.date);
      minDate.add(-30, 'minutes');
      return inDate.isBefore(minDate) || appt.status === 'COMPLETED';
    },

    showAttendMeeting(appt: Appointment){
      return appt.status === 'PROCEEDING' || this.userType !== "Patient";
    },

    makeAppointmentList() {
      const user = this.$store.getters["UserModule/getUser"] as User;

      user.upcomingAppointments.forEach(appt => {
        const past = this.isPastDate(appt);
        this.appointmentList.push({
          appt: appt,
          isCancelled: appt.status === 'CANCELLED',
          isPast: past,
          showAttend: !past && this.showAttendMeeting(appt)
        });
      });
    },

    async openMeeting(appt: Appointment) {
      await appointment.updateAppointmentStatus(appt.id, 'PROCEEDING');

      const win = window.open(appt.url);

      if (this.userType === "Patient") {
        this.isInSession = true;

        const closeMask = () => this.isInSession = false;
        var timer = setInterval(function () {
          if (win?.closed) {
            clearInterval(timer);
            closeMask();
          }
        }, 500);
      }
      else {
        //TODO: Add logic here to show meeting notes popup.
      }
    },

    //TODO: Call when notes popup is submitted. 
    async completeAppointment(apptId: number) {
      await appointment.updateAppointmentStatus(apptId, 'COMPLETED');
    },
  },

  async created() {
    //Get new list of appointments on reload.
    await this.$store.dispatch("UserModule/refreshAppointments");
    this.makeAppointmentList();
  }
});


</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: row;
  background: #fafafa;
  justify-content: center;
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

.cancelled-appointment {
  color: red;
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
    <section v-if="userType === 'Provider'">
      <ProviderProfileItem></ProviderProfileItem>
    </section>
    <section v-else>
      <PatientProfileItem></PatientProfileItem>
    </section>
    <section class="appointment-section">
      <h1 class="appointment-title"> Appointments</h1>
      <div class="appointment-list" v-if="appointmentList.length > 0">
        <div class="appointment-list-item" v-for="item in appointmentList" :key="item"
          :class="[(item.isPast) ? 'past-appointment' : '', (item.isCancelled) ? 'cancelled-appointment' : '']" >
          <b>{{ getFormattedDate(item.appt.date) }}</b>
          <span>At <b>{{ getFormattedTime(item.appt.time) }}</b></span>
          <span>With <b>{{ getShownName(item.appt) }}</b></span>
          <a class="appointment-options"><i class="fa-solid fa-ellipsis-vertical"></i></a>
          <ul class="dropdown">
            <li v-if="item.showAttend"><a @click="openMeeting(item.appt)">Attend Meeting</a></li>
            <li><a>View Patient History</a></li>
          </ul>

        </div>
      </div>
      <h1 class="appointment-title no-show" v-else> No appointments to show</h1>
    </section>
  </div>
</template>