<script lang="ts">

import moment from 'moment';

import provider from "@/services/provider";
import SearchBar from './SearchBar.vue';
import providerSlotDetail from './ProviderSlotDetail.vue';
import { defineComponent, ref } from "vue";
import { Appointment, Provider } from "@/types";

export default defineComponent({
  name: "ProviderList",
  components: {
    "search-bar": SearchBar,
    "slot-detail": providerSlotDetail
  },
  data() {
    return {
      weeksToShow: 2,
      providers: [] as Provider[],
      selectedProvider: {} as Provider,
      imageCounter: 1,
      popupTrigger: ref({
        slotClick: false
      }),
    };
  },
  methods: {
    makeNextSchedule(providerIndex: number, week: number) {
      let date = moment();
      let detailedSchedule: {
        day: number;
        dayStr: string;
        date: string;
        appointments: number;
      }[] = [];

      date.add((week - 1) * 7, 'days');

      for (let i = 0; i < 7; i++) {
        detailedSchedule.push({
          day: date.weekday(),
          dayStr: date.format("ddd"),
          date: date.format("MMM D"),
          appointments: this.getAvailableAppointments(providerIndex, date)
        });

        date.add(1, 'days');
      }

      return detailedSchedule;
    },

    getAvailableAppointments(providerIndex: number, date: moment.Moment) {
      let occupiedDuration = 0;
      let timeAllowed = 0;
      let duration = 0;

      this.providers[providerIndex].upcomingAppointments.forEach(appt => {
        if (date.isSame(moment(appt.date), "day")) {
          occupiedDuration += appt.duration;
        }
      });

      this.providers[providerIndex].availabilitySchedule.forEach(slot => {
        if (slot.day == date.weekday()) {
          timeAllowed += moment.duration(moment(slot.endTime, 'hh:mm:ss').diff(moment(slot.startTime, 'hh:mm:ss'))).asMinutes();
          duration = slot.slotDuration;
        }
      });

      return (duration > 0) ? Math.ceil((timeAllowed - occupiedDuration) / duration) : -1;
    },

    clickSlot(providerIndex: number) {
      this.selectedProvider = this.providers[providerIndex];
      this.imageCounter = providerIndex + 1;
      this.popupTrigger.slotClick = !this.popupTrigger.slotClick;
    },

    closeModal() {
      this.popupTrigger.slotClick = !this.popupTrigger.slotClick;
    },

    async slotSelected(slot: string, duration: number, date: moment.Moment) {
      this.closeModal();
      this.$store.dispatch("AppointmentModule/setAppointment", {
        providerId: this.selectedProvider.providerId,
        providerEmail: this.selectedProvider.email,
        providerName: this.selectedProvider.name,
        //TODO: Change to patient once module completed.
        patientId: this.selectedProvider.providerId,
        patientEmail: this.selectedProvider.email,
        patientName: this.selectedProvider.name,
        date: date.toDate(),
        time: slot,
        duration: duration

      } as Appointment);

      if (this.$store.getters["UserModule/isUserLoggedIn"]) {
        this.$router.push({ name: "reviewBooking" });
      }
      else {
        this.$router.push({
          name: "login", query: {
            redirect: "reviewBooking"
          }
        });
      }
    },
    checkIfParamsExist(){
      return this.$route.query.gender == null && this.$route.query.specialization == null && this.$route.query.name == null &&
          this.$route.query.location == null;
    },
    async reload(){
        if(this.checkIfParamsExist() ) {
          this.providers = await provider.getProviders();
        }
        else{
          let genderSelected = undefined, specialization = undefined,
              nameQuery = undefined, location = undefined;

          if(this.$route.query.gender !== null)
            genderSelected = String(this.$route.query.gender);
          if(this.$route.query.specialization !== null)
            specialization = String(this.$route.query.specialization);
          if(this.$route.query.name !== null)
            nameQuery = String(this.$route.query.name);
          if(this.$route.query.location !== null)
            location = String(this.$route.query.location);


          this.providers = await provider.getParameterizedProvider(genderSelected, location, nameQuery, specialization); // note here we have params, but will need to change to match call.
          return;
        }
    },
  },
  async created() {
    if(this.checkIfParamsExist() ) {
      this.providers = await provider.getProviders();
    }
    else{
      let genderSelected = undefined, specialization = undefined,
          nameQuery = undefined, location = undefined;

      if(this.$route.query.gender !== null)
        genderSelected = String(this.$route.query.gender);
      if(this.$route.query.specialization !== null)
        specialization = String(this.$route.query.specialization);
      if(this.$route.query.name !== null)
        nameQuery = String(this.$route.query.name);
      if(this.$route.query.location !== null)
        location = String(this.$route.query.location);


      this.providers = await provider.getParameterizedProvider(genderSelected, location, nameQuery, specialization); // note here we have params, but will need to change to match call.
      return;
    }
  },
  watch: {
    "$route.query"(val) {
      // call the method which loads your initial state
      this.reload();
    },
  },
});

