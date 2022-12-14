<script lang="ts">

import ProviderProfileItem from "@/components/providerProfileItem.vue";
import PatientProfileItem from "@/components/patientProfileItem.vue";
import providerSlotDetail from './ProviderSlotDetail.vue';

import { defineComponent, ref } from "vue";
import { Appointment, Provider, User } from '@/types';
import moment from 'moment';
import appointment from '@/services/appointment';
import NotesPopup from './NotesPopup.vue';
import provider from "@/services/provider";
import PatientHistoryList from './PatientHistory.vue';

export default defineComponent({
  components: {
    ProviderProfileItem,
    PatientProfileItem,
    "notes-popup" : NotesPopup,
    providerSlotDetail,
    "patient-history-list" : PatientHistoryList
  },

  data() {
    return {
      userType: this.$store.getters['UserModule/getUserType'],
      isInSession: false,
      user: {} as User,
      popupTrigger: ref({
        rescheduleClick: false,
        displayNotes: false,
        displayHistory: false,
      }),
      selectedProvider: {} as Provider,
      selectedAppointment: {} as Appointment,
      appointmentList: [] as {
        appt: Appointment,
        isCancelled: boolean,
        isPast: boolean,
        showAttend: boolean,
        canEdit: boolean
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

    showAttendMeeting(appt: Appointment) {
      return appt.status === 'PROCEEDING' || this.userType !== "Patient";
    },

    makeAppointmentList() {
      const user = this.$store.getters["UserModule/getUser"] as User;

      user.upcomingAppointments.forEach(appt => {
        const past = this.isPastDate(appt);
        const canEdit = !past && appt.status !== 'PROCEEDING' && appt.status !== 'CANCELLED';

        this.appointmentList.push({
          appt: appt,
          isCancelled: appt.status === 'CANCELLED',
          isPast: past,
          showAttend: !past && this.showAttendMeeting(appt),
          canEdit: canEdit
        });
      });
    },

    async openMeeting(appt: Appointment) {
      await appointment.updateAppointmentStatus(appt.id, 'PROCEEDING');
      this.selectedAppointment = appt;

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
        this.popupTrigger.displayNotes = !this.popupTrigger.displayNotes;
      }
    },

    async confirmCancelAppointment(apptId: number) {
      const response = confirm("Are you sure you want to Cancel this appointment?");

      if (response) {
        await appointment.cancelAppointment(apptId);
        await this.reload();
      }
    },

    async rescheduleClick(appt: Appointment) {
      this.selectedAppointment = appt;
      this.selectedProvider = await provider.getProvider(appt.providerId);
      this.popupTrigger.rescheduleClick = !this.popupTrigger.rescheduleClick;
    },

    async rescheduleSlotSelected(slot: string, duration: number, date: moment.Moment) {
      this.closeModal();

      const response = confirm("Are you sure you want to reschedule to " + date.format("DD MMM") + " at " + slot + " ?");

      if (response) {
        this.selectedAppointment.date = date.toDate();
        this.selectedAppointment.time = slot;
        await appointment.rescheduleAppointment(this.selectedAppointment);
        await this.reload();
      }
    },


    closeModal() {
      this.popupTrigger.rescheduleClick = !this.popupTrigger.rescheduleClick;
    },

    //TODO: Call when notes popup is submitted.
    async completeAppointment(apptId: number) {
      await appointment.updateAppointmentStatus(apptId, 'COMPLETED');
      this.popupTrigger.displayNotes= !this.popupTrigger.displayNotes;
      await this.reload();
    },

    async reload() {
      this.appointmentList = [];
      await this.$store.dispatch("UserModule/refreshAppointments");
      this.user = this.$store.getters['UserModule/getUser'];
      this.makeAppointmentList();
    },

    prepareHistoryList(appt: Appointment){
      this.selectedAppointment = appt;
      this.popupTrigger.displayHistory = !this.popupTrigger.displayHistory;
    }
  },

  async created() {
    //Get new list of appointments on reload.
    await this.reload();
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

.ready-button {
  background-color: rgb(0, 35, 75);
  border-color: rgb(0, 35, 75);
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 1em;
}
</style>

<template>
  <providerSlotDetail v-if="popupTrigger.rescheduleClick" :provider="selectedProvider" :imageCounter="1"
    @closePopup="closeModal" @slotSelected="rescheduleSlotSelected"></providerSlotDetail>

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
      <h2>
        <button v-if="userType==='Patient'" @click="prepareHistoryList({patientId: user.id, patientName: user.name})"
        class="ready-button">
            View History
        </button>
      </h2>
      <div class="appointment-list" v-if="appointmentList.length > 0">
        <div class="appointment-list-item" v-for="item in appointmentList" :key="item"
          :class="[(item.isPast) ? 'past-appointment' : '', (item.isCancelled) ? 'cancelled-appointment' : '']">
          <b>{{ getFormattedDate(item.appt.date) }}</b>
          <span>At <b>{{ getFormattedTime(item.appt.time) }}</b></span>
          <span>With <b>{{ getShownName(item.appt) }}</b></span>
          <a class="appointment-options"><i class="fa-solid fa-ellipsis-vertical"></i></a>
          <ul v-if="!item.isCancelled || userType === 'Provider'" class="dropdown"> <!--TODO: Need to fix empty circle showing for patient -->
            <li v-if="item.showAttend"><a @click="openMeeting(item.appt)">Attend</a></li>
            <li v-if="item.canEdit"><a @click="rescheduleClick(item.appt)">Reschedule</a></li>
            <li v-if="item.canEdit"><a @click="confirmCancelAppointment(item.appt.id)">Cancel</a></li>
            <li v-if="userType === 'Provider'" @click="prepareHistoryList(item.appt)"><a>View Patient History</a></li>
          </ul>
        </div>
      </div>
      <h1 class="appointment-title no-show" v-else> No appointments to show</h1>
    </section>
    <section class="notesOrHistory">
      <notes-popup v-if="popupTrigger.displayNotes"
                   @closePopup="popupTrigger.displayNotes=!popupTrigger.displayNotes"
                   @submitNotes="completeAppointment(selectedAppointment.id)"
                   v-bind:patientName="selectedAppointment.patientName"
                   v-bind:apptDate="selectedAppointment.date" v-bind:providerName="selectedAppointment.providerName" v-bind:patientId="selectedAppointment.patientId"
      >
      </notes-popup>
      <patient-history-list v-if="popupTrigger.displayHistory" v-bind:patientName="selectedAppointment.patientName" v-bind:patientId="selectedAppointment.patientId" @closePopup="popupTrigger.displayHistory=!popupTrigger.displayHistory">
      </patient-history-list>
    </section>
  </div>
</template>