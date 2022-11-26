<template>
  <Transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="info-container">
            <div class="modal-header">
              <a style="color:black"><i class="fa-solid fa-xmark fa-2x" @click="closeModal()"></i></a>
            </div>
            <div class="history-header-body">
              <div class="patient-info">
                {{ patientName }}'s History
              </div>
            </div>
          </div>
          <div class="history-container">
              <div v-for="item in patientHist" :key="item" class="history-item">

                  <p class="apptDate">
                    <b>On </b>{{formatDate(item.apptDate)}} with Dr. {{item.providerName}}
                  </p>
                  <p>
                    <b>Diagnosis:</b> {{item.diagnosis}}
                  </p>
                  <p>
                    <b>Prescription:</b> {{item.prescription}}
                  </p>
                  <p>
                    <b>Notes:</b> {{item.notes}}
                  </p>

              </div>
          </div>

      </div>
    </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import patient from "@/services/patient";
import makeToast from './toast/makeToast';
import {PatientHistory} from '@/types'
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
  name: "PatientHistoryList",
  data() {
    return {
      patientHist: [] as PatientHistory[],
      columns: [ {id: 0, field: "apptDate"},
        {id:1, field: "diagnosis"} , {id: 2, field: "prescription"}, {id:3, field: "notes"}],
    }
  },

  props: [
    "patientName",
    "patientId"
  ],

  methods: {
    closeModal() {
      this.$emit('closePopup');
    },

    formatDate(date: string){
      let x = moment(date);
      return x.format("DD MMM yyyy");
    }
  },

  async created() {
    this.patientHist = await patient.getHistory(this.patientId);
  },

});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(83, 79, 79, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header {
  margin-right: 1em;
  margin-top: 1em;
  float: right;
}

.modal-container {
  width: 45em;
  height: 45em;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  overflow-y: scroll;
}

.info-container {
  position: fixed;
  margin: -1.2em -1.8em;
  box-shadow: 0 2px 2px rgb(0 0 0);
  width: 45em;
  height: 6em;
  z-index: 100;
  background: white;
}

.patient-info{
  font-size: 24px;
  font-weight: bold;
}

.history-header-body {
  margin-top: 2em;
  margin-bottom: 1em;
  margin-left: 2em;
  position: sticky;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.history-container{
  display: flex;
  grid-template-columns: max-content minmax(10em, 20em) repeat(4, max-content);
  row-gap: 1em;
  margin-top: 6em;
  justify-content: left;
  padding: 0.5em;
  flex-flow: column wrap;
  width:100%;
}

.history-item {
  display: flex;
  flex-flow: column wrap;
  column-gap: 2em;
  border: 1px solid #ccc;
  border-radius: 1em;
  border-width: 3px;
  padding:1em;
}
p{
  text-align: left;
}

.apptDate{
  font-size: 20px;
}

</style>