</script>

<style scoped>
.provider-box {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0.9em;
  gap: 0.25em;
  min-height: 11.2em;
}

#provider-boxes {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5em;
  gap: 0.75em;
  margin-left: 5em;
}

.provider-info {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0.65em;
  width: 12em;
}

.name-specialization {
  display: flex;
  justify-content: top;
  flex-direction: column;
  gap: 0.2em;
  text-align: left;
}

.provider-name {
  font-weight: bold;
  font-size: 18px;
}

.provider-specialization {
  font-style: italic;
  font-size: 15px;
}

.provider-image img {
  width: 130px;
  height: 110px;
}

.provider-pic {
  border-radius: 50%;
}

.appointment-times {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-left: 2em;
}

.slots-row {
  display: flex;
  gap: 0.3em;
}

.slot {
  display: flex;
  width: 4.5em;
  height: 7em;
  border-radius: 0.3em;
  cursor: pointer;
  background-color: greenyellow;
  border: none;
  gap: 1em;
  flex-direction: column;
  text-align: left;
}

.slot:enabled:hover {
  background-color: midnightblue;
  color: white;
}

.slot:disabled {
  background-color: lightgrey;
  cursor: initial;
  opacity: 70%;
}

@media (max-width: 800px) {
  .provider-box {
    min-width: 16.5em;
    min-height: 14.2em;
  }

}
</style>

<template>
  <search-bar></search-bar>
  <slot-detail v-if="popupTrigger.slotClick" :provider="selectedProvider" :imageCounter="imageCounter"
               @closePopup="closeModal" @slotSelected="slotSelected"></slot-detail>
  <ul id="provider-boxes" v-for="(provider, index) in providers" :key="provider">
    <li class="provider-box">
      <div class="provider-image">
        <img class="provider-pic" :src="require('@/assets/Image/doctors/' + 'doctor' + (index + 1) + '.gif')" />
      </div>
      <div class="provider-info">
        <div class="name-specialization">
          <div class="provider-name">Dr. {{ provider.name }}</div>
          <div class="provider-specialization">{{ provider.specialization }}</div>
        </div>
      </div>

      <div class="appointment-times">
        <div class="slots-row" v-for="row in weeksToShow" :key="row">
          <button class="slot" v-for="schedule in makeNextSchedule(index, row)" :key="schedule"
                  @click="clickSlot(index)" :disabled="schedule.appointments < 0">
            <div>
              <div>{{ schedule.dayStr }}</div>
              <div>{{ schedule.date }}</div>
            </div>
            <div>
              <div v-if="schedule.appointments > 0">{{ schedule.appointments }}</div>
              <div v-else>No</div>
              <div>appts</div>
            </div>
          </button>

        </div>
      </div>
    </li>
  </ul>
</template>