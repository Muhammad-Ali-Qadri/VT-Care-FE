<script lang="ts">

import moment from 'moment';

import provider from "@/services/provider";
import SearchBar from "@/components/SearchBar.vue";
import { defineComponent } from "vue";
import { Provider } from "@/types";

export default defineComponent({
  components: { SearchBar },
  data() {
    return {
      providers: [] as Provider[],
      weeksToShow: 2
    };
  },
  methods: {
    makeNextSchedule(providerIndex: number, week: number){
      let date = moment();
      let detailedSchedule: {
        day: number;
        dayStr: string;
        date: string;
        appointments: number;
      }[] = [];

      date.add((week - 1) * 7, 'days');

      for(let i = 0; i < 7; i++){
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

    getAvailableAppointments(providerIndex: number, date: moment.Moment){
      let occupiedDuration = 0;
      let timeAllowed = 0;
      let duration = 0;

      this.providers[providerIndex].upcomingAppointments.forEach(appt => {
        if(date.isSame(moment(appt.date), "day")){
          occupiedDuration += appt.duration;
        }
      });

      this.providers[providerIndex].availabilitySchedule.forEach(slot => {
        if(slot.day == date.weekday()){
          timeAllowed += moment.duration(moment(slot.endTime, 'hh:mm:ss').diff(moment(slot.startTime, 'hh:mm:ss'))).asMinutes();
          duration = slot.slotDuration;
        }
      });

      return (duration > 0) ? Math.floor((timeAllowed - occupiedDuration) / duration) : -1;
    }

  },
  async created() {
    this.providers = await provider.getProviders();
  },
});

</script>

<style>
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
  border-radius: 0.6em;
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

  <SearchBar></SearchBar>
  <ul id="provider-boxes" v-for="(item, index) in providers" :key="item">
    <li class="provider-box">
      <div class="provider-image">
        <img class="provider-pic" :src="require('@/assets/Image/doctors/' + 'doctor' + (index + 1) + '.gif')" />
      </div>
      <div class="provider-info">
        <div class="name-specialization">
          <div class="provider-name">Dr. {{ item.name }}</div>
          <div class="provider-specialization">{{ item.specialization }}</div>
        </div>
      </div>

      <div class="appointment-times">
        <div class="slots-row" v-for="row in weeksToShow" :key="row">
          <button class="slot" v-for="schedule in makeNextSchedule(index, row)" :key="schedule"
          :disabled="schedule.appointments < 0">
            <div>
              <div>{{schedule.dayStr}}</div>
              <div>{{schedule.date}}</div>
            </div>
            <div>
              <div v-if="schedule.appointments > 0">{{schedule.appointments}}</div>
              <div v-else>No</div>
              <div>appts</div>
            </div>
          </button>
          
        </div>
      </div>
    </li>
  </ul>
</template